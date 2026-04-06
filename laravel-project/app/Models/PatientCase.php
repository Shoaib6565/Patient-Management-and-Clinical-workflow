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
        'category_id',
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



    // for auto generated visit number
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($case) {

            $year = date('Y');

            // safer approach using ID (after save)
            $latestId = DB::table('cases')->max('id') + 1;

            $case->case_number = 'CASE-' . $year . '-' . str_pad($latestId, 5, '0', STR_PAD_LEFT);
        });
    }


        // Relation (Case to Category)
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }


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

    // appointment
    public function appointments()
    {
        return $this->hasMany(Appointment::class, 'case_id');
    }

    // visit
    public function visits()
    {
        return $this->hasMany(Visit::class, 'case_id');
    }
}
