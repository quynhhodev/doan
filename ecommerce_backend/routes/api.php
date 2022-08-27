<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LinkController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\RequestUserController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
// Public API
Route::get('view-product/{category_slug}/{product_slug}', [HomeController::class, 'viewProduct']);
Route::get('view-product-like/{category_slug}/{product_slug}', [HomeController::class, 'viewProductLike']);
Route::get('product-for-sale', [HomeController::class, 'productForSale']);

Route::get('categories-at-home', [HomeController::class, 'catAtHome']);

Route::get('cats-show-home', [HomeController::class, 'CatsShowHome']);
Route::get('search/{text}', [HomeController::class, 'search']);
Route::get('product-by-cat-show-home/{id}', [HomeController::class, 'productByCatShowHome']);
Route::post('request-user', [RequestUserController::class, 'store']);
Route::get('recommended-item', [HomeController::class, 'recommendedItem']);
Route::get('product-by-cat/{slug}', [HomeController::class, 'productByCat']);
Route::get('product-by-brand/{brand}', [HomeController::class, 'productByBrand']);
Route::get('popularCat', [HomeController::class, 'popularCat']);
Route::get('best-selling-products', [HomeController::class, 'bestSellingProducts']);
Route::post('add-to-cart', [CartController::class, 'addToCart']);
Route::get('cart', [CartController::class, 'viewCart']);
Route::put('cart-updatequantity/{card_id}/{scope}', [CartController::class, 'updateQuantity']);
Route::delete('delete-cartitem/{card_id}', [CartController::class, 'deleteCartItem']);
Route::post('view-cart-by-cookies', [CartController::class, 'viewCartByCookies']);
Route::post('place-order', [CheckoutController::class, 'placeOrder']);
Route::post('place-order-cookies', [CheckoutController::class, 'placeOrderCookies']);

Route::get('brand-home', [HomeController::class, 'brandHome']);
Route::get('popular-brands', [HomeController::class, 'popularBrands']);
Route::get('popular-brands', [HomeController::class, 'popularBrands']);
Route::get('user-detail', [HomeController::class, 'userDetail']);
Route::post('user-update', [HomeController::class, 'userUpdate']);
Route::get('banner-top/{position}', [HomeController::class, 'topBanner']);
Route::get('post-home', [HomeController::class, 'postHome']);
Route::get('post-detail/{slug}', [HomeController::class, 'postDetail']);
Route::get('tintuc', [HomeController::class, 'tinTuc']);

Route::get('/view-order-by-user', [HomeController::class, 'viewOrderByUser']);
Route::delete('/delete-order/{order_id}', [HomeController::class, 'deleteOrder']);
Route::delete('/delete-comment/{id}', [HomeController::class, 'deleteComment']);


// Test session
// Route::get('order-today', [OrderController::class, 'orderToday']);
// Route::post('edit-order/{id}', [OrderController::class, 'orderChangeStatus']);

// Route::get('order-search', [OrderController::class, 'orderSearch']);
// Route::get('render-type', [OrderController::class, 'renderType']);
// Route::get('data-week', [OrderController::class, 'dataWeek']);
// Route::get('data-year', [OrderController::class, 'dataYear']);
// Route::get('list-data', [OrderController::class, 'listData']);



//Route::post('put-session', [HomeController::class, 'putSession']);


// cart
// Route::get('cart', [CartController::class, 'cartList'])->name('cart.list');
// Route::post('cart/{id}', [CartController::class, 'addToCart'])->name('cart.store');
// Route::post('update-cart/{id}', [CartController::class, 'updateCart'])->name('cart.update');
// Route::post('remove/{id}', [CartController::class, 'removeCart'])->name('cart.remove');
// Route::post('clear', [CartController::class, 'clearAllCart'])->name('cart.clear');



// // Category management API
// Route::post('/create-category', [CategoryController::class, 'store']);
// Route::get('/categories', [CategoryController::class, 'index']);
// Route::get('edit-category/{id}', [CategoryController::class, 'edit']);
// Route::post('update-category/{id}', [CategoryController::class, 'update']);
// Route::delete('/delete-category/{id}', [CategoryController::class, 'destroy']);
// // Category Trash
// Route::delete('/category-to-trash/{id}', [CategoryController::class, 'trash']);
// Route::get('/categories-in-trash', [CategoryController::class, 'intrash']);
// Route::get('/category-restore/{id}', [CategoryController::class, 'restore']);





