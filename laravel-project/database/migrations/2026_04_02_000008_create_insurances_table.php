<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('insurances', function (Blueprint $table) {
            $table->id();

            $table->string('insurance_name');
            $table->string('insurance_code')->unique();

            $table->text('address')->nullable();
            $table->string('phone', 20)->nullable();

            $table->boolean('is_active')->default(true);

            // Indexes 
            $table->index('insurance_name');
            $table->index('is_active');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('insurances');
    }
};
