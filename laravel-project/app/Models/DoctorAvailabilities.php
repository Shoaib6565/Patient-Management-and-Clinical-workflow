<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DoctorAvailability extends Model
{

public $timestamps = false;

    protected $fillable = [
        'user_id',
        'practice_location_id',
        'day_of_week',
        'start_time',
        'end_time',
        'is_available'
    ];

    protected $casts = [
        'start_time' => 'string',
        'end_time' => 'string',
        'is_available' => 'boolean',
    ];


    // relation with user table
    public function doctor()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Relation with Practice Location
    public function practiceLocation()
    {
        return $this->belongsTo(PracticeLocation::class, 'practice_location_id');
    }
}
