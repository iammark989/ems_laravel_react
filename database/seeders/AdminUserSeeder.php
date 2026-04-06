<?php

namespace Database\Seeders;
use App\Models\Companysetting;
use App\Models\Department;
use App\Models\Position;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        Department::create([
            'department' => 'developer',
        ]);

        Position::create([
            'position' => 'developer'
        ]);

        Companysetting::create([
            'logo' => 'logo.jpg'
        ]);



        User::create([
        'name' => 'developer',
        'email' => 'markarvinvalenzuela@gmail.com',
        'employeeID' => '000',
        'status' => '1',
        'userlevel' => '10',
        'password' => Hash::make('P@ssword1!'),
        'first_name' => 'developer',
        'middle_name' => '',
        'last_name' => 'developer',
        'suffix' => '',
        'address' => 'PH',
        'position_id' => '1',
        'department_id' => '1',
        'date_hired' => '1901-01-01',
        'daily_rate' => '0',
        'allowance' => '0',
        'leave_bal_VL' => '0',
        'leave_bal_SIL' => '0',
        'sss' => '0',
        'pagibig' => '0',
        'philhealth' => '0',
        'tin' => '0',

        
    ]);
    }
}
