<?php

namespace App\Services;

use App\Models\Appointment;

class AppointmentService
{
    public function getFilteredAppointments(array $filters)
    {
        $query = Appointment::with([
            'patient:id,first_name,last_name',
            'doctor:id,name',
            'specialty:id,specialty_name',
            'practiceLocation:id,location_name',
            'createdBy:id,name'
        ]);

        // Patient Name
        if (!empty($filters['patient_name'])) {
            $query->whereHas('patient', function ($q) use ($filters) {
                $q->whereRaw("CONCAT(first_name,' ',last_name) LIKE ?", ["%{$filters['patient_name']}%"]);
            });
        }

        // Doctor Name
        if (!empty($filters['doctor_name'])) {
            $query->whereHas('doctor', function ($q) use ($filters) {
                $q->where('name', 'like', "%{$filters['doctor_name']}%");
            });
        }

        // Specialty
        if (!empty($filters['specialty_name'])) {
            $query->where('specialty_name', $filters['specialty_name']);
        }

        // Date Range
        if (!empty($filters['start_date']) && !empty($filters['end_date'])) {
            $query->whereBetween('appointment_date', [
                $filters['start_date'],
                $filters['end_date']
            ]);
        }

        // Appointment Type
        if (!empty($filters['appointment_type'])) {
            $query->where('appointment_type', $filters['appointment_type']);
        }

        // Status
        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        // Location
        if (!empty($filters['location_name'])) {
            $query->where('location_name', $filters['location_name']);
        }

        // Created By
        if (!empty($filters['created_by'])) {
            $query->where('created_by', $filters['created_by']);
        }

        return $query;
    }
}
