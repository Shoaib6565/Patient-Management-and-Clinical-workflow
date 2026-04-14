<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;

class Visit extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'visit_number',
        'appointment_id',
        'case_id',
        'patient_id',
        'doctor_id',
        'visit_date',
        'visit_time',
        'visit_duration_minutes',
        'diagnosis',
        'diagnosis_codes',
        'treatment',
        'treatment_plan',
        'prescription',
        'prescription_documents',
        'notes',
        'vital_signs',
        'symptoms',
        'follow_up_required',
        'follow_up_date',
        'referral_made',
        'referral_to',
        'visit_status',
        'completed_at'
    ];

    protected $casts = [
        'visit_date' => 'date',
        'visit_time' => 'datetime:H:i',
        'diagnosis_codes' => 'array',
        'prescription_documents' => 'array',
        'vital_signs' => 'array',
        'follow_up_required' => 'boolean',
        'referral_made' => 'boolean',
        'completed_at' => 'datetime',
    ];


    // Relationships


    public function appointment()
    {
        return $this->belongsTo(Appointment::class);
    }

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    public function case()
    {
        return $this->belongsTo(PatientCase::class, 'case_id');
    }

    public function doctor()
    {
        return $this->belongsTo(User::class, 'doctor_id');
    }


    //  Auto Logic

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($visit) {

            // Generate visit number
            $visit->visit_number = 'VIS-' . strtoupper(uniqid());

            // Set completed_at if completed
            if ($visit->visit_status === 'Completed') {
                $visit->completed_at = Carbon::now();
            }
        });
    }
}
