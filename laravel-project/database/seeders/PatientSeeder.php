<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Crypt;
use Carbon\Carbon;

class PatientSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('patients')->insert([
            [
                'first_name' => 'John',
                'middle_name' => 'A',
                'last_name' => 'Doe',

                'date_of_birth' => '1990-05-10',

                'gender' => 'Male',

                'ssn' => Crypt::encryptString('123-45-6789'),

                'email' => 'john.doe@example.com',

                'phone' => '1234567890',
                'mobile' => '9876543210',

                'address' => '123 Main Street',

                'city' => 'New York',
                'state' => 'NY',
                'zip_code' => '10001',
                'country' => 'USA',

                'emergency_contact_name' => 'Jane Doe',
                'emergency_contact_phone' => '5551234567',

                'primary_physician' => 'Dr. Smith',

                'insurance_provider' => 'Blue Cross',
                'insurance_policy_number' => 'INS-123456',

                'preferred_language' => 'English',

                'patient_status' => 'Active',

                'registration_date' => Carbon::now(),

                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],

            [
                'first_name' => 'Sarah',
                'middle_name' => null,
                'last_name' => 'Williams',

                'date_of_birth' => '1985-08-22',

                'gender' => 'Female',

                'ssn' => Crypt::encryptString('987-65-4321'),

                'email' => 'sarah.williams@example.com',

                'phone' => '1112223333',
                'mobile' => '4445556666',

                'address' => '456 Park Avenue',

                'city' => 'Los Angeles',
                'state' => 'CA',
                'zip_code' => '90001',
                'country' => 'USA',

                'emergency_contact_name' => 'Michael Williams',
                'emergency_contact_phone' => '7778889999',

                'primary_physician' => 'Dr. Brown',

                'insurance_provider' => 'Aetna',
                'insurance_policy_number' => 'INS-654321',

                'preferred_language' => 'English',

                'patient_status' => 'Active',

                'registration_date' => Carbon::now(),

                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        ]);
    }
}