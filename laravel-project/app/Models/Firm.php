<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Firm extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'firm_name',
        'firm_type',
        'address',
        'phone',
        'contact_person',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];



    // relation with case table
    public function cases()
    {
        return $this->hasMany(PatientCase::class);
    }
}
