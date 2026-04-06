<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;

class Appointment extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'appointment_number',
        'case_id',
        'patient_id',
        'doctor_id',
        'appointment_date',
        'appointment_time',
        'end_time',
        'appointment_type',
        'specialty_id',
        'practice_location_id',
        'duration_minutes',
        'status',
        'reminder_sent',
        'reminder_method',
        'notes',
        'reason_for_visit',
        'created_by'
    ];

    protected $casts = [
        'appointment_date' => 'date',
        'appointment_time' => 'datetime:H:i',
        'end_time' => 'datetime:H:i',
        'reminder_sent' => 'boolean',
    ];


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

    public function specialty()
    {
        return $this->belongsTo(Specialty::class);
    }

    public function practiceLocation()
    {
        return $this->belongsTo(PracticeLocation::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function visit()
    {
        return $this->hasOne(Visit::class);
    }


    // Auto Generate Logic

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($appointment) {

            // Generate appointment number
            $appointment->appointment_number = 'APT-' . strtoupper(uniqid());

            // Calculate end_time
            if ($appointment->appointment_time && $appointment->duration_minutes) {
                $start = Carbon::parse($appointment->appointment_time);
                $appointment->end_time = $start
                    ->addMinutes($appointment->duration_minutes)
                    ->format('H:i:s');
            }
        });
    }
}
