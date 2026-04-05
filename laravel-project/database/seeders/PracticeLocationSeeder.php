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
                'location_name' => 'Central Clinic',
                'address' => '123 Main Street, Downtown',
                'city' => 'Karachi',
                'state' => 'Sindh',
                'zip' => '74000',
                'phone' => '021-12345678',
                'email' => 'central@clinic.com',
                'is_active' => true
            ],
            [
                'location_name' => 'Northside Medical Center',
                'address' => '456 North Avenue',
                'city' => 'Lahore',
                'state' => 'Punjab',
                'zip' => '54000',
                'phone' => '042-87654321',
                'email' => 'northside@medcenter.com',
                'is_active' => true
            ],
            [
                'location_name' => 'East End Health',
                'address' => '789 East Road',
                'city' => 'Islamabad',
                'state' => 'Islamabad Capital Territory',
                'zip' => '44000',
                'phone' => '051-11223344',
                'email' => 'eastend@health.com',
                'is_active' => true
            ]
        ];

        foreach ($locations as $location) {
            PracticeLocation::create($location);
        }
    }
}
