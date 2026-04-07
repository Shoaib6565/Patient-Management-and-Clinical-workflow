<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{

    // 1. List + Filters (Admin & FDO)
    public function index(Request $request)
    {
        $query = Appointment::with([
            'patient:id,first_name,last_name',
            'doctor:id,name',
            'specialty:id,specialty_name',
            'practiceLocation:id,location_name',
            'createdBy:id,name'
        ]);

        //  Filters

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
        if ($request->specialty_id) {
            $query->where('specialty_id', $request->specialty_id);
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
        if ($request->practice_location_id) {
            $query->where('practice_location_id', $request->practice_location_id);
        }

        // Created By (FDO)
        if ($request->created_by) {
            $query->where('created_by', $request->created_by);
        }

        $appointments = $query->latest()->paginate(10);

        return response()->json($appointments);
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
