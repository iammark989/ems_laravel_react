<?php

namespace App\Http\Controllers;

use App\Models\Attendancelog;
use App\Models\Payroll;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SelfserviceController extends Controller
{
    public function goToViewPayslip(){
        return Inertia::render('ViewPayslip');
    }
    
    public function goToViewAttendance(){
        return Inertia::render('ViewAttendance');
    }

    public function index(Request $request)
{
    $user = auth()->user();

    $attendance = [];

    if ($request->dateFrom && $request->dateTo) {
        $attendance = DB::table('attendancelogs as attendance')
            ->select(
                'attendance.employeeID',
                DB::raw('users.name as name'),
                DB::raw('DATE(attendance.recordDate) as date'),
                DB::raw('MIN(attendance.clockRecord) as timeIn'),
                DB::raw('MAX(attendance.clockRecord) as timeOut'),
                DB::raw('
                    CASE 
                        WHEN MIN(attendance.clockRecord) = MAX(attendance.clockRecord) 
                        THEN "No IN/OUT" 
                        ELSE "OK" 
                    END as remarks
                ')
            )
            ->join('users', 'attendance.employeeID', '=', 'users.employeeID')
            ->where('attendance.employeeID', $user->employeeID) // ✅ ESS filter
            ->whereBetween('attendance.recordDate', [$request->dateFrom, $request->dateTo])
            ->groupBy(
                'attendance.employeeID',
                'users.name',
                DB::raw('DATE(attendance.recordDate)')
            )
            ->orderBy('attendance.recordDate', 'asc')
            ->get();
    }

    return Inertia::render('ViewAttendance', [
        'attendance' => $attendance,
        'filters' => $request->only('dateFrom', 'dateTo'),
    ]);

}

    public function viewPayslip(Request $request){
      
    }

    
}
