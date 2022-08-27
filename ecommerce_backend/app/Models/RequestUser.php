<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RequestUser extends Model
{
    use HasFactory;
    protected $table = 'userrequests';
    public $timestamps = true;
    protected $fillable = [
        'userId',
        'productName',
        'quantity',
        'requestInfo',
        'requestPrice',
    ];
}
