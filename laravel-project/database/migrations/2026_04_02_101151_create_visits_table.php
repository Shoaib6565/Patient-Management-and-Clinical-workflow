<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('visits', function (Blueprint $table) {
            $table->id();

            // Unique visit number
            $table->string('visit_number')->unique();

            // Relations
            $table->foreignId('appointment_id')->unique()->constrained()->cascadeOnDelete();
            $table->foreignId('case_id')->constrained()->cascadeOnDelete();
            $table->foreignId('patient_id')->constrained()->cascadeOnDelete();
            $table->foreignId('doctor_id')->constrained('users')->cascadeOnDelete();

            // Visit timing
            $table->date('visit_date');
            $table->time('visit_time');
            $table->integer('visit_duration_minutes')->nullable();

            // Medical data
            $table->text('diagnosis')->nullable();
            $table->json('diagnosis_codes')->nullable();

            $table->text('treatment')->nullable();
            $table->text('treatment_plan')->nullable();
            $table->text('prescription')->nullable();

            $table->json('prescription_documents')->nullable();

            $table->text('notes')->nullable();

            $table->json('vital_signs')->nullable();
            $table->text('symptoms')->nullable();

            // Follow-up
            $table->boolean('follow_up_required')->default(false);
            $table->date('follow_up_date')->nullable();

            // Referral
            $table->boolean('referral_made')->default(false);
            $table->string('referral_to')->nullable();

            // Status
            $table->enum('visit_status', [
                'Draft',
                'Completed',
                'Cancelled',
                'Billed'
            ])->default('Draft');

            $table->timestamp('completed_at')->nullable();

            $table->timestamps();
            $table->softDeletes();

            // Indexes
            $table->index(['patient_id', 'visit_date']);
            $table->index(['doctor_id', 'visit_date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('visits');
    }
};
