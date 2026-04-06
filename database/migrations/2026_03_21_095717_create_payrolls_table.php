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
        Schema::create('payrolls', function (Blueprint $table) {
            $table->id();
            $table->string('employeeID');
            $table->string('position');
            $table->string('name');
            $table->decimal('days');
            $table->decimal('daily_rate');
            $table->decimal('total_basic_salary');
            $table->decimal('holiday1');
            $table->decimal('holiday2');
            $table->decimal('holiday3');
            $table->decimal('allowance');
            $table->decimal('adjustment');
            $table->decimal('commission');
            $table->decimal('used_leave');
            $table->decimal('total_used_leave');
            $table->decimal('ot_min');
            $table->decimal('ot_pay');
            $table->decimal('ut_min');
            $table->decimal('ut_deduction');
            $table->decimal('late_min');
            $table->decimal('late_deduction');
            $table->decimal('total_salary');
            $table->decimal('sss');
            $table->decimal('philhealth');
            $table->decimal('pagibig');
            $table->decimal('sss_loan');
            $table->decimal('hdmf_loan');
            $table->decimal('tax');
            $table->decimal('cash_advance');
            $table->decimal('other_deduction');
            $table->decimal('total_deductions');
            $table->decimal('net_pay');
            $table->string('month');
            $table->string('cutoff');
            $table->string('year');
            $table->string('period');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payrolls');
    }
};
