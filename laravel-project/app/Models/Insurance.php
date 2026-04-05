<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Insurance extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'insurance_name',
        'insurance_code',
        'address',
        'phone',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];


    // // if patients have insurance
    // public function patients()
    // {
    //     return $this->hasMany(Patient::class);
    // }

    //  cases linked with insurance
    public function cases()
    {
        return $this->hasMany(PatientCase::class);
    }
}
