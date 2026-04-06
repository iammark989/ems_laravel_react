<?php

use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\PayrollController;
use App\Http\Controllers\SelfserviceController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;


// GET //
        // GO TO LOGIN PAGE //
Route::get('/', [UserController::class,'dashboard'])->middleware('signInCheck');

Route::get('/login', function () {
    return Inertia::render('Login');
});
        // Dashboard //
Route::get('/dashboard',[UserController::class,'dashboard'])->middleware('signInCheck');
       
        // go to settings //
Route::get('/settings/payroll',[SettingsController::class,'index'])->middleware('signInCheck');
Route::get('/settings/company',[SettingsController::class,'indexCompany'])->middleware('signInCheck');

        // Payroll Related Routes //
        // go to upload payroll //
Route::get('/payroll/upload-payroll',function (){ return Inertia::render('PayrollUpload'); } )->middleware('signInCheck');

        // Employee Related Routes //
Route::get('/employees',[EmployeeController::class,'index'])->middleware('signInCheck')->name('employeelist');
Route::get('/employees/register',[EmployeeController::class,'registration'])->middleware('signInCheck')->name('employeeRegister');
Route::get('/employees/{employeeID}/edit',[EmployeeController::class,'employeeEdit'])->middleware('signInCheck');

        // Employee self-service //
Route::get('/self-service/payslip',[SelfserviceController::class,'goToViewPayslip'])->middleware('signInCheck');


// POST //
                // login //
Route::post('/login',[UserController::class,'login']);
                // logout //
Route::post('/logout',[UserController::class,'logout']); 
                // employee registration //
Route::post('/register',[EmployeeController::class,'register']);
                // employee save changes //
Route::post('/employees/savechanges',[EmployeeController::class,'savechanges']);


                // PAYROLL //
                // routes/api.php
Route::post('/payroll/upload',[PayrollController::class,'upload']);
Route::get('/viewpayslip',[PayrollController::class,'viewpayslip'])->middleware('signInCheck');

                //  SETTINGS  //
                // add department and add position   //
Route::post('/settings/department',[SettingsController::class,'storeDepartment']);
Route::post('settings/position',[SettingsController::class,'storePosition']);

Route::delete('/settings/department/{id}', [SettingsController::class,'deleteDepartment']);
Route::delete('/settings/position/{id}', [SettingsController::class,'deletePosition']);

Route::post('/settings/save',[SettingsController::class,'saveSettings']);

require __DIR__.'/settings.php';
