<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PracticeLocation;

class PracticeLocationSeeder extends Seeder
{
    public function run(): void
    {
        $locations = [
            [
                'location_name' => 'Central Medical Clinic',
                'address' => '123 Main Street',
                'city' => 'New York',
                'state' => 'NY',
                'zip' => '10001',
                'phone' => '+1-212-555-1001',
                'email' => 'central@clinic.com',
                'is_active' => true
            ],
            [
                'location_name' => 'Northside Medical Center',
                'address' => '456 North Avenue',
                'city' => 'Chicago',
                'state' => 'IL',
                'zip' => '60601',
                'phone' => '+1-312-555-2002',
                'email' => 'northside@medcenter.com',
                'is_active' => true
            ],
            [
                'location_name' => 'East End Health Center',
                'address' => '789 East Road',
                'city' => 'Los Angeles',
                'state' => 'CA',
                'zip' => '90001',
                'phone' => '+1-213-555-3003',
                'email' => 'eastend@health.com',
                'is_active' => true
            ]
        ];

        foreach ($locations as $location) {
            PracticeLocation::create($location);
        }
    }
}