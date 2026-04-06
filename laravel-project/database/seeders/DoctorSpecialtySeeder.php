<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DoctorSpecialtySeeder extends Seeder
{
    public function run(): void
    {
        DB::table('doctor_specialties')->insert([
            [
                'user_id' => 2,
                'specialty_id' => 1
            ],
            [
                'user_id' => 2,
                'specialty_id' => 2
            ],
            // [
            //     'user_id' => 4,
            //     'specialty_id' => 4
            // ],
            // [
            //     'user_id' => 4,
            //     'specialty_id' => 5
            // ]
        ]);
    }
}