// // Product management API
// Route::post('/add-product', [ProductController::class, 'store']);
// Route::get('/products', [ProductController::class, 'index']);
// Route::get('/all-categories', [ProductController::class, 'allCategory']);
// Route::get('/all-brands', [ProductController::class, 'allBrand']);
// Route::get('/edit-product/{id}', [ProductController::class, 'edit']);
// Route::post('/update-product/{id}', [ProductController::class, 'update']);
// Route::delete('/delete-product/{id}', [ProductController::class, 'destroy']);
// Route::get('product-search', [ProductController::class, 'productSearch']);

// // Product Trash
// Route::delete('/product-to-trash/{id}', [ProductController::class, 'trash']);
// Route::get('/product-in-trash', [ProductController::class, 'intrash']);
// Route::get('/product-restore/{id}', [ProductController::class, 'restore']);
// // Link management API
// Route::post('/add-link', [LinkController::class, 'store']);
// Route::get('/links', [LinkController::class, 'index']);
// Route::get('/edit-link/{id}', [LinkController::class, 'edit']);
// Route::post('/update-link/{id}', [LinkController::class, 'update']);
// Route::delete('/delete-link/{id}', [LinkController::class, 'destroy']);
// // Category Trash
// Route::delete('/link-to-trash/{id}', [LinkController::class, 'trash']);
// Route::get('/link-in-trash', [LinkController::class, 'intrash']);
// Route::get('/link-restore/{id}', [LinkController::class, 'restore']);


// // Brand management API

// Route::post('/add-brand', [BrandController::class, 'store']);
// Route::get('/brands', [BrandController::class, 'index']);
// Route::get('/edit-brand/{id}', [BrandController::class, 'edit']);
// Route::post('/update-brand/{id}', [BrandController::class, 'update']);
// Route::delete('/delete-brand/{id}', [BrandController::class, 'destroy']);
// // Category Trash
// Route::delete('/brand-to-trash/{id}', [BrandController::class, 'trash']);
// Route::get('/brand-in-trash', [BrandController::class, 'intrash']);
// Route::get('/brand-restore/{id}', [BrandController::class, 'restore']);

// Posts
// Route::post('/add-post', [PostController::class, 'store']);
// Route::get('/posts', [PostController::class, 'index']);
// Route::get('/edit-post/{id}', [PostController::class, 'edit']);
// Route::post('/update-post/{id}', [PostController::class, 'update']);
// Route::delete('/delete-post/{id}', [PostController::class, 'destroy']);



// Comment

Route::post('/add-comment', [CommentController::class, 'store']);
Route::get('/get-comment/{id}', [CommentController::class, 'index']);
Route::put('/edit-comment/{id}', [CommentController::class, 'edit']);
Route::get('/comments', [CommentController::class, 'listComments']);
Route::delete('/delete-comment/{id}', [CommentController::class, 'destroy']);

// Contact
Route::post('/contact', [ContactController::class, 'store']);
Route::get('/contacts', [ContactController::class, 'index']);
Route::post('/edit-contact/{id}', [ContactController::class, 'update']);


// Orders User
// Route::get('order-today', [OrderController::class, 'orderToday']);
//     Route::post('edit-order/{id}', [OrderController::class, 'orderChangeStatus']);
//     Route::get('order-search', [OrderController::class, 'orderSearch']);
//     Route::get('render-type', [OrderController::class, 'renderType']);
//     Route::get('data-week', [OrderController::class, 'dataWeek']);
//     Route::get('data-year', [OrderController::class, 'dataYear']);
//     Route::get('list-data', [OrderController::class, 'listData']);
//     Route::get('admin/orders', [OrderController::class, 'index']);
//     Route::get('order-details/{order_id}/{user_id}', [OrderController::class, 'viewDetail']);

