<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;
use App\Jobs\ExportAppointmentsCsvJob;
use App\Services\AppointmentService;
use App\Services\NotificationService;
use App\Models\Export;
use App\Models\Notification;
use Symfony\Component\HttpFoundation\StreamedResponse;

class AppointmentController extends Controller
{


    protected $appointmentService;

    public function __construct(AppointmentService $appointmentService)
    {
        $this->appointmentService = $appointmentService;
    }

    // total appointments for admin dashboard
    // Admin Dashboard Stats
    public function total()
    {
        $totalAppointments = Appointment::count();

        return response()->json([
            'status' => true,
            'data' => [
                'total_appointments' => $totalAppointments
            ]
        ]);
    }

    // 1. List + Filters (Admin and FDO)
    public function index(Request $request)
    {
        $query = $this->appointmentService->getFilteredAppointments($request->all()); // array pass

        $appointments = $query->latest()->paginate(10);

        return response()->json($appointments);
    }



    /// export to csv (Admin )
    // public function export(Request $request)
    // {
    //     $user = $request->attributes->get('auth_user'); // because not logged in currently
    //     $export = Export::create([
    //         'user_id' => $user->id,
    //         'type' => 'appointment',
    //         'status' => 'processing'
    //     ]);
    //     ExportAppointmentsCsvJob::dispatch($request->all(), $export->id);

    //     return response()->json([
    //         'message' => 'Export started. You will be notified when ready.'
    //     ]);
    // }


    public function export(Request $request)
    {
        $query = $this->appointmentService->getFilteredAppointments($request->all());

        $appointments = $query->get(); //  no pagination

        $filename = 'appointments_' . now()->format('Y_m_d_H_i_s') . '.csv';

        $headers = [
            "Content-Type" => "text/csv",
            "Content-Disposition" => "attachment; filename=$filename",
        ];

        $columns = [
            'ID',
            'Patient',
            'Doctor',
            'Date',
            'Status'
        ];

        $callback = function () use ($appointments, $columns) {
            $file = fopen('php://output', 'w');

            // header row
            fputcsv($file, $columns);

            foreach ($appointments as $appointment) {
                fputcsv($file, [
                    $appointment->id,
                    $appointment->patient->name ?? '',
                    $appointment->doctor->name ?? '',
                    $appointment->appointment_date ?? '',
                    $appointment->status ?? '',
                ]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    
    //  2. Create Appointment (FDO)
    public function store(Request $request)
    {
        $request->validate([
            'case_id' => 'required',
            'patient_id' => 'required',
            'doctor_id' => 'required',
            'specialty_id' => 'required',
            'practice_location_id' => 'required',
            'appointment_date' => 'required|date',
            'appointment_time' => 'required',
            'appointment_type' => 'required',
            'reason_for_visit' => 'required'
        ]);


        $user = $request->attributes->get('auth_user');

        $appointment = Appointment::create([
            ...$request->all(),
            'created_by' => $user->id // FDO ID
        ]);


        // notification store in db
        Notification::create([
            'user_id' => $request->doctor_id,
            'type' => 'appointment',
            'message' => 'New appointment assigned',
            'data' => [
                'appointment_id' => $appointment->id
            ]
        ]);

        $notificationService = app(NotificationService::class);

        $notificationService->sendToUser(
            $request->doctor_id,
            [
                'message' => 'New appointment assigned',
                'appointment_id' => $appointment->id
            ]
        );

        return response()->json([
            'status' => true,
            'message' => 'Appointment created successfully',
            'data' => $appointment
        ]);
    }


    // 3. Show (Edit View)
    public function show($id)
    {
        $appointment = Appointment::with([
            'patient',
            'doctor',
            'specialty',
            'practiceLocation'
        ])->find($id);

        if (!$appointment) {
            return response()->json(['status' => false, 'message' => 'Not found'], 404);
        }

        return response()->json(['status' => true, 'data' => $appointment]);
    }


    //  Update (FDO)
    public function update(Request $request, $id)
    {
        $appointment = Appointment::find($id);

        if (!$appointment) {
            return response()->json(['status' => false, 'message' => 'Not found'], 404);
        }

        $appointment->update($request->all());

        return response()->json([
            'status' => true,
            'message' => 'Appointment updated successfully'
        ]);
    }


    //  Cancel Appointment (FDO)
    public function cancel($id)
    {
        $appointment = Appointment::find($id);

        if (!$appointment) {
            return response()->json(['status' => false], 404);
        }

        $appointment->update(['status' => 'Cancelled']);

        return response()->json([
            'status' => true,
            'message' => 'Appointment cancelled'
        ]);
    }


    //  Reschedule (FDO)
    public function reschedule(Request $request, $id)
    {
        $request->validate([
            'appointment_date' => 'required|date',
            'appointment_time' => 'required'
        ]);

        $appointment = Appointment::find($id);

        if (!$appointment) {
            return response()->json(['status' => false], 404);
        }

        $appointment->update([
            'appointment_date' => $request->appointment_date,
            'appointment_time' => $request->appointment_time,
            'status' => 'Rescheduled'
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Appointment rescheduled'
        ]);
    }


    // Doctor can change status to completed
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:Scheduled,In Progress,Completed,Cancelled'
        ]);

        $appointment = Appointment::find($id);

        if (!$appointment) {
            return response()->json(['status' => false], 404);
        }

        $appointment->update(['status' => $request->status]);

        return response()->json([
            'status' => true,
            'message' => 'Status updated successfully'
        ]);

    }


    //  Soft Delete (Admin only)
    public function destroy($id)
    {
        $appointment = Appointment::find($id);

        if (!$appointment) {
            return response()->json(['status' => false], 404);
        }

        $appointment->delete();

        return response()->json([
            'status' => true,
            'message' => 'Deleted successfully'
        ]);
    }


    //  History Patient or Doctor based
    //for doctor View reports of complete visits (filter by date, case type, diagnosis, or patient )
    // inprogress

    public function history($patient_id)
    {
        $data = Appointment::where('patient_id', $patient_id)
            ->orderBy('appointment_date', 'desc')
            ->get();

        return response()->json([
            'status' => true,
            'data' => $data
        ]);
    }
}
