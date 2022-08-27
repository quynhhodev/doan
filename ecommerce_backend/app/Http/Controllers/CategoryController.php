<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function store(Request $request){
        $validator = Validator::make($request->all(),[
            'catName' => 'required|max:191',
            'slug' => 'required|unique:categories',
            'parentId' => 'required',
            'description' => 'required',
            'status' => 'required',
            
        ],[
            'required' => 'Trường :attribute không được để trống.',
            'unique' => 'Trường :attribute đã tồn tại.'
        ]);
        if($validator->fails())
        {
            return response()->json(['validation_errors'=>$validator->messages()]);
        }
        else{
            $category = new Category;
            $category->catName = $request->catName;
            $category->slug = $request->slug;
            $category->parentId = $request->parentId;
            $category->description = $request->description;
            $category->popular = $request->popular;
            $category->status = $request->status;
        if ($request->hasFile('image'))
        {
              $file      = $request->file('image');
              $filename  = $file->getClientOriginalName();
              $extension = $file->getClientOriginalExtension();
              $picture   = date('His').'-'.$filename;
              //move image to public/img folder
              $file->move(public_path('img'), $picture);
              $category->image = json_encode($picture);
              //return response()->json(["data"=>$request->file('image') , "message" => "Image Uploaded Succesfully"]);
        } 
        if ($request->hasFile('logo'))
        {
              $file      = $request->file('logo');
              $filename  = $file->getClientOriginalName();
              $extension = $file->getClientOriginalExtension();
              $picture   = date('His').'-'.$filename;
              //move image to public/img folder
              $file->move(public_path('img'), $picture);
              $category->icon = json_encode($picture);
              //return response()->json(["data"=>$request->file('image') , "message" => "Image Uploaded Succesfully"]);
        }
        $category->save();
        return response()->json(['status'=>200, 'data'=>'Tạo danh mục thành công' ]);
        }
        
    }

    public function index() {
        $categories = Category::all();
        return response()->json(['status'=>200, 'data'=>$categories]);
    }

    public function edit($id){
        $category = Category::find($id);
        return response()->json(['status'=>200, 'data'=>$category]);
    }

    public function update(Request $request,$id){
        $category = Category::find($id);
        $category->catName = $request->catName;
        $category->slug = $request->slug;
        $category->parentId = $request->parentId;
        $category->description = $request->description;
        $category->popular = $request->popular;
        $category->status = $request->status;
        if ($request->hasFile('image'))
        {
              $file      = $request->file('image');
              $filename  = $file->getClientOriginalName();
              $extension = $file->getClientOriginalExtension();
              $picture   = date('His').'-'.$filename;
              //move image to public/img folder
              $file->move(public_path('img'), $picture);
              $category->image = json_encode($picture);
              //return response()->json(["data"=>$request->file('image') , "message" => "Image Uploaded Succesfully"]);
        } 
        if ($request->hasFile('logo'))
        {
              $file      = $request->file('logo');
              $filename  = $file->getClientOriginalName();
              $extension = $file->getClientOriginalExtension();
              $picture   = date('His').'-'.$filename;
              //move image to public/img folder
              $file->move(public_path('img'), $picture);
              $category->icon = json_encode($picture);
              //return response()->json(["data"=>$request->file('image') , "message" => "Image Uploaded Succesfully"]);
        }

        //File::delete(public_path("img/".$img));
        $category->save();
        return response()->json(['status'=>200, 'message'=>'Đã cập nhật']);

    }


    public function trash($id){
        Category::where('id', $id)->delete();
        return response()->json(['status'=>200, 'message'=>'Đã đưa vào giỏ rác']);
    }

    public function intrash(){
        $products = Category::onlyTrashed()->get();
        return response()->json(['status'=>200, 'data'=>$products]);
    }

    public function restore($id){
        Category::onlyTrashed()->where('id',$id)->restore();
        return response()->json(['status'=>200, 'message'=>'Phục hồi thành công']);
    }

    public function destroy($id)
    {
        $category = Category::onlyTrashed()->where('id', $id)->first();
        $images = json_decode($category->image);
        File::delete(public_path("img/".$images));
        $category->forceDelete();
        return response()->json([
            'status' => 200,
            'message' => 'Xóa thành công'
        ]);
    }
    
}
