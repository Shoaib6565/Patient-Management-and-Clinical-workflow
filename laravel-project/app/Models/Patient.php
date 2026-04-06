<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Crypt;
use Carbon\Carbon;

class Patient extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name',
        'date_of_birth',
        'gender',
        'ssn',
        'email',
        'phone',
        'mobile',
        'address',
        'city',
        'state',
        'zip_code',
        'country',
        'emergency_contact_name',
        'emergency_contact_phone',
        'primary_physician',
        'insurance_provider',
        'insurance_policy_number',
        'preferred_language',
        'patient_status',
        'registration_date'
    ];

    protected $dates = [
        'date_of_birth',
        'registration_date'
    ];

    // Encrypt SSN before saving
    public function setSsnAttribute($value)
    {
        $this->attributes['ssn'] = Crypt::encryptString($value);
    }

    // Decrypt SSN when retrieving
    public function getSsnAttribute($value)
    {
       return $value ? Crypt::decryptString($value) : null;
    }

    // Computed Age
    public function getAgeAttribute()
    {
        return Carbon::parse($this->date_of_birth)->age;
    }


    // relation with cases table
    public function cases()
    {
        return $this->hasMany(PatientCase::class);
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    public function visits()
    {
        return $this->hasMany(Visit::class);
    }
}
