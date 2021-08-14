<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserRegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;
use stdClass;

class LoginController extends Controller
{
    public function login(UserLoginRequest $request)
    {
        $response = new stdClass;
        $user = User::where('email', $request->email)->first();
        if($user instanceof User){
            if(Hash::check($request->password, $user->password)){
                $token = $user->createToken('token')->accessToken;
                $response->code = Response::HTTP_FOUND;
                $response->result = $user;
                $response->token = $token;
                $response->isSuccess = true;
            }else{
                $response->errors = [
                    'Password Missmatch'
                ];
                $response->isSuccess = false;
                $response->code = Response::HTTP_FORBIDDEN;
            }
        }else{
            $response->errors = [
                'User Not Found'
            ];
            $response->code = Response::HTTP_NOT_FOUND;
            $response->isSuccess = false;
        }
        return response()->json($response, Response::HTTP_OK);
    }

    public function getUser()
    {
        $response = new stdClass;
        $user = User::find(auth()->user()->id);
        $token = $user->createToken('token')->accessToken;
        $response->result = $user;
        $response->token = $token;
        $response->isSuccess = true;
        $response->code = Response::HTTP_FOUND;
        return response()->json($response, Response::HTTP_OK);
    }
}
