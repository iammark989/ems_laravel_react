<?php

namespace App\Http\Controllers;

use App\Models\Payroll;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class PayrollController extends Controller
{

                // upload payslip
    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls,csv',
        ]);

        try {
            // install composer require maatwebsite/excel
            $data = Excel::toArray([], $request->file('file'));
            $rows = $data[0] ?? [];

            if (count($rows) < 2) {
                return back()->withErrors(['file' => 'Excel file is empty']);
            }

            $header = array_map(fn($h) => strtolower(trim($h)), $rows[0]);
            unset($rows[0]);

            $requiredHeaders = ['employeeid', 'position', 'name', 'days', 'daily_rate'];
            foreach ($requiredHeaders as $req) {
                if (!in_array($req, $header)) {
                    return back()->withErrors(['file' => "Missing required header: $req"]);
                }
            }

            foreach ($rows as $row) {
                if (count(array_filter($row)) === 0) continue;
                if (count($row) !== count($header)) continue;

                $rowData = array_combine($header, $row);
                $rowData = array_map(fn($v) => $v === "" ? null : $v, $rowData);

                Payroll::updateOrCreate(
                    [
                        'employeeID' => $rowData['employeeid'],
                        'month'      => $rowData['month'] ?? null,
                        'cutoff'     => $rowData['cutoff'] ?? null,
                        'year'       => $rowData['year'] ?? null,
                    ],
                    $rowData
                );
            }

            return back()->with('success', 'Payroll uploaded successfully!');
        } catch (\Exception $e) {
            return back()->withErrors(['file' => 'Upload failed: ' . $e->getMessage()]);
        }
    }

                // view payslip
    public function viewpayslip(Request $request){
         
    $payrollDetails = null;

    if ($request->filled(['month', 'year', 'cutoff'])) {
        $userid = auth()->user()->employeeID;

        $payrollDetails = Payroll::where([
            ['month', '=', $request->month],
            ['year', '=', $request->year],
            ['cutoff', '=', $request->cutoff],
            ['employeeID', '=', $userid],
        ])->first();
    }

    return Inertia::render('ViewPayslip', [
        'payrollDetails' => $payrollDetails
    ]);
}
        
    
}