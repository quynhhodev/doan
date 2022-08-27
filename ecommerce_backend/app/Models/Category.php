<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $table = 'categories';
    public $timestamps = true;
    protected $fillable = [
        'catName',
        'slug',
        'image',
        'parentId',
        'description',
        'status',
    ];
}
