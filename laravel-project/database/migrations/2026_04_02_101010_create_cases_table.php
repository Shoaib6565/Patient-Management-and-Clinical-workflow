<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cases', function (Blueprint $table) {

            $table->id();

            $table->string('case_number')->unique();

            $table->foreignId('patient_id')
                  ->constrained('patients')
                  ->cascadeOnDelete();
            $table->foreignId('category_id')
                    ->constrained('categories')
                    ->restrictOnDelete();

            $table->foreignId('practice_location_id')
                  ->constrained('practice_locations');

            // $table->enum('category', [
            //     'General Medicine',
            //     'Surgery',
            //     'Pediatrics',
            //     'Cardiology',
            //     'Orthopedics',
            //     'Neurology',
            //     'Dermatology',
            //     'Gynecology',
            //     'Ophthalmology',
            //     'ENT',
            //     'Dental',
            //     'Psychiatry',
            //     'Physical Therapy',
            //     'Emergency',
            //     'Other'
            // ]);

            $table->text('purpose_of_visit');

            $table->enum('case_type', [
                'Initial Consultation',
                'Follow-up',
                'Emergency',
                'Chronic Care',
                'Preventive Care',
                'Pre-surgical',
                'Post-surgical'
            ]);

            $table->enum('priority', [
                'Low',
                'Normal',
                'High',
                'Urgent'
            ])->default('Normal');

            $table->enum('case_status', [
                'Active',
                'On Hold',
                'Closed',
                'Transferred',
                'Cancelled'
            ])->default('Active');

            $table->date('date_of_accident')->nullable();

            $table->foreignId('insurance_id')
                  ->nullable()
                  ->constrained('insurances')
                  ->nullOnDelete();

            $table->foreignId('firm_id')
                  ->nullable()
                  ->constrained('firms')
                  ->nullOnDelete();

            $table->string('referred_by')->nullable();
            $table->string('referred_doctor_name')->nullable();

            $table->date('opening_date');
            $table->date('closing_date')->nullable();

            $table->text('clinical_notes')->nullable();

            $table->timestamps();
            $table->softDeletes();


            // Indexes for fast searching

            // Filtering indexes
            $table->index('case_type');
            $table->index('case_status');

            // Foreign keys (joins)
            $table->index('patient_id');
            $table->index('category_id');
            $table->index('practice_location_id');
            $table->index('insurance_id');

            // Date filtering
            $table->index('opening_date');

            // Composite indexes

            // Patient + Status (patient history)
            $table->index(['patient_id', 'case_status']);

            // Location + Status (dashboard filtering)
            $table->index(['practice_location_id', 'case_status']);

            // Status + Opening Date (reports)
            $table->index(['case_status', 'opening_date']);

            // Category + Case Type (advanced filters)
            $table->index(['category_id', 'case_type']);

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cases');
    }
};
