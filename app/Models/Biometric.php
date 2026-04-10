<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Biometric extends Model
{
    use HasFactory;

     protected $fillable = [
        'employeeID',
        'finger_name',
        'fb_data',
        'device_id',
        'is_active',
    ];

    public function user(){
        return $this->belongsTo(User::class,'employeeID');
    }
}
