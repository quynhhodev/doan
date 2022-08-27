<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request){
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6'
        ],[
            'name.required' => 'Tên không được để trống.',
            'email.required' => 'Tên không được để trống.',
            'email.email' => 'Cho tôi biết email của bạn.',
            'email.unique' => 'Email này đã được đăng kí.',
            'password.unique' => 'Mật khẩu không được để trống.',
            'password.min' => 'Mật khẩu phải có độ ít nhất là :min.',
        ]);
        if($validator->fails())
        {
            return response()->json(['validation_errors'=>$validator->messages()]);
        }
        else{
            $user = User::create([
                'name'=>$request->name,
                'email'=>$request->email,
                'password'=>Hash::make($request->password)

            ]);

            $token = $user->createToken($user->email.'_Token')->plainTextToken;
            return response()->json(['status'=>200,'username'=>$user->name, 'token'=> $token, 'message'=>'Registers successfully']);
        }
    }
    public function login(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password'=>'required|min:6',
        ]);
        if($validator->fails()) {
            return response()->json(['validation_errors'=>$validator->messages()]);
        }
        else{
            $user = User::where('email', $request->email)->first();
            if (! $user || ! Hash::check($request->password, $user->password)) {
                return response()->json(['status'=>401, 'message'=>'Sai thông tin đăng nhập.']);
            }
            else{
                if($user->role_as==1)//1=admin, 0=users
                {
                    $role='admin';
                    $token =$user->createToken($user->email.'_AdminToken', ['server:admin'])->plainTextToken;
                }
                else if($user->role_as==2)//1=admin, 0=users, 2=shipper
                {
                    $role='shipper';
                    $token =$user->createToken($user->email.'_ShipperToken', ['server:admin'])->plainTextToken;
                }
                else{
                    $role='';
                    $token = $user->createToken($user->email.'_Token', [''])->plainTextToken;
                }
                
            return response()->json(['status'=>200,'username'=>$user->name, 
            'token'=> $token, 'message'=>'Đăng nhập hoàn tất ', 'role'=>$role]);
            }
         
           
        }
    }

    public function logout(){
        auth()->user()->tokens()->delete();
        return response()->json(['status'=>200,'message'=>'Logout successfully']);
    }
}
