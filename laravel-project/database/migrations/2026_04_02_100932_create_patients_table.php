<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('patients', function (Blueprint $table) {

            $table->id();

            $table->string('first_name');
            $table->string('middle_name')->nullable();
            $table->string('last_name');

            $table->date('date_of_birth');

            $table->enum('gender', [
                'Male',
                'Female',
                'Other',
                'Prefer Not to Say'
            ]);

            $table->text('ssn')->unique();

            $table->string('email')->unique();

            $table->string('phone');
            $table->string('mobile');

            $table->text('address');
            $table->string('city');
            $table->string('state');
            $table->string('zip_code');
            $table->string('country');

            $table->string('emergency_contact_name');
            $table->string('emergency_contact_phone');

            $table->string('primary_physician')->nullable();

            $table->string('insurance_provider')->nullable();
            $table->string('insurance_policy_number')->nullable();

            $table->string('preferred_language')->default('English');

            $table->enum('patient_status', [
                'Active',
                'Inactive',
                'Deceased',
                'Transferred'
            ])->default('Active');

            $table->dateTime('registration_date');

            $table->timestamps();
            $table->softDeletes();

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};