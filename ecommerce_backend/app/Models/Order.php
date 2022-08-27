<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $table = 'orders';
    protected $fillable =[
        'firstName',
        'lastName',
        'phone',
        'email',
        'address',
        'city',
        'state',
        'zipcode',
        'payment_id',
        'payment_mode',
        'tracking_no',
    ];

    public function orderItems(){
        return $this->hasMany(OrderDetail::class, 'orderId', 'id');
    }
}
