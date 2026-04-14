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
        if ($appointment->wasChanged('status') && $appointment->status === 'Completed') {

            //prevent duplicate visit
            if (!$appointment->visit) {

                $appointment->visit()->create([
                    'visit_number' => 'VISIT-' . now()->year . '-' . str_pad($appointment->id, 5, '0', STR_PAD_LEFT),
                    'case_id'      => $appointment->case_id,
                    'patient_id'   => $appointment->patient_id,
                    'doctor_id'    => $appointment->doctor_id,
                    'visit_date'   => $appointment->appointment_date,
                    'visit_time'   => $appointment->appointment_time,
                    'visit_status' => 'Draft',
                ]);
            }
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