// Auth API routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware(['auth:sanctum','isAPIShipper'])->group(function () {
    // Route::get('/checkingAuthenticated', function () {
    //     return response()->json(['status'=> 200, 'message'=>'You are'], 200);
    // });
    Route::get('order-today', [OrderController::class, 'orderToday']);
    Route::post('edit-order/{id}', [OrderController::class, 'orderChangeStatus']);
    Route::get('order-search', [OrderController::class, 'orderSearch']);
    Route::get('render-type', [OrderController::class, 'renderType']);
    Route::get('data-week', [OrderController::class, 'dataWeek']);
    Route::get('data-year', [OrderController::class, 'dataYear']);
    Route::get('list-data', [OrderController::class, 'listData']);
    Route::get('admin/orders', [OrderController::class, 'index']);
    Route::get('order-details/{order_id}/{user_id}', [OrderController::class, 'viewDetail']);
});
Route::middleware(['auth:sanctum','isAPIAdmin'])->group(function () {
    Route::get('/checkingAuthenticated', function () {
        return response()->json(['status'=> 200, 'message'=>'You are'], 200);
    });
    // Orders
    Route::get('order-today', [OrderController::class, 'orderToday']);
    Route::post('edit-order/{id}', [OrderController::class, 'orderChangeStatus']);
    Route::get('order-search', [OrderController::class, 'orderSearch']);
    Route::get('render-type', [OrderController::class, 'renderType']);
    Route::get('data-week', [OrderController::class, 'dataWeek']);
    Route::get('data-year', [OrderController::class, 'dataYear']);
    Route::get('list-data', [OrderController::class, 'listData']);
    Route::get('admin/orders', [OrderController::class, 'index']);
    Route::get('orders-shipper', [OrderController::class, 'ordersShipper']);
    Route::get('doanh-thu', [OrderController::class, 'doanhThu']);
    Route::get('order-details/{order_id}/{user_id}', [OrderController::class, 'viewDetail']);
    
    // Brand management API

    Route::post('/add-brand', [BrandController::class, 'store']);
    Route::get('/brands', [BrandController::class, 'index']);
    Route::get('/edit-brand/{id}', [BrandController::class, 'edit']);
    Route::post('/update-brand/{id}', [BrandController::class, 'update']);
    Route::delete('/delete-brand/{id}', [BrandController::class, 'destroy']);
    // Brand Trash
    Route::delete('/brand-to-trash/{id}', [BrandController::class, 'trash']);
    Route::get('/brand-in-trash', [BrandController::class, 'intrash']);
    Route::get('/brand-restore/{id}', [BrandController::class, 'restore']);

    //Post
    Route::post('/add-post', [PostController::class, 'store']);
    Route::get('/posts', [PostController::class, 'index']);
    Route::get('/edit-post/{id}', [PostController::class, 'edit']);
    Route::post('/update-post/{id}', [PostController::class, 'update']);
    Route::delete('/delete-post/{id}', [PostController::class, 'destroy']);

    // Category management API
    Route::post('/create-category', [CategoryController::class, 'store']);
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('edit-category/{id}', [CategoryController::class, 'edit']);
    Route::post('update-category/{id}', [CategoryController::class, 'update']);
    Route::delete('/delete-category/{id}', [CategoryController::class, 'destroy']);
    // Category Trash
    Route::delete('/category-to-trash/{id}', [CategoryController::class, 'trash']);
    Route::get('/categories-in-trash', [CategoryController::class, 'intrash']);
    Route::get('/category-restore/{id}', [CategoryController::class, 'restore']);

    // Product management API
    Route::post('/add-product', [ProductController::class, 'store']);
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/all-categories', [ProductController::class, 'allCategory']);
    Route::get('/all-brands', [ProductController::class, 'allBrand']);
    Route::get('/edit-product/{id}', [ProductController::class, 'edit']);
    Route::post('/update-product/{id}', [ProductController::class, 'update']);
    Route::delete('/delete-product/{id}', [ProductController::class, 'destroy']);
    Route::get('product-search', [ProductController::class, 'productSearch']);

    // Product Trash
    Route::delete('/product-to-trash/{id}', [ProductController::class, 'trash']);
    Route::get('/product-in-trash', [ProductController::class, 'intrash']);
    Route::get('/product-restore/{id}', [ProductController::class, 'restore']);
    // Link management API
    Route::post('/add-link', [LinkController::class, 'store']);
    Route::get('/links', [LinkController::class, 'index']);
    Route::get('/edit-link/{id}', [LinkController::class, 'edit']);
    Route::post('/update-link/{id}', [LinkController::class, 'update']);
    Route::delete('/delete-link/{id}', [LinkController::class, 'destroy']);
    // Category Trash
    Route::delete('/link-to-trash/{id}', [LinkController::class, 'trash']);
    Route::get('/link-in-trash', [LinkController::class, 'intrash']);
    Route::get('/link-restore/{id}', [LinkController::class, 'restore']);
   
});
Route::middleware(['auth:sanctum'])->group(function () {
   Route::post('/logout', [AuthController::class, 'logout']); 
});


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
