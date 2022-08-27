<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Comment extends Model
{
    use HasFactory;

    protected $table = 'comments';
    public $timestamps = true;
    protected $fillable = [
        'content',
        'userId',
        'productId',
        'star'
    ];
    protected $with = ['user'];
    public function user(){
        return $this->belongsTo(User::class, 'userId', 'id');
    }
    
    public function product(){
        return $this->hasOne(Product::class, 'id', 'productId');
    }
}
