<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Export extends Model
{
    protected $fillable = [
        'user_id',
        'file_path',
        'status',
        'type'
    ];

    // relation with user because admin use it
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
