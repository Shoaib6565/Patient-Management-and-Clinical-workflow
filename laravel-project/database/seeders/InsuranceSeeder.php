<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InsuranceSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('insurances')->insert([
            [
                'insurance_name' => 'Blue Cross Health Insurance',
                'insurance_code' => 'BC001',
                'address' => '123 Health Street, New York',
                'phone' => '1234567890',
                'is_active' => true
            ],
            [
                'insurance_name' => 'Aetna Medical Insurance',
                'insurance_code' => 'AE002',
                'address' => '456 Care Avenue, Chicago',
                'phone' => '9876543210',
                'is_active' => true
            ],
            [
                'insurance_name' => 'United Healthcare',
                'insurance_code' => 'UH003',
                'address' => '789 Wellness Road, California',
                'phone' => '5554443333',
                'is_active' => true
            ],
            [
                'insurance_name' => 'Government Health Insurance',
                'insurance_code' => 'GH004',
                'address' => '101 Public Health Blvd, Washington',
                'phone' => '2223334444',
                'is_active' => true
            ]
        ]);
    }
}