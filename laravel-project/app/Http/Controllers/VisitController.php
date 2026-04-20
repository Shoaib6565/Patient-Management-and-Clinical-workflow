<?php

namespace App\Http\Controllers;

use App\Models\Visit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use  App\Jobs\ExportVisitsCsvJob;
use App\Services\VisitService;
use App\Models\Export;
use Symfony\Component\HttpFoundation\StreamedResponse;


class VisitController extends Controller
{

    protected $visitService;
    public function __construct(VisitService $visitService)
    {
        $this->visitService = $visitService;
    }




    // Get Visits
    public function index(Request $request)
    {
        $query = $this->visitService
        ->getFilteredVisits($request->all());

        $visits = $query->latest()->paginate(10);

        return response()->json($visits);
    }


    // // export to csv
    public function export(Request $request)
    {
        $query = $this->visitService
        ->getFilteredVisits($request->all());

        $visits = $query->get(); // no pagination

        $fileName = "visits_" . now()->format('Ymd_His') . ".csv";

        $headers = [
            "Content-Type" => "text/csv",
            "Content-Disposition" => "attachment; filename=$fileName",
        ];

        $callback = function () use ($visits) {

            $file = fopen('php://output', 'w');

            // CSV Header
            fputcsv($file, [
                'Visit Number',
                'Patient Name',
                'Doctor Name',
                'Visit Date',
                'Visit Time',
                'Diagnosis',
                'Treatment',
                'Status',
                'Follow Up Required',
                'Follow Up Date'
            ]);

            foreach ($visits as $v) {
                fputcsv($file, [
                    $v->visit_number,
                    $v->patient->first_name . ' ' . $v->patient->last_name,
                    $v->doctor->name,
                    $v->visit_date,
                    $v->visit_time,
                    $v->diagnosis,
                    $v->treatment,
                    $v->visit_status,
                    $v->follow_up_required ? 'Yes' : 'No',
                    $v->follow_up_date
                ]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }



    //// //  with job and queue
//     public function export(Request $request)
// {
//     $user = $request->attributes->get('auth_user') ?? null;

//     //  create export record
//     $export = Export::create([
//         'user_id' => $user->id,
//         'type' => 'visit',
//         'status' => 'processing'
//     ]);

//     //  dispatch job
//     ExportVisitsCsvJob::dispatch($request->all(), $export->id);

//     return response()->json([
//         'message' => 'Visit export started'
//     ]);
// }

    // show all list

    public function show($id)
    {
        $visit = Visit::with([
            'patient',
            'case',
            'doctor',
            'appointment'
        ])->find($id);

        if (!$visit) {
            return response()->json([
                'status' => false,
                'message' => 'Visit not found'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'data' => $visit
        ]);
    }


    //   Doctor updates medical data

    public function update(Request $request, $id)
    {
        $visit = Visit::find($id);

        if (!$visit) {
            return response()->json([
                'status' => false,
                'message' => 'Visit not found'
            ], 404);
        }

        // Only doctor allowed
        // $user = $request->attributes->get('auth_user');

        // if ($user->role !== 'Doctor') {
        //     return response()->json([
        //         'status' => false,
        //         'message' => 'Unauthorized'
        //     ], 403);
        // }

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
            'status' => true,
            'message' => 'Visit updated successfully',
            'data' => $visit
        ]);
    }


    // //  Admin Delete (Soft Delete)

    public function destroy(Request $request, $id)
    {
        $user = $request->attributes->get('auth_user');
        if ($user->role !== 'Admin') {  // check after, error can occur (Auth::user()->role)
            return response()->json([
                'status' => false,
                'message' => 'Unauthorized'
            ], 403);
        }

        $visit = Visit::find($id);

        if (!$visit) {
            return response()->json([
                'status' => false,
                'message' => 'Visit not found'
            ], 404);
        }

        $visit->delete();

        return response()->json([
            'status' => true,
            'message' => 'Visit deleted successfully'
        ]);
    }


    // // Doctor Complete Visit

    public function complete($id)
    {
        $visit = Visit::find($id);

        if (!$visit) {
            return response()->json([
                'status' => false,
                'message' => 'Visit not found'
            ], 404);
        }

        $visit->update([
            'visit_status' => 'Completed',
            'completed_at' => now()
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Visit completed'
        ]);
    }



    // // visit statics
    // public function statistics(Request $request)
    // {
    //     $query = Visit::query();

    //     // Optional: filter by doctor
    //     if ($request->doctor_id) {
    //         $query->where('doctor_id', $request->doctor_id);
    //     }

    //     // Optional: filter by date range
    //     if ($request->start_date && $request->end_date) {
    //         $query->whereBetween('visit_date', [$request->start_date, $request->end_date]);
    //     }

    //     $totalVisits = $query->count();

    //     $completedVisits = (clone $query)->where('visit_status', 'Completed')->count();
    //     $draftVisits     = (clone $query)->where('visit_status', 'Draft')->count();
    //     $cancelledVisits = (clone $query)->where('visit_status', 'Cancelled')->count();
    //     $billedVisits    = (clone $query)->where('visit_status', 'Billed')->count();

    //     // Visits per doctor
    //     $visitsPerDoctor = $query->select('doctor_id')
    //         ->with('doctor:id,name')
    //         ->selectRaw('doctor_id, COUNT(*) as total')
    //         ->groupBy('doctor_id')
    //         ->get();

    //     // Visits per specialty
    //     $visitsPerSpecialty = $query->select('specialty_id')
    //         ->with('specialty:id,specialty_name')
    //         ->selectRaw('specialty_id, COUNT(*) as total')
    //         ->groupBy('specialty_id')
    //         ->get();

    //     return response()->json([
    //         'total_visits' => $totalVisits,
    //         'completed_visits' => $completedVisits,
    //         'draft_visits' => $draftVisits,
    //         'cancelled_visits' => $cancelledVisits,
    //         'billed_visits' => $billedVisits,
    //         'visits_per_doctor' => $visitsPerDoctor,
    //         'visits_per_specialty' => $visitsPerSpecialty,
    //     ]);
    // }
}
