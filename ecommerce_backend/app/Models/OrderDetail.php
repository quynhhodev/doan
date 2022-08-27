<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    use HasFactory;
    protected $table = 'orderdetails';
    protected $fillable = [
        'orderId',
        'productId',
        'price',
        'quantity',
    ];

    protected $with = ['product'];
    public function product(){
       return $this->belongsTo(Product::class,'productId', 'id');
    }
}
