<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Specialty extends Model
{
    public $timestamps = false;
    protected $fillable = [
        'specialty_name',
        'description',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];



    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    //
    public function doctors()
    {
        return $this->belongsToMany(User::class, 'doctor_specialties', 'specialty_id', 'user_id');
    }
}
