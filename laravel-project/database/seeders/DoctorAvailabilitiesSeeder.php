<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DoctorAvailabilitiesSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('doctor_availabilities')->insert([
            [
                'user_id' => 2,
                'practice_location_id' => 1,
                'day_of_week' => 'Monday',
                'start_time' => '09:00:00',
                'end_time' => '13:00:00',
                'is_available' => true,
            ],
            [
                'user_id' => 2,
                'practice_location_id' => 1,
                'day_of_week' => 'Tuesday',
                'start_time' => '10:00:00',
                'end_time' => '15:00:00',
                'is_available' => true,
            ],
            [
                'user_id' => 2,
                'practice_location_id' => 1,
                'day_of_week' => 'Wednesday',
                'start_time' => '09:30:00',
                'end_time' => '14:30:00',
                'is_available' => true,
            ],
            // [
            //     'user_id' => 3,
            //     'practice_location_id' => 2,
            //     'day_of_week' => 'Thursday',
            //     'start_time' => '08:00:00',
            //     'end_time' => '12:00:00',
            //     'is_available' => true,
            // ],
            // [
            //     'user_id' => 3,
            //     'practice_location_id' => 2,
            //     'day_of_week' => 'Friday',
            //     'start_time' => '11:00:00',
            //     'end_time' => '16:00:00',
            //     'is_available' => true,
            // ],
        ]);
    }
}