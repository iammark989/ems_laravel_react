<?php

namespace App\Exports;

use App\Models\Attendancelog;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class AttendanceExport implements FromCollection, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */

    protected $attendance;

    public function __construct($attendance)
    {
        $this->attendance = $attendance;
    }

    public function collection()
    {
        return collect($this->attendance)->map(function ($item) {
            return [
                'Employee ID' => $item->employeeID,
                'Name' => $item->name,
                'Date' => $item->date,
                'Time In' => $item->timeIn,
                'Time Out' => $item->timeOut,
                'Remarks' => $item->remarks, // optional but good
            ];
        });
        return Attendancelog::all();
    }
    public function headings(): array
    {
        return [
            'Employee ID',
            'Name',
            'Date',
            'Time In',
            'Time Out',
            'Remarks',
        ];
    }
    
}
