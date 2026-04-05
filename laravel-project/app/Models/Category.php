<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $fillable = [
        'name',
        'description',
        'is_active'
    ];

    //  Reverse Relation (Category to Cases)
    public function cases()
    {
        return $this->hasMany(CaseModel::class, 'category_id');
    }
}
