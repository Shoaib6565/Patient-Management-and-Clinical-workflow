<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $fillable = [
        'name',
        'email',
        'password',
        'is_active'
    ];

    protected $hidden = [
        'password'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'archived_at' => 'datetime'
    ];



    // relationship
    public function roles()
    {
        return $this->belongsToMany(Role::class, 'user_roles','user_id', 'role_id');
    }

    //relation with specialties for doctor_specialties (pivot table)
    public function specialties()
    {
        return $this->belongsToMany(Specialty::class, 'doctor_specialties', 'user_id', 'specialty_id');
    }

    //
    public function appointments()
    {
        return $this->hasMany(Appointment::class, 'doctor_id');
    }

    public function createdAppointments()
    {
        return $this->hasMany(Appointment::class, 'created_by');
    }

    public function visits()
    {
        return $this->hasMany(Visit::class, 'doctor_id');
    }
}
