<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FirmSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('firms')->insert([
            [
                'firm_name' => 'ABC Legal Associates',
                'firm_type' => 'Legal',
                'address' => '123 Main Street, New York',
                'phone' => '1234567890',
                'contact_person' => 'John Smith',
                'is_active' => true
            ],
            [
                'firm_name' => 'Global Corporate Solutions',
                'firm_type' => 'Corporate',
                'address' => '456 Business Avenue, Chicago',
                'phone' => '9876543210',
                'contact_person' => 'Sarah Johnson',
                'is_active' => true
            ],
            [
                'firm_name' => 'Health Government Department',
                'firm_type' => 'Government',
                'address' => '789 State Road, Washington DC',
                'phone' => '5554443333',
                'contact_person' => 'Michael Brown',
                'is_active' => true
            ],
            [
                'firm_name' => 'Community Support Organization',
                'firm_type' => 'Other',
                'address' => '101 Charity Lane, Boston',
                'phone' => '2223334444',
                'contact_person' => 'Emily Davis',
                'is_active' => true
            ]
        ]);
    }
}