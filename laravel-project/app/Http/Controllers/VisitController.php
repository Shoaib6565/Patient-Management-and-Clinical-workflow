<?php

namespace App\Http\Controllers;

use App\Models\Visit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VisitController extends Controller
{

    /*
    1. Get Visits (All roles)
    Admin  all visits
    Doctor  only own visits
    Front Desk  read only
    */
    public function index(Request $request)
    {
        $search = $request->search;
        $status = $request->status;

        $visits = Visit::query()

            ->when($search, function ($query) use ($search) {
                $query->where('visit_number', 'like', "%$search%");
            })

            ->when($status, function ($query) use ($status) {
                $query->where('visit_status', $status);
            })

            // Doctor can see only his visits
            ->when(Auth::user()->role == 'Doctor', function ($query) {
                $query->where('doctor_id', Auth::id());
            })
            ->with(['patient','doctor','appointment'])
            ->latest()
            ->paginate(10);

        return response()->json($visits);
    }

    // show all list

    public function show($id)
    {
        $visit = Visit::with([
            'patient',
            'case',
            'doctor',
            'appointment'
        ])->find($id);

        if(!$visit){
            return response()->json([
                'status'=>false,
                'message'=>'Visit not found'
            ],404);
        }

        return response()->json([
            'status'=>true,
            'data'=>$visit
        ]);
    }


    //   Doctor updates medical data

    public function update(Request $request, $id)
    {
        $visit = Visit::find($id);

        if(!$visit){
            return response()->json([
                'status'=>false,
                'message'=>'Visit not found'
            ],404);
        }

        // Only doctor allowed
        if(Auth::user()->role !== 'Doctor'){
            return response()->json([
                'status'=>false,
                'message'=>'Unauthorized'
            ],403);
        }

        $visit->update([

            'diagnosis' => $request->diagnosis,
            'diagnosis_codes' => $request->diagnosis_codes,

            'treatment' => $request->treatment,
            'treatment_plan' => $request->treatment_plan,

            'prescription' => $request->prescription,
            'prescription_documents' => $request->prescription_documents,

            'notes' => $request->notes,
            'symptoms' => $request->symptoms,

            'vital_signs' => $request->vital_signs,

            'follow_up_required' => $request->follow_up_required,
            'follow_up_date' => $request->follow_up_date,

            'referral_made' => $request->referral_made,
            'referral_to' => $request->referral_to,

            'visit_status' => $request->visit_status
        ]);

        return response()->json([
            'status'=>true,
            'message'=>'Visit updated successfully',
            'data'=>$visit
        ]);
    }


    // //  Admin Delete (Soft Delete)

    public function destroy($id)
    {
        if(Auth::user()->role !== 'Admin'){
            return response()->json([
                'status'=>false,
                'message'=>'Unauthorized'
            ],403);
        }

        $visit = Visit::find($id);

        if(!$visit){
            return response()->json([
                'status'=>false,
                'message'=>'Visit not found'
            ],404);
        }

        $visit->delete();

        return response()->json([
            'status'=>true,
            'message'=>'Visit deleted successfully'
        ]);
    }


    // // Doctor Complete Visit

    public function complete($id)
    {
        $visit = Visit::find($id);

        if(!$visit){
            return response()->json([
                'status'=>false,
                'message'=>'Visit not found'
            ],404);
        }

        $visit->update([
            'visit_status'=>'Completed',
            'completed_at'=>now()
        ]);

        return response()->json([
            'status'=>true,
            'message'=>'Visit completed'
        ]);
    }
}