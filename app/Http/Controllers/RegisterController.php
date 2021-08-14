<?php

namespace App\Http\Controllers;

use stdClass;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\UserRegisterRequest;
use Symfony\Component\HttpFoundation\Response;

class RegisterController extends Controller
{
    public function register(UserRegisterRequest $request)
    {
        $response = new stdClass;
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        $token = $user->createToken('token')->accessToken;
        $response->result = $user;
        $response->token = $token;
        $response->code = Response::HTTP_CREATED;
        return response()->json($response, 200);
    }
}
