<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Specialty;

class SpecialtySeeder extends Seeder
{
    public function run(): void
    {
        $specialties = [
            ['specialty_name' => 'General Medicine', 'description' => 'General healthcare services'],
            ['specialty_name' => 'Cardiology', 'description' => 'Heart and cardiovascular system'],
            ['specialty_name' => 'Dermatology', 'description' => 'Skin related treatments'],
            ['specialty_name' => 'Neurology', 'description' => 'Brain and nervous system'],
            ['specialty_name' => 'Orthopedics', 'description' => 'Bones and joints'],
            ['specialty_name' => 'Pediatrics', 'description' => 'Child healthcare'],
            ['specialty_name' => 'Gynecology', 'description' => 'Women health'],
            ['specialty_name' => 'Ophthalmology', 'description' => 'Eye care'],
            ['specialty_name' => 'ENT', 'description' => 'Ear, Nose, Throat'],
            ['specialty_name' => 'Dental', 'description' => 'Teeth and oral care'],
            ['specialty_name' => 'Psychiatry', 'description' => 'Mental health'],
            ['specialty_name' => 'Physical Therapy', 'description' => 'Rehabilitation therapy'],
            ['specialty_name' => 'Emergency Medicine', 'description' => 'Emergency treatments'],
        ];

        foreach ($specialties as $specialty) {
            Specialty::firstOrCreate(
                ['specialty_name' => $specialty['specialty_name']], // unique check
                $specialty
            );
        }
    }
}
