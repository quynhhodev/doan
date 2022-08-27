<?php

namespace App\Http\Controllers;

use App\Models\Link;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class LinkController extends Controller
{
    public function store(Request $request){
        
            $link = new Link;
            $link->title = $request->title;
            $link->position = $request->position;
            $link->url = $request->url;
            $link->status = $request->status;
            if ($request->hasFile('image'))
            {
                $file      = $request->file('image');
                $filename  = $file->getClientOriginalName();
                $extension = $file->getClientOriginalExtension();
                $picture   = date('His').'-'.$filename;
                //move image to public/img folder
                $file->move(public_path('img'), $picture);
                $link->image = json_encode($picture);
                //return response()->json(["data"=>$request->file('image') , "message" => "Image Uploaded Succesfully"]);
            } 
            $link->save();
            return response()->json(['status'=>200, 'message'=>'Đã Tạo Thành Công']);
       
    }
    public function index(){
        $links = Link::all();
        return response()->json(['status'=>200, 'data'=>$links]);
    }

    public function edit($id){
        $link = Link::find($id);
        return response()->json(['status'=>200, 'data'=>$link]);
    }

    public function update(Request $request, $id){
        $link = Link::find($id);
        $link->title = $request->title;
        $link->position = $request->position;
        $link->url = $request->url;
        if ($request->hasFile('image'))
        {
            $images = json_decode($link->image);
            File::delete(public_path("img/".$images));
            $file      = $request->file('image');
            $filename  = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $picture   = date('His').'-'.$filename;
            //move image to public/img folder
            $file->move(public_path('img'), $picture);
            $link->image = json_encode($picture);
            //return response()->json(["data"=>$request->file('image') , "message" => "Image Uploaded Succesfully"]);
        } 
        $link->status = $request->status;
        $link->save();
        return response()->json(['status'=>200, 'message'=>'Sửa Thành Công']);
    }

    public function trash($id){
        Link::where('id', $id)->delete();
        return response()->json(['status'=>200, 'message'=>'Xóa Thành Công']);
    }

    public function intrash(){
        $products = Link::onlyTrashed()->get();
        return response()->json(['status'=>200, 'data'=>$products]);
    }

    public function restore($id){
        Link::onlyTrashed()->where('id',$id)->restore();
        return response()->json(['status'=>200, 'message'=>'Khôi Phục Thành Công']);
    }

    public function destroy($id){
        $link = Link::onlyTrashed()->where('id', $id)->first();
        $link->forceDelete();
        return response()->json([
            'status' => 200,
            'message' => 'Đã Xóa'
        ]);
    }
}
