<?php

namespace App\Http\Controllers;

use App\Models\Link;
use App\Models\Page;
use App\Models\User;
use App\Models\Brand;
use App\Models\Order;
use App\Models\Comment;
use App\Models\Product;
use App\Models\Category;
use App\Models\OrderDetail;
use App\Models\RequestUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    // public function __construct()
    // {
    //     $this->middleware('auth');
    // }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }
    public function catAtHome(){
        $categories = Category::where('status', '>', 0)->limit(9)->get();
        return response()->json(['status'=>200, 'data'=>$categories]);
    }
    public function popularCat(){
        $cat = Category::where('popular', '=' ,1)->where('status', '>=', 1)->orderBy('created_at', 'desc')->limit(3)->get();
        return response()->json([
            'status' => 200,
            'data' => $cat 
        ]);
    }
    
    
    public function productForSale()
    {
        $comments = Comment::all();

        $listProduct = Product::where('status','=',2)->orderBy('id','desc')->limit(5)->get();
        $productForSale = [];
        $i=0;
        foreach($listProduct as $product){
            $vote =0.0;
            $countVote = 0;
            if(intval($product->salePrice)<intval($product->price)&&$i<=5){
                foreach($comments as $comment)
                    {
                        if($product->id==$comment->productId){
                            $vote+=$comment->star;
                            $countVote +=1;
                        }
                    }
                    if($vote !=0.0 && $countVote != 0){
                        $product->vote = round($vote/$countVote,1);
                        $product->countVote = $countVote;
                    }
                    else{
                        $product->vote =0;
                    }
                array_push($productForSale,$product);
                $i++;
            }
        }
        return response()->json(['status'=>200, 'productForSale'=>$productForSale]);
    }



    public function CatsShowHome(){
        $cats = Category::where('status','2')->get();
        if($cats){
            return response()->json(['status'=>200, 'data'=>$cats]);
        }
        else{
            return response()->json(['status'=>404, 'message'=>'not found']);
        }
    }

    public function productByCatShowHome($id) {
        $comments = Comment::all();
        $cat = Category::find($id);
        if($cat){
            $products = Product::where('catId', $cat->id)->limit(8)->get();
            if($products){
                
                foreach($products as $product){
                    $vote =0.0;
                    $countVote = 0;
                    foreach($comments as $comment)
                    {
                        if($product->id==$comment->productId){
                            $vote+=$comment->star;
                            $countVote +=1;
                        }
                    }
                    if($vote !=0.0 && $countVote != 0){
                        $product->vote = round($vote/$countVote,1);
                        $product->countVote = $countVote;
                    }
                    else{
                        $product->vote =0;
                    }
                    
                    
                }
                return response()->json(['status'=>200, 'data'=>$products]);
            }
            else{
                return response()->json(['status'=>401, 'message'=>"Category haven't Product"]);
            }
        }
        else{
            return response()->json(['status'=>404, 'message'=>'Category not found']);
        }


    }

    public function recommendedItem(){
        $comments = Comment::all();
        $products = Product::where('status','>=','1')->orderBy('created_at', 'DESC')->limit(12)->get();
        if($products){
            foreach($products as $product){
                $vote =0.0;
                $countVote = 0;
                foreach($comments as $comment)
                {
                    if($product->id==$comment->productId){
                        $vote+=$comment->star;
                        $countVote +=1;
                    }
                }
                if($vote !=0.0 && $countVote != 0){
                    $product->vote = round($vote/$countVote,1);
                    $product->countVote = $countVote;
                }
                else{
                    $product->vote =0;
                }
                
                
            }
            return response()->json(['status'=>200, 'data'=>$products]);
        }
        else{
            return response()->json(['status'=>401, 'message'=>"Category haven't Product"]);
        }
        //return response()->json(['status'=>200, 'data'=>$products]);
    }

    public function productByCat($slug){
        $category = Category::where('slug', '=', $slug)->first();
        $comments = Comment::all();
        if($category){
            $products = Product::where('catId', '=', $category->id)->where('status','>=','1')->get();
            if($products){
                foreach($products as $product){
                    $vote =0.0;
                    $countVote = 0;
                    foreach($comments as $comment)
                    {
                        if($product->id==$comment->productId){
                            $vote+=$comment->star;
                            $countVote +=1;
                        }
                    }
                    if($vote !=0.0 && $countVote != 0){
                        $product->vote = round($vote/$countVote,1);
                        $product->countVote = $countVote;
                    }
                    else{
                        $product->vote =0;
                    }
                }
                return response()->json(['status'=>200, 'product_data'=>['products'=>$products, "category"=>$category]]);
            }
            else{
                return response()->json(['status'=>400, 'message'=>'No Product Available']);
            }
        }
        else{
            return response()->json(['status'=>404, 'message'=>'No Such Category found']);
        }
    }
    public function productByBrand($brand){
        $brand = Brand::where('slug', '=', $brand)->first();
        $comments = Comment::all();
        if($brand){
            $products = Product::where('brandId', '=', $brand->id)->where('status','>=','1')->get();
            if($products){
                foreach($products as $product){
                    $vote =0.0;
                    $countVote = 0;
                    foreach($comments as $comment)
                    {
                        if($product->id==$comment->productId){
                            $vote+=$comment->star;
                            $countVote +=1;
                        }
                    }
                    if($vote !=0.0 && $countVote != 0){
                        $product->vote = round($vote/$countVote,1);
                        $product->countVote = $countVote;
                    }
                    else{
                        $product->vote =0;
                    }
                }
                return response()->json(['status'=>200, 'product_data'=>['products'=>$products, "brand"=>$brand]]);
            }
            else{
                return response()->json(['status'=>400, 'message'=>'No Product Available']);
            }
        }
        else{
            return response()->json(['status'=>404, 'message'=>'No Such Category found']);
        }
    }
    public function bestSellingProducts(){
        $comments = Comment::all();
        $products = Product::where('status','>', 0)
                                ->orderBy('quantity', 'ASC')
                                ->where('quantity','>',0)
                                ->limit(10)
                                ->get();
        if($products){
            foreach($products as $product){
                $vote =0.0;
                $countVote = 0;
                foreach($comments as $comment)
                {
                    if($product->id==$comment->productId){
                        $vote+=$comment->star;
                        $countVote +=1;
                    }
                }
                if($vote !=0.0 && $countVote != 0){
                    $product->vote = round($vote/$countVote,1);
                    $product->countVote = $countVote;
                }
                else{
                    $product->vote =0;
                }
                
            }
            return response()->json(['status'=>200, 'data'=>$products]);
        }
        else{
            return response()->json(['status'=>404, 'message'=>'Products not found']);
        }
    }

    public function viewProduct($category_slug, $product_slug){
        $category = Category::where('slug', '=', $category_slug)->where('status','>=','1')->first();
        if($category){
            $product = Product::where('catId', '=', $category->id)
                                ->where('slug', '=', $product_slug)
                                ->where('status','>=','1')
                                ->first();
            if($product){
                return response()->json(['status'=>200, 'product'=>$product]);
            }
            else{
                return response()->json(['status'=>400, 'message'=>'No Product Available']);
            }
        }
        else{
            return response()->json(['status'=>404, 'message'=>'No Such Category found']);
        }
    }
    public function viewProductLike($category_slug, $product_slug){
        $category = Category::where('slug', '=', $category_slug)->where('status','>=','1')->first();
        $comments = Comment::all();
        if($category){
        $productLike = Product::where('catId', '=', $category->id)
                            ->where('status','>=','1')
                            ->where('slug', '!=', $product_slug)
                            ->where('status','>=','1')
                            ->get();
        $products=[];
        if($productLike){
            $i=0;
            foreach($productLike as $product){
                $vote =0.0;
                $countVote = 0;
                if(intval($product->salePrice)<intval($product->price)&&$i<=7){
                    foreach($comments as $comment)
                        {
                            if($product->id==$comment->productId){
                                $vote+=$comment->star;
                                $countVote +=1;
                            }
                        }
                        if($vote !=0.0 && $countVote != 0){
                            $product->vote = round($vote/$countVote,1);
                            $product->countVote = $countVote;
                        }
                        else{
                            $product->vote =0;
                        }
                    array_push($products,$product);
                    $i++;
                }
            }
            return response()->json(['status'=>200, 'productLike'=>$products]);
        }
        else{
            return response()->json(['status'=>400, 'message'=>'No Product Available']);
        }
        }
        else{
            return response()->json(['status'=>404, 'message'=>'No Such Category found']);
        }
    }

    public function search($text){
        $products = Product::where('productName','LIKE','%'.$text.'%')->get();
        if($products){
            return response()->json(['status'=>200, 'data'=>$products]);
        }
        {
            return response()->json(['status'=>404, 'message'=>'Product not found']);
        }
    }
    public function brandHome(){
        $brands = Brand::where('status','=',2)->get();
        if($brands){
            return response()->json(['status'=>200, 'data'=>$brands]);
        }
        else{
            return response()->json(['status'=>200, 'message'=>'Không tồn tại thương hiệu']);
        }
    }

    public function viewOrderByUser(){
        if(auth('sanctum')->check()){
            $user_id = auth('sanctum')->user()->id;
            $orders =Order::where('user_id',$user_id)->get();
            $ordersDetail=[];//Chưa xác nhận
            $ordersConfirmed=[];//Đã xác nhận
            $daXuatKho=[];//Đã xuất kho
            $dangVanChuyen=[];//Đang vận chuyển
            $dangGiao=[];//Đang giao
            $daGiao=[];//Đã giao
            foreach($orders as $order){
                // if($order->status==0||$order->status==1){
                //     $orderDetail = OrderDetail::where('orderId', $order->id)->get();
                //     array_push($ordersDetail, $orderDetail);
                // }
                // else if($order->status==2){
                //     $ordersConfirm = OrderDetail::where('orderId', $order->id)->get();
                //     array_push($ordersConfirmed, $ordersConfirm);
                // }


                if($order->status==0||$order->status==1){
                    $orderDetail = OrderDetail::where('orderId', $order->id)->get();
                    array_push($ordersDetail, $orderDetail);
                }
                else {
                    switch ($order->status) {
                        case 2:
                            $ordersConfirm = OrderDetail::where('orderId', $order->id)->get();
                            array_push($ordersConfirmed, $ordersConfirm);
                          break;
                        case 3:
                            $item = OrderDetail::where('orderId', $order->id)->get();
                            array_push($daXuatKho, $item);
                          break;
                        case 4:
                            $itemm = OrderDetail::where('orderId', $order->id)->get();
                            array_push($dangVanChuyen, $itemm);
                          break;
                        case 5:
                            $itemmm = OrderDetail::where('orderId', $order->id)->get();
                            array_push($dangGiao, $itemmm);
                          break;
                        case 6:
                            $i = OrderDetail::where('orderId', $order->id)->get();
                            array_push($daGiao, $i);
                            break;
                    }
                }
                
            }
            return response()->json(['status'=>200, 'data'=>['data'=>$ordersDetail,'confirmed'=>$ordersConfirmed,'daXuatKho'=>$daXuatKho,'dangVanChuyen'=>$dangVanChuyen,'dangGiao'=>$dangGiao,'daGiao'=>$daGiao]]);
        }
        else{
            return response()->json(['status'=>401, 'message'=>'Bạn phải đăng nhập để xem đơn hàng']);
        }

    }
    public function deleteOrder($order_id){
        $order = Order::where('id',$order_id)->first();
        $orderDetails = OrderDetail::where('orderId',$order_id)->get();
        if($order&&$orderDetails){
            $order->forceDelete();
            ///
            foreach($orderDetails as $orderDetail){
                $orderDetail->product->update([
                    'quantity'=>$orderDetail->product->quantity+$orderDetail->quantity
                ]);
                $orderDetail->forceDelete();
            }
            ///
            return response()->json(['status'=>200, 'message'=>'Đã hủy đơn hàng', 'data'=>$orderDetails]);
        }
        else{
            return response()->json(['status'=>404, 'message'=>'Đơn hành không tồn tại']);
        }
        
    }
    public function popularBrands(){
        $brands = Brand::where('status', 1)->get();
        if($brands){
            return response()->json(['status'=>200, 'data'=>$brands]);
        }
        else{
            return response()->json(['status'=>404, 'message'=>"khong ton tai"]);
        }
    }

    public function userDetail(){
        if(auth('sanctum')->check()){
            $user_id = auth('sanctum')->user()->id;
            $user = User::where('id', $user_id)->first();
            return response()->json(['status'=>200, 'data'=>$user]);
        }
        else{
            return response()->json(['status'=>401, 'message'=>'Bạn phải đăng nhập để xem đơn hàng']);
        }
    }
    public function userUpdate(Request $request){
        if(auth('sanctum')->check()){
            $user_id = auth('sanctum')->user()->id;
            $user = User::where('id', $user_id)->first();
            $user->name = $request->name;
            $user->firstName = $request->firstName;
            $user->phone = $request->phone;
            $user->address = $request->address;
            $user->city = $request->city;
            $user->state = $request->state;
            $user->email = $request->email;
            $user->save();
            return response()->json(['status'=>200, 'message'=>'Cập nhật hoàn tất']);
        }
        else{
            return response()->json(['status'=>401, 'message'=>'Bạn phải đăng nhập để xem đơn hàng']);
        }
    }
    public function topBanner($position){
        $links = Link::where('position', $position)->get();
        return response()->json(['status'=>200, 'data'=>$links]);
    }
    public function postHome(){
        //$posts = Page::where('status',2)->limit(3)->get();
        $posts = DB::table('posts')->where('status',2)->get();
        if($posts){
            return response()->json(['status'=>200, 'data'=>$posts]);
        }
        else{
            return response()->json(['status'=>404, 'message'=>'Khong ton tai bai viet']);
        }
    }
    public function postDetail($slug){
        $post = DB::table('posts')->where('slug',$slug)->where('status','>=',1)->first();
        $postLike = DB::table('posts')->where('slug','!=',$post->slug)
                                        ->where('status','>=',1)
                                        ->limit(6)
                                        ->get();

        if($post){
            return response()->json(['status'=>200, 'data'=>['post'=>$post,'postLike'=>$postLike]]);
        }
        else{
            return response()->json(['status'=>404, 'message'=>'Khong ton tai bai viet']);
        }
    }

    public function tinTuc(){
        $posts = DB::table('posts')->where('status','>=',1)->limit(5)->get();
        $listPosts=DB::table('posts')->get();
        $sideBar = DB::table('posts')->orderBy('id', 'desc')->where('status','>=',1)->get();
        if($posts){
            return response()->json(['status'=>200, 'data'=>['posts'=>$posts, 'listPosts'=>$listPosts, 'sideBar'=>$sideBar]]);
        }
        else{
            return response()->json(['status'=>404, 'message'=>'khong co bai viet']);
        }
    }
    public function deleteComment($id){
        $comment = Comment::find($id);
        $comment->forceDelete();
        return response()->json(['status'=>200, 'message'=>'Xóa thành công']);
    }
}
