<?php

namespace App\Http\Controllers;

use App\Models\Payroll;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SelfserviceController extends Controller
{
    public function goToViewPayslip(){
        return Inertia::render('ViewPayslip');
    }
    

    public function viewPayslip(Request $request){
      
    }
}
