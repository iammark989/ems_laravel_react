<?php

namespace App\Models;

use App\Models\Rfidcard;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendancelog extends Model
{
     use HasFactory;

    protected $fillable = [
        'employeeID',
        'recordDate',
        'clockRecord',
        'stat',
        'remarks',
    ];

     public function rfidcard(){
        return $this->belongsTo(Rfidcard::class,'employeeID');
    }

}
