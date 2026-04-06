<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Companysetting extends Model
{
    use HasFactory;
     protected $fillable = [
    'logo',
    'company_name',
    'trade_name',            
    'email',
    'contact_number',
    'address1',
    'address2',
    'city',
    'province',
    'zip_code',
    'country',
    'tin',
    'rdo',
    'sss',
    'philhealth',
    'pagibig',
    'business_reg_no',
    'vat_registered',
    'tax_type',
    ];
}
