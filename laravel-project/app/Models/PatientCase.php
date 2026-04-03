<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PatientCase extends Model
{
    use SoftDeletes;

    protected $table = 'cases';

    protected $fillable = [
        'case_number',
        'patient_id',
        'practice_location_id',
        'category',
        'purpose_of_visit',
        'case_type',
        'priority',
        'case_status',
        'date_of_accident',
        'insurance_id',
        'firm_id',
        'referred_by',
        'referred_doctor_name',
        'opening_date',
        'closing_date',
        'clinical_notes'
    ];

    protected $dates = [
        'date_of_accident',
        'opening_date',
        'closing_date'
    ];

 
    // Each case belongs to one patient
    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    // Practice Location
    public function practiceLocation()
    {
        return $this->belongsTo(PracticeLocation::class);
    }

    // Insurance
    public function insurance()
    {
        return $this->belongsTo(Insurance::class);
    }

    // Firm
    public function firm()
    {
        return $this->belongsTo(Firm::class);
    }
}