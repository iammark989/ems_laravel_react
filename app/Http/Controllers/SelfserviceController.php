<?php

namespace App\Http\Controllers;

use App\Exports\AttendanceExport;
use App\Models\Attendancelog;
use App\Models\Payroll;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class SelfserviceController extends Controller
{
    public function goToViewPayslip(){
        return Inertia::render('ViewPayslip');
    }
    
    public function goToViewAttendance(){
        return Inertia::render('ViewAttendance');
    }


    // view users attendance//
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
            ->orderBy(DB::raw('DATE(attendance.recordDate)'), 'asc')
            ->get();
    }
    return Inertia::render('ViewAttendance', [
        'attendance' => $attendance,
        'filters' => $request->only('dateFrom', 'dateTo'),
    ]);

}

    // export attendance //
    public function exportSelfAttendance(Request $request){
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
            ->orderBy(DB::raw('DATE(attendance.recordDate)'), 'asc')
            ->get();
    }

        return Excel::download(
        new AttendanceExport($attendance),
        'attendance.xlsx'
    );  
    }

    public function viewPayslip(Request $request){
      
    }

    
}
