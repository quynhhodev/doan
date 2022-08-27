<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BrandController extends Controller
{
    //
    public function store(Request $request){
        $validator = Validator::make($request->all(),[
            'brandName' => 'required|max:191',
            'slug' => 'required|unique:brands',
            'description' => 'required',
            'status' => 'required',
        ],[
            'brandName.required' => 'Trường này không được để trống.',
            'slug.required' => 'Trường này không được để trống.',
            'description.required' => 'Trường này không được để trống.',
            'status.required' => 'Trường này không được để trống.',
            'slug.unique' => 'Giá trị đã tồn tại trong bảng.'
        ]);
        if($validator->fails())
        {
            return response()->json(['validation_errors'=>$validator->messages()]);
        }
        else{
            $brand = new Brand;
            $brand->brandName = $request->brandName;
            $brand->slug = $request->slug;
            $brand->description = $request->description;
            $brand->status = $request->status;
            if ($request->hasFile('image'))
            {
                $file      = $request->file('image');
                $filename  = $file->getClientOriginalName();
                $extension = $file->getClientOriginalExtension();
                $picture   = date('His').'-'.$filename;
                //move image to public/img folder
                $file->move(public_path('img'), $picture);
                $brand->image = json_encode($picture);
                //return response()->json(["data"=>$request->file('image') , "message" => "Image Uploaded Succesfully"]);
            } 
            $brand->save();
            return response()->json(['status'=>200, 'message'=>'Đã Tạo Thành Công']);
        }
        
    }
    public function index(){
        $brands = Brand::all();
        return response()->json(['status'=>200, 'data'=>$brands]);
    }
    public function edit($id){
        $brand = Brand::find($id);
        return response()->json(['status'=>200, 'data'=>$brand]);
    }
    public function update(Request $request, $id){
        $brand = Brand::find($id);
        $brand->brandName = $request->brandName;
        $brand->slug = $request->slug;
        $brand->description = $request->description;
        $brand->status = $request->status;
        $brand->save();
        return response()->json(['status'=>200, 'message'=>'Đã Sửa Thành Công']);
    }

    public function trash($id){
        Brand::where('id', $id)->delete();
        return response()->json(['status'=>200, 'message'=>'Xóa Thành Công']);
    }

    public function intrash(){
        $products = Brand::onlyTrashed()->get();
        return response()->json(['status'=>200, 'data'=>$products]);
    }

    public function restore($id){
        Brand::onlyTrashed()->where('id',$id)->restore();
        return response()->json(['status'=>200, 'message'=>'Khôi Phục Thành Công']);
    }

    public function destroy($id){
        $brand = Brand::onlyTrashed()->where('id', $id)->first();
        $brand->forceDelete();
        return response()->json([
            'status' => 200,
            'message' => 'Xóa Thành Công'
        ]);
    }
}
