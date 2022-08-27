<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Link extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $table = 'links';
    public $timestamps = true;
    protected $fillable = [
        'title',
        'position',
        'url',
        'status',
        'image'
    ];
}
