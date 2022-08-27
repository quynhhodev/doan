<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;


class ProductController extends Controller
{
    public function store(Request $request){
        $validator = Validator::make($request->all(),[
            'productName' => 'required|max:191',
            'catId' => 'required',
            'slug' => 'required|unique:products',
            'brandId' => 'required',
            'detail' => 'required',
            'specifications' => 'required',
            'quantity' => 'required',
            'price' => 'required',
            'salePrice' => 'required',
            'popular' => 'required',
            'status' => 'required',
            // 'files'=>'required',

        ], [
            'required' => 'Trường :attribute không được để trống.',
            'unique' => 'Trường :attribute đã tồn tại.'
        ]);
        if($validator->fails())
        {
            return response()->json(['validation_errors'=>$validator->messages()]);
        }
        else{
        $product = new Product;
        $product->productName = $request->productName;
        $product->catId = $request->catId;
        $product->slug = $request->slug;
        $product->brandId = $request->brandId;
        $product->detail = $request->detail;
        $product->shortDetail = $request->shortDetail;
        $product->origin = $request->origin;
        $product->specifications = $request->specifications;
        $product->quantity = $request->quantity;
        $product->price = $request->price;
        $product->salePrice = $request->salePrice;
        $product->status = $request->status;
        $product->ram = $request->ram;
        $product->rom = $request->rom;
        $product->screen = $request->screen;
        $product->mass = $request->mass;
        $product->graphicsCard = $request->graphicsCard;
        $product->chip = $request->chip;
        if($request->popular=='true'){
            $product->popular =1;
        }
        else{
            $product->popular =0;
        }
        if($request->installment=='true'){
            $product->installment =1;
        }
        else{
            $product->installment =0;
        }
        if($request->offersGifts=='true'){
            $product->offersGifts =1;
        }
        else{
            $product->offersGifts =0;
        }
        $names = [];
        if($request->hasFile('files'))
        {
            $isdata=true;
            foreach($request->file('files') as $image)
            {
              
              $filename  = $image->getClientOriginalName();
              $extension = $image->getClientOriginalExtension();
              $picture   = date('His').'-'.$filename;
              //move image to public/img folder
              $image->move(public_path('img'), $picture);
              array_push($names, $picture);        
            }
            //$content->filename = json_encode($names);
            $product->image =json_encode($names);
        }


        // if ($request->hasFile('image'))
        // {
        //       $file      = $request->file('image');
        //       $filename  = $file->getClientOriginalName();
        //       $extension = $file->getClientOriginalExtension();
        //       $picture   = date('His').'-'.$filename;
        //       //move image to public/img folder
        //       $file->move(public_path('img'), $picture);
        //       $product->image = $picture;
        //       //return response()->json(["data"=>$request->file('image') , "message" => "Image Uploaded Succesfully"]);
        // } 
        $product->save();
        return response()->json(['status'=>200, 'data'=>'Create product successfully' ]);
        }
        
    }
    public function index(){
        $products = Product::all();
        foreach ($products as $product){
            $product->catName = Category::where('id','=', $product->catId)->first()->catName;
            $product->brandName = Brand::where('id','=', $product->brandId)->first()->brandName;
        }
        return response()->json(['status'=>200, 'data'=>$products]);
    }
    public function edit($id){
        $product = Product::find($id);
        return response()->json(['status'=>200, 'data'=>$product]);
    }
    public function update(Request $request, $id){
        $product = Product::find($id);
        $product->productName = $request->productName;
        $product->catId = $request->catId;
        $product->slug = $request->slug;
        $product->brandId = $request->brandId;
        $product->detail = $request->detail;
        $product->shortDetail = $request->shortDetail;
        $product->origin = $request->origin;
        $product->specifications = $request->specifications;
        $product->quantity = $request->quantity;
        $product->price = $request->price;
        $product->salePrice = $request->salePrice;
        $product->status = $request->status;
        $product->ram = $request->ram;
        $product->rom = $request->rom;
        $product->screen = $request->screen;
        $product->mass = $request->mass;
        $product->graphicsCard = $request->graphicsCard;
        $product->chip = $request->chip;
        if($request->popular=='true'){
            $product->popular =1;
        }
        else{
            $product->popular =0;
        }
        if($request->installment=='true'){
            $product->installment =1;
        }
        else{
            $product->installment =0;
        }
        if($request->offersGifts=='true'){
            $product->offersGifts =1;
        }
        else{
            $product->offersGifts =0;
        }
        $names = [];
        if($request->hasFile('files'))
        {
            $isdata=true;
            foreach($request->file('files') as $image)
            {
              
              $filename  = $image->getClientOriginalName();
              $extension = $image->getClientOriginalExtension();
              $picture   = date('His').'-'.$filename;
              //move image to public/img folder
              $image->move(public_path('img'), $picture);
              array_push($names, $picture);        
            }
            //$content->filename = json_encode($names);
            $product->image =json_encode($names);
        }
        $product->save();
        return response()->json(['status'=>200, 'data'=>$request->all()]);
    }

    public function trash($id){
        Product::where('id', $id)->delete();
        return response()->json(['status'=>200, 'message'=>'Delete successfully']);
    }

    public function intrash(){
        $products = Product::onlyTrashed()->get();
        return response()->json(['status'=>200, 'data'=>$products]);
    }

    public function restore($id){
        Product::onlyTrashed()->where('id',$id)->restore();
        return response()->json(['status'=>200, 'message'=>'Restore successfully']);
    }

    public function destroy($id){
        $product = Product::find($id);

        $product = Product::onlyTrashed()->where('id', $id)->first();
        $images = json_decode($product->image);
        foreach($images as $img){
            File::delete(public_path("img/".$img));
        }
        $product->forceDelete();
        return response()->json([
            'status' => 200,
            'message' => 'Destroy successfully'
        ]);
    }
    public function allCategory(){
        $categories = Category::where('status', '>', 0)->get();
        return response()->json(['status'=>200, 'data'=>$categories]);
    }
    public function allBrand(){
        $brands = Brand::where('status', '>', 0)->get();
        return response()->json(['status'=>200, 'data'=>$brands]);
    }

    public function productSearch(Request $request){
        $str = $request->query('str');
        $products = Product::where('productName','LIKE', '%' . $str . '%')->get();
        return response()->json(['status'=>200, 'data'=>$products]);
    }

}
