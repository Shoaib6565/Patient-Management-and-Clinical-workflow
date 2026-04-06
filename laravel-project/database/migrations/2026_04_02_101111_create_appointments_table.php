<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();

            // Unique appointment number
            $table->string('appointment_number')->unique();

            // Foreign keys
            $table->foreignId('case_id')->constrained()->cascadeOnDelete();
            $table->foreignId('patient_id')->constrained()->cascadeOnDelete(); // denormalized
            $table->foreignId('doctor_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('specialty_id')->constrained()->cascadeOnDelete();
            $table->foreignId('practice_location_id')->constrained()->cascadeOnDelete();
            $table->foreignId('created_by')->constrained('users')->cascadeOnDelete();

            // Date & Time
            $table->date('appointment_date');
            $table->time('appointment_time');
            $table->time('end_time')->nullable(); // computed

            // Appointment type
            $table->enum('appointment_type', [
                'New Patient',
                'Follow-up',
                'Consultation',
                'Procedure',
                'Telehealth',
                'Emergency',
                'Routine Checkup',
                'Post-op Follow-up'
            ]);

            // Duration
            $table->integer('duration_minutes')->default(30);

            // Status
            $table->enum('status', [
                'Scheduled',
                'Confirmed',
                'Checked In',
                'In Progress',
                'Completed',
                'Cancelled',
                'No Show',
                'Rescheduled'
            ])->default('Scheduled');

            // Reminder
            $table->boolean('reminder_sent')->default(false);
            $table->enum('reminder_method', ['SMS', 'Email', 'Phone', 'None'])->nullable();

            // Notes
            $table->text('notes')->nullable();
            $table->text('reason_for_visit');

            $table->timestamps();
            $table->softDeletes();


            // Indexes for performance

            // Foreign keys (joins)
            $table->index('case_id');
            $table->index('patient_id');
            $table->index('doctor_id');
            $table->index('specialty_id');
            $table->index('practice_location_id');
            $table->index('created_by');

            // Date & time filtering
            $table->index('appointment_date');
            $table->index('appointment_time');

            // Status filtering
            $table->index('status');

            // Composite indexes (VERY IMPORTANT )

            // Doctor schedule (most important)
            $table->index(['doctor_id', 'appointment_date']);

            // Doctor + time (avoid conflict + fast lookup)
            $table->index(['doctor_id', 'appointment_date', 'appointment_time']);

            // Patient history
            $table->index(['patient_id', 'appointment_date']);

            // Location + date (branch schedule)
            $table->index(['practice_location_id', 'appointment_date']);

            // Status + date (dashboard)
            $table->index(['status', 'appointment_date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
