<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('doctor_availabilities', function (Blueprint $table) {
            $table->id();

            // Doctor (User)
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            // relation with practice Location table
            $table->foreignId('practice_location_id')->constrained('practice_locations')->onDelete('cascade');

            $table->enum('day_of_week', [
                'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'
            ]);

            // Time
            $table->time('start_time');
            $table->time('end_time');

            // Availability
            $table->boolean('is_available')->default(true);



            // Index for fast lookup
            $table->index(['user_id', 'day_of_week']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('doctor_availabilities');
    }
};
