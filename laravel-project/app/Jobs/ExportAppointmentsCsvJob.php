<?php

namespace App\Jobs;

use App\Models\Export;
use App\Services\AppointmentService;
use Illuminate\Bus\Queueable;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ExportAppointmentsCsvJob implements ShouldQueue
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
        //  Service
        $service = app(AppointmentService::class);
        $query = $service->getFilteredAppointments($this->filters);

        $fileName = 'exports/appointments_' . now()->format('Ymd_His') . '.csv';
        $filePath = storage_path('app/' . $fileName);

        $file = fopen($filePath, 'w');

        // Header
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

        //  Chunking
        $query->chunk(100, function ($appointments) use ($file) {
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
        });

        fclose($file);

$export = Export::find($this->exportId);

$export->update([
    'file_path' => $fileName,
    'status' => 'completed'
]);
    }
}
