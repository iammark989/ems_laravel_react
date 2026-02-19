<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('employeelists', function (Blueprint $table) {
             $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('employeeID')->unique();
            $table->string('images')->nullable(); 
            $table->string('first_name');
            $table->string('middle_name')->nullable();
            $table->string('last_name');
            $table->string('position');
            $table->string('department')->nullable();
            $table->date('date_hired');
            $table->decimal('daily_rate');
            $table->decimal('allowance');
            $table->decimal('leave_bal_VL');
            $table->decimal('leave_bal_SIL');
            $table->string('sss')->nullable();
            $table->string('pagibig')->nullable();
            $table->string('philhealth')->nullable();
            $table->timestamps();

            $table->foreign('employeeID')->references('employeeID')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employeelists');
    }
};
