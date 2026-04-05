<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PracticeLocation extends Model
{
    public $timestamps = false;
    protected $fillable = [
        'location_name',
        'address',
        'city',
        'state',
        'zip',
        'phone',
        'email',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];



    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    // relation with doctor availabilities table
    public function doctorAvailabilities()
    {
        return $this->hasMany(DoctorAvailability::class, 'practice_location_id');
    }
}
