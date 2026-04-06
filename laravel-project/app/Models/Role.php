<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Role extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'name'
    ];



    // // many to many relationship with users
    public function users()
    {
         return $this->belongsToMany(User::class, 'user_roles');
    }

    // many to many relationship with permissions
    public function permissions()
    {
        return $this->belongsToMany(Permission::class,'role_permissions','role_id','permission_id');
    }
}
