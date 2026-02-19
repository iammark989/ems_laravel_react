<?php

namespace Database\Seeders;
use App\Models\User;


//use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
        'name' => 'developer',
        'email' => 'markarvinvalenzuela@gmail.com',
        'employeeID' => '000',
        'status' => '1',
        'userlevel' => '10',
        'password' => Hash::make('P@ssword1!'),
    ]);
    }
}
