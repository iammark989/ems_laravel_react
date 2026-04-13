<?php

namespace App\Http\Controllers;

use App\Models\Attendancelog;
use App\Models\Rfidcard;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    // == USER CLOCK IN AND OUT == //
        // show attendance page
     public function showAttendancePageB(){
        return view('att');
    }

            // LOGIN USING RFID
            public function attendancelog(Request $request){
                    $rfid = $request->input('rfid');
                    $employee = Rfidcard::where('rfid', $rfid)->first();

                    
                        if (!$employee) {
                            return response()->json(['success' => false]);
                        }  else{
                            $theUser = User::where('employeeID',$employee->employeeID)->first();
                            // Determine if clock-in or clock-out
                            $lastLog = Attendancelog::where('employeeID', $employee->employeeID)
                            ->latest()
                            ->first();

                            $status = (!$lastLog) ? 'clockIn' : 'clockOut';
                            $checkDate = now()->toDateString();
                            if ($status === 'clockIn') {
                                Attendancelog::create([
                                'employeeID' => $employee->employeeID,
                                'clockRecord' => now(),
                                'recordDate' => now()->toDateString(),
                                'stat' => 'ClockIn'
                                ]);
                            } else if($status === 'clockOut' && $checkDate !== Carbon::parse($lastLog->date)->toDateString()){
                                Attendancelog::create([
                                'employeeID' => $employee->employeeID,
                                'clockRecord' => now(),
                                'recordDate' => now()->toDateString(),
                                'stat' => 'ClockIn'
                                ]);
                                $status = 'clockIn';
                            } else {
                                //$lastLog->update(['clockOut' => now()]);
                                if($employee->stat === 'ClockOut')
                                    $lastLog->update(['stat' => 'Break']);
                                    Attendancelog::create([
                                    'employeeID' => $employee->employeeID,
                                    'clockRecord' => now(),
                                    'recordDate' => now()->toDateString(),
                                    'stat' => 'ClockOut'
                                ]);
                            }
                        
                            return response()->json([
                                'success' => true,
                                'employee_name' => $theUser->name,
                                'status' => $status === 'clockIn' ? 'Time In' : 'Time Out',
                                'image' => $theUser->images,
                                'employeeID' => $theUser->employeeID,

                            ]);

                        }
            
                }

            // RFID CARD add
    public function addRfidCard(Request $request){
        $incomingFields = $request->validate([
            'rfid' => 'required',
            'employeeID' => 'required',
        ]);
        $rfid = $incomingFields['rfid'];
        $employeeID = $incomingFields['employeeID'];
    
        $rfid = $request->rfid;
        $employeeID = $request->employeeID;
        $check = Rfidcard::where('rfid',$rfid)->first();
        if($check) {
          // return response()->json([
        // 'success' => false,
         //  'message' => 'RFID already in use',
        //   ], 409);
                return back()->withErrors([
                    'rfid' => 'RFID already in use'
                ]);
        };
        $incomingFields['rfid_data'] = $rfid; // match your column
        $incomingFields['isActive'] = 1;

        Rfidcard::create($incomingFields);
        return back()->with('success', 'RFID registered successfully');
        //return response()->json([
        //  'success' => true,
         //  'message' => 'RFID registered successfully',
         //   ]);
    }
}
