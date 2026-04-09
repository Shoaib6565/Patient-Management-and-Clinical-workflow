<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{




    // function for share logic
    private function getFilteredAppointments(Request $request)
    {
        $query = Appointment::with([
            'patient:id,first_name,last_name',
            'doctor:id,name',
            'specialty:id,specialty_name',
            'practiceLocation:id,location_name',
            'createdBy:id,name'
        ]);

        // Patient Name
        if ($request->patient_name) {
            $query->whereHas('patient', function ($q) use ($request) {
                $q->whereRaw("CONCAT(first_name,' ',last_name) LIKE ?", ["%{$request->patient_name}%"]);
            });
        }

        // Doctor Name
        if ($request->doctor_name) {
            $query->whereHas('doctor', function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->doctor_name}%");
            });
        }

        // Specialty
        if ($request->specialty_name) {
            $query->where('specialty_name', $request->specialty_name);
        }

        // Date Range
        if ($request->start_date && $request->end_date) {
            $query->whereBetween('appointment_date', [$request->start_date, $request->end_date]);
        }

        // Appointment Type
        if ($request->appointment_type) {
            $query->where('appointment_type', $request->appointment_type);
        }

        // Status
        if ($request->status) {
            $query->where('status', $request->status);
        }

        // Practice Location
        if ($request->location_name) {
            $query->where('location_name', $request->location_name);
        }

        // Created By (FDO)
        if ($request->created_by) {
            $query->where('created_by', $request->created_by);
        }

        return $query;
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

    // 1. List + Filters (Admin & FDO)
    public function index(Request $request)
    {
        $query = $this->getFilteredAppointments($request);

        $appointments = $query->latest()->paginate(10);

        return response()->json($appointments);
    }



    // function for export to csv file
    public function export(Request $request)
    {
        $query = $this->getFilteredAppointments($request);

        $appointments = $query->get();

        $fileName = "appointments_" . now()->format('Ymd_His') . ".csv";

        $headers = [
            "Content-Type" => "text/csv",
            "Content-Disposition" => "attachment; filename=$fileName",
        ];

        $callback = function () use ($appointments) {

            $file = fopen('php://output', 'w');

            // csv header
            fputcsv($file, [
                'Patient Name',
                'Doctor Name',
                'Specialty',
                'Date',
                'Time',
                'Type',
                'Status',
                'Location',
                'Created By'
            ]);

            foreach ($appointments as $a) {
                fputcsv($file, [
                    $a->patient->first_name . ' ' . $a->patient->last_name,
                    $a->doctor->name,
                    $a->specialty->specialty_name ?? '',
                    $a->appointment_date,
                    $a->appointment_time,
                    $a->appointment_type,
                    $a->status,
                    $a->practiceLocation->location_name ?? '',
                    $a->createdBy->name ?? ''
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


    //  History (Patient or Doctor based)
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
