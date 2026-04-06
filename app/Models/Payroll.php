<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payroll extends Model
{
     use HasFactory;
     protected $fillable = [
        'employeeID',
        'position',
        'name',
        'days',
        'daily_rate',
        'total_basic_salary',
        'holiday1',
        'holiday2',
        'holiday3',
        'allowance',
        'adjustment',
        'commission',
        'used_leave',
        'total_used_leave',
        'ot_min',
        'ot_pay',
        'ut_min',
        'ut_deduction',
        'late_min',
        'late_deduction',
        'total_salary',
        'sss',
        'philhealth',
        'pagibig',
        'sss_loan',
        'hdmf_loan',
        'tax',
        'cash_advance',
        'other_deduction',
        'total_deductions',
        'net_pay',
        'month',
        'cutoff',
        'year',
        'period',
    ];

}
