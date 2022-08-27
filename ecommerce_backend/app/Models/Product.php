<?php

namespace App\Models;

use App\Models\Comment;
use App\Models\Category;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $table = 'products';
    public $timestamps = true;
    protected $fillable = [
        'productName',
        'catId',
        'slug',
        'brandId',
        'shortDetail',
        'detail',
        'specifications',
        'price',
        'quantity',
        'salePrice',
        'image',
        'status',
        'offersGifts',
        'installment',
        'rom',
        'ram'
    ];
    protected $with = ['category'];
    public function category(){
        return $this->belongsTo(Category::class, 'catId', 'id');
    }
    
    public function brand(){
        return $this->belongsTo(Brand::class, 'brandId', 'id');
    }
    
}
