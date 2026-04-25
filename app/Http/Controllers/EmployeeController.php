<?php

namespace App\Http\Controllers;

use App\Exports\AttendanceExport;
use App\Models\Department;
use App\Models\Position;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class EmployeeController extends Controller
{
                    public function index()
            {
                $employees = User::with(['department','position'])
                ->where('id','>',1)
                ->get();

                return Inertia::render('EmployeeMasterlist', [
                    'employees' => $employees,
                ]);
            }
                        // go to employee registration //
                public function registration(){
                    $departments = Department::where('id','>','1')
                                ->orderBy('department', 'asc')
                                ->get();
                    $positions = Position::where('id','>','1')
                                ->orderBy('position', 'asc')
                                ->get();
                return Inertia::render('EmployeeRegistration',[
                    'departments' => $departments,
                    'positions' => $positions,
                ]);
            }



                    // go to Employee Edit //
            public function employeeEdit($employeeID){
                
                $employeeDetails = User::where('employeeID', $employeeID)->firstOrFail();
                $positions = Position::where('id','>','1')->orderBy('position','asc')->get();
                $departments = Department::where('id','>','1')->orderBy('department','asc')->get();


            return Inertia::render('EmployeeEdit', [
                    'employeeDetails' => $employeeDetails,
                    'positions' => $positions,
                    'departments' => $departments,
            ]);
            }
                    // Employee Edit save changes //
            public function savechanges(Request $request){
                $incomingFields = $request->validate([
                            'employeeID' => 'required',
                            'status' => 'required|boolean',
                            'first_name'=> 'required|string|max:255',
                            'middle_name'=> 'nullable|string|max:255',
                            'last_name'=> 'required|string|max:255',
                            'suffix'=> 'nullable|string|max:20',
                            'address'=> 'required|string',
                            'position_id'=> 'required|string',
                            'department_id'=> 'required|string',
                            'date_hired'=> 'required|date',
                            'daily_rate'=> 'required|numeric',
                            'allowance'=> 'required|numeric',
                            'leave_bal_VL'=> 'required|numeric',
                            'leave_bal_SIL'=> 'required|numeric',
                            'sss'=> 'required|string',
                            'pagibig'=> 'required|string',
                            'philhealth'=> 'required|string',
                            'tin'=> 'required|string',
                            'images' => 'nullable|image|mimes:jpg,jpeg,png|max:2048'
                    ]);
                    if ($request->hasFile('images')) {
                         // Get existing user (adjust based on your query)
                        $user = User::where('employeeID', $request->employeeID)->first();

                        // Delete old image if exists and not fallback
                        if ($user && $user->images && $user->images !== 'fallback-image.jpg') {
                            $path = public_path('images/' . $user->images);
                            if ($user->images && file_exists($path)) {
                                unlink($path);
                            }
                        }

                         // Save new image
                        $filename = $incomingFields['employeeID'] . "-" . uniqid() . ".jpg" ;
                        //$path = $request->file('images')->storeAs('images',$filename, 'public');
                        $file = $request->file('images');
                        $file->move(public_path('images'), $filename);
                         $path = 'images/' . $filename;
                        $incomingFields['images'] = $filename;
                    }else{
                        // Get existing user (adjust based on your query)
                        $user = User::where('employeeID', $request->employeeID)->first();
                        $incomingFields['images'] = $user->images;
                    }

                User::where('employeeID',$request->employeeID)
                            ->update($incomingFields);
                return redirect()->route('employeelist')->with('success', 'Employee Details Update Successfully!');
    }
                function deleteImage($filename) {
                    $path = public_path('images/' . $filename);
                    if (file_exists($path)) {
                        unlink($path);
                    }
                }
        
                    // register employee //
            public function register(Request $request){
                $incomingFields = $request->validate([
                            'employeeID' => 'required|string|max:50',
                            'email' => 'required|email|unique:users,email',
                            'status' => 'required|boolean',
                            'first_name'=> 'required|string|max:255',
                            'middle_name'=> 'nullable|string|max:255',
                            'last_name'=> 'required|string|max:255',
                            'suffix'=> 'nullable|string|max:20',
                            'address'=> 'required|string',
                            'position_id'=> 'required|string',
                            'department_id'=> 'required|string',
                            'date_hired'=> 'required|date',
                            'daily_rate'=> 'required|numeric',
                            'allowance'=> 'required|numeric',
                            'leave_bal_VL'=> 'required|numeric',
                            'leave_bal_SIL'=> 'required|numeric',
                            'sss'=> 'required|string',
                            'pagibig'=> 'required|string',
                            'philhealth'=> 'required|string',
                            'tin'=> 'required|string',
                            'images'=> 'nullable|image|max:2048',  
                ]);

                if ($request->hasFile('images')) {
                    $filename = $incomingFields['employeeID'] . "-" . uniqid() . ".jpg" ;
                    //$path = $request->file('images')->storeAs('images',$filename, 'public');
                    $file = $request->file('images');
                    $file->move(public_path('images'), $filename);
                    $path = 'images/' . $filename;
                    $incomingFields['images'] = $filename;
                }else{
                    $incomingFields['images'] = 'fallback-image.jpg';
                }
                $incomingFields['name'] = $incomingFields['first_name'] . " " . $incomingFields['last_name'];
                $incomingFields['password'] = '123456';
                $incomingFields['userlevel'] = $incomingFields['department_id'] < 4 ? 5 : 1;
                User::create($incomingFields);
                return redirect()->route('employeelist')->with('success', 'Employee Registered Successfully!');
        }


            // ATTENDANCE CONTROLLER //
        public function employeeAttendance() {
            return Inertia::render('EmployeeViewAttendance');
        }
        
        public function viewAttendance(Request $request){
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
           // ->where('attendance.employeeID', $user->employeeID) // ✅ ESS filter
            ->whereBetween('attendance.recordDate', [$request->dateFrom, $request->dateTo])
            ->groupBy(
                'attendance.employeeID',
                'users.name',
                DB::raw('DATE(attendance.recordDate)')
            )
            ->orderBy(DB::raw('DATE(attendance.recordDate)'), 'asc')
            ->get();
            }
            return Inertia::render('EmployeeViewAttendance', [
                'attendance' => $attendance,
                'filters' => $request->only('dateFrom', 'dateTo'),
                ]);
        }

                    // EXPORT ATTENDANCE//
            public function exportAttendance(Request $request){
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
                    //->where('attendance.employeeID', $user->employeeID) // ✅ ESS filter
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

         
    

}
