<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    // == USER CLOCK IN AND OUT == //
        // show attendance page
     public function showAttendancePageB(){
        return view('att');
    }
}
