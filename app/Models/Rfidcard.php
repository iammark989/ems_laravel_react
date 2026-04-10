<?php

namespace App\Models;

use App\Models\Attendancelog;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rfidcard extends Model
{
    use HasFactory;

    protected $fillable = [
        'employeeID',
        'rfid',
        'is_active',
    ];

    public function user(){
        return $this->belongsTo(User::class,'employeeID');
    }

    public function attendance(){
        return $this->hasMany(Attendancelog::class,'employeeID','employeeID');
    }
}
