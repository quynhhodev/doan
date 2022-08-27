<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Brand extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $table = 'brands';
    public $timestamps = true;
    protected $fillable = [
        'brandName',
        'slug',
        'description',
        'status',
    ];
}
