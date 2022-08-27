<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function viewCart()
    {
        if(auth('sanctum')->check()){
            $user_id = auth('sanctum')->user()->id;
            $cartItems = Cart::where('user_id', $user_id)->get();
            return response()->json(['status'=>200, 'cart'=>$cartItems]);
        }
        else{
            return response()->json(['status'=>401, 'message'=>'Please Login to view Cart']);
        }

    }


    public function addToCart(Request $request)
    {
        if(auth('sanctum')->check()){
            $user_id = auth('sanctum')->user()->id;
            $product_id = $request->product_id;
            $product_qty = $request->product_qty;

            $productCheck = Product::where('id', $product_id)->first();
            if($productCheck){
                if(Cart::where('product_id', $product_id)->where('user_id', $user_id)->exists()){
                    return response()->json(['status'=>409, 'message'=>'Sản phẩm đã tồn tại tròn giỏ hàng']);
                }
                else{
                    $cartItem = new Cart;
                    $cartItem->user_id = $user_id;
                    $cartItem->product_id = $product_id;
                    $cartItem->product_qty = $product_qty;
                    $cartItem->save();
                    return response()->json(['status'=>201, 'message'=>'Đã thêm']);
                }
            }
            else{
                return response()->json(['status'=>404, 'message'=>'Sản phẩm không tồn tại']);
            }
        }
        else{
            return response()->json(['status'=>401, 'message'=>'Please Login Add to Cart']);
        }

       
    }

    public function updateQuantity($cart_id, $scope){
        if(auth('sanctum')->check()){
            $user_id = auth('sanctum')->user()->id;
            
            $cartItem = Cart::where('id', $cart_id)->where('user_id', $user_id)->first();
            if($scope =="inc"){
                $product = Product::where('id', $cartItem->product_id)->first();
                $productQuantity = $product->quantity;
                $cartItemQuantity = $cartItem->product_qty;
                if($productQuantity-$cartItemQuantity>0 ){
                    $cartItem->product_qty +=1; 
                }
                else{
                    $cartItem->product_qty +=0; 
                }

                //$cartItem->product_qty +=1;
            }
            else if($scope =="dec"){
                if($cartItem->product_qty>=2)
                $cartItem->product_qty -=1;
                else{
                    $cartItem->product_qty -=0;
                }
            }
            $cartItem->update();
            return response()->json(['status'=>200, 'message'=>'Quantity updated']);
        }
        else{
            return response()->json(['status'=>401, 'message'=>'Please Login to continue']);
        }
    }
    public function deleteCartItem($cart_id){
        if(auth('sanctum')->check()){
            $user_id = auth('sanctum')->user()->id;
            $cartItem = Cart::where('id', $cart_id)->where('user_id', $user_id)->first();
            if($cartItem){
                $cartItem->delete();
                return response()->json(['status'=>200, 'message'=>'Cart Item Remove Successfully']);
            }
            else{
                return response()->json(['status'=>404, 'message'=>'Cart Item Not Found']);
            }
        }
        else{
            return response()->json(['status'=>401, 'message'=>'Please Login to continue']);
        }

    }


    public function updateCart(Request $request)
    {
        \Cart::update(
            $request->id,
            [
                'quantity' => [
                    'relative' => false,
                    'value' => $request->quantity
                ],
            ]
        );

        session()->flash('success', 'Item Cart is Updated Successfully !');

        return redirect()->route('cart.list');
    }

    public function removeCart(Request $request)
    {
        \Cart::remove($request->id);
        session()->flash('success', 'Item Cart Remove Successfully !');

        return redirect()->route('cart.list');
    }

    public function clearAllCart()
    {
        \Cart::clear();

        session()->flash('success', 'All Item Cart Clear Successfully !');

        return redirect()->route('cart.list');
    }


    public function viewCartByCookies(Request $request){
        $data = $request->arr;
        $products = [];
        for($i=0; $i<count($data); $i++){
            $product = Product::find($data[$i]);
             array_push($products, $product);
        }
        return response()->json(['status'=>200, 'data'=>$products]);
    }
}
