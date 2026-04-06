<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('practice_locations', function (Blueprint $table) {
            $table->id();

            $table->string('location_name');
            $table->text('address');
            $table->string('city');
            $table->string('state');
            $table->string('zip', 20);

            $table->string('phone', 20)->nullable();
            $table->string('email')->nullable();

            $table->boolean('is_active')->default(true);

            // Indexes for fast quires
            $table->index('city');
            $table->index('state');
            $table->index('is_active');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('practice_locations');
    }
};
