<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'General Medicine', 'description' => 'General health checkups and treatments'],
            ['name' => 'Surgery', 'description' => 'Surgical procedures and operations'],
            ['name' => 'Pediatrics', 'description' => 'Child healthcare services'],
            ['name' => 'Cardiology', 'description' => 'Heart related treatments'],
            ['name' => 'Orthopedics', 'description' => 'Bone and joint treatments'],
            ['name' => 'Neurology', 'description' => 'Brain and nervous system'],
            ['name' => 'Dermatology', 'description' => 'Skin related treatments'],
            ['name' => 'Gynecology', 'description' => 'Women health services'],
            ['name' => 'Ophthalmology', 'description' => 'Eye care services'],
            ['name' => 'ENT', 'description' => 'Ear, Nose, Throat treatments'],
            ['name' => 'Dental', 'description' => 'Teeth and oral care'],
            ['name' => 'Psychiatry', 'description' => 'Mental health services'],
            ['name' => 'Physical Therapy', 'description' => 'Rehabilitation and therapy'],
            ['name' => 'Emergency', 'description' => 'Emergency medical services'],
            ['name' => 'Other', 'description' => 'Other medical categories'],
        ];

        foreach ($categories as $category) {
            Category::firstOrCreate(
                ['name' => $category['name']], // unique check
                $category
            );
        }
    }
}
