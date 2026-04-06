<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employeelist extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'employeeID',
        'images',
        'first_name',
        'middle_name',
        'last_name',
        'suffix',
        'position_id',
        'department_id',
        'date_hired',
        'daily_rate',
        'allowance',
        'leave_bal_VL',
        'leave_bal_SIL',
        'sss',
        'pagibig',
        'philhealth',
    ];

    protected function images(): Attribute {
        return Attribute::make(get: function($value){
            return $value ? '/storage/images/' . $value : '/fallback-image.jpg';
        });
    }
    
    public function user(){
        return $this->belongsTo(User::class,'employeeID');
    }

   //public function rfidcard(){
  //      return $this->hasMany(RfidCard::class,'employeeID','employeeID');
 //   }

  //  public function attendance(){
  //      return $this->hasMany(Attendance::class,'employeeID','employeeID');
  //  }
}
