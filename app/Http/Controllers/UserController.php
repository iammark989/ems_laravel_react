<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class UserController extends Controller
{
    // login
    public function login(Request $request){
        $incomingFields = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if(Auth::attempt($incomingFields)){
            if(auth()->user()->status == '1'){
            $request->session()->regenerate();
            return redirect()->intended('/dashboard');
            }else{
                auth()->logout();
                throw ValidationException::withMessages([
                'errormsg' => ['Invalid email or password.'],
                ]);
            }

        }else{
        throw ValidationException::withMessages([
        'errormsg' => ['Invalid email or password.'],
        ]);
        }
    }

    // logout
    public function logout(Request $request){
    auth()->logout(); // if using Laravel auth

    $request->session()->invalidate(); // destroys session data
    $request->session()->regenerateToken(); // regenerate CSRF token

    return redirect()->intended('/');
    
}

    public function dashboard(){
                    // count emplouyee
        $totalEmployees = User::where('userlevel','<','6')->where('status','=','1')
                        ->selectRaw('COUNT(name) as count')
                        ->first();


        return Inertia::render('Dashboard',['employeeCount'=>$totalEmployees]);
    }

}
