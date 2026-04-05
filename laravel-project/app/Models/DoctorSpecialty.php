<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DoctorSpecialty extends Model
{
    public $timestamps = false;
    
    protected $table = 'doctor_specialties';

    protected $fillable = ['user_id', 'specialty_id'];

    public function doctor()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function specialty()
    {
        return $this->belongsTo(Specialty::class, 'specialty_id');
    }
}
