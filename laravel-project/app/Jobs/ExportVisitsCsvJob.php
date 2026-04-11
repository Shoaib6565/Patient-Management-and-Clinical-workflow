<?php

namespace App\Jobs;

use App\Models\Export;
use App\Services\VisitService;
use Illuminate\Bus\Queueable;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ExportVisitsCsvJob implements ShouldQueue
{
    use Dispatchable, Queueable, SerializesModels;

    protected $filters;
    protected $exportId;

    public function __construct($filters, $exportId)
    {
        $this->filters = $filters;
        $this->exportId = $exportId;
    }

    public function handle()
    {
        $service = app(VisitService::class);
        $query = $service->getFilteredVisits($this->filters);

        $fileName = 'exports/visits_' . now()->format('Ymd_His') . '.csv';
        $filePath = storage_path('app/' . $fileName);

        $file = fopen($filePath, 'w');

        // Header
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

        //  chunking (important)
        $query->chunk(100, function ($visits) use ($file) {
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
        });

        fclose($file);

        //  update export table
        $export = Export::find($this->exportId);

        $export->update([
            'file_path' => $fileName,
            'status' => 'completed'
        ]);
    }
}
