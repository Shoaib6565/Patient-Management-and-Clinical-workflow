<?php

namespace App\Services;

use App\Models\Visit;

class VisitService
{
    public function getFilteredVisits(array $filters)
    {
        $query = Visit::with(['patient', 'doctor', 'appointment']);

        if (!empty($filters['search'])) {
            $query->where('visit_number', 'like', "%{$filters['search']}%");
        }

        if (!empty($filters['status'])) {
            $query->where('visit_status', $filters['status']);
        }

        if (!empty($filters['start_date']) && !empty($filters['end_date'])) {
            $query->whereBetween('visit_date', [
                $filters['start_date'],
                $filters['end_date']
            ]);
        }

        if (!empty($filters['case_type'])) {
            $query->whereHas('appointment.case', function ($q) use ($filters) {
                $q->where('case_type', $filters['case_type']);
            });
        }

        if (!empty($filters['diagnosis'])) {
            $query->where('diagnosis', 'like', "%{$filters['diagnosis']}%");
        }

        if (!empty($filters['patient_name'])) {
            $query->whereHas('patient', function ($q) use ($filters) {
                $q->whereRaw("CONCAT(first_name,' ',last_name) LIKE ?", ["%{$filters['patient_name']}%"]);
            });
        }

        return $query;
    }
}
