<?php

namespace App\Observers;

use App\Models\Appointment;

class AppointmentObserver
{
    /**
     * Handle the Appointment "created" event.
     */
    public function created(Appointment $appointment): void
    {
        //
    }

    /**
     * Handle the Appointment "updated" event.
     */
    public function updated(Appointment $appointment)
{
    // Only trigger if the status just changed to 'Completed'
    if ($appointment->isDirty('status') && $appointment->status === 'Completed') {
        
        $appointment->visit()->create([
            'visit_number'   => 'VISIT-' . now()->year . '-' . str_pad($appointment->id, 5, '0', STR_STR_PAD_LEFT),
            'case_id'        => $appointment->case_id,
            'patient_id'     => $appointment->patient_id,
            'doctor_id'      => $appointment->doctor_id,
            'visit_date'     => now()->toDateString(),
            'visit_time'     => now()->toTimeString(),
            'visit_status'   => 'Draft', // Visit starts as Draft even if appointment is completed
        ]);
    }
}

    /**
     * Handle the Appointment "deleted" event.
     */
    public function deleted(Appointment $appointment): void
    {
        //
    }

    /**
     * Handle the Appointment "restored" event.
     */
    public function restored(Appointment $appointment): void
    {
        //
    }

    /**
     * Handle the Appointment "force deleted" event.
     */
    public function forceDeleted(Appointment $appointment): void
    {
        //
    }
}
