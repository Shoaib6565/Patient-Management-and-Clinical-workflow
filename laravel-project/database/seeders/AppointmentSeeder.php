<?php


namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AppointmentSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('appointments')->insert([
            [
                'appointment_number' => 'APT-2026-00001',

                'case_id' => 1,
                'patient_id' => 1,
                'doctor_id' => 2,
                'specialty_id' => 1,
                'practice_location_id' => 1,
                'created_by' => 1,

                'appointment_date' => '2026-04-10',
                'appointment_time' => '10:00:00',
                'end_time' => '10:30:00',

                'appointment_type' => 'New Patient',

                'duration_minutes' => 30,

                'status' => 'Scheduled',

                'reminder_sent' => false,
                'reminder_method' => 'Email',

                'notes' => 'First visit consultation',
                'reason_for_visit' => 'Chest pain evaluation',

                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],

            [
                'appointment_number' => 'APT-2026-00002',

                'case_id' => 2,
                'patient_id' => 2,
                'doctor_id' => 2,
                'specialty_id' => 2,
                'practice_location_id' => 1,
                'created_by' => 1,

                'appointment_date' => '2026-04-11',
                'appointment_time' => '11:00:00',
                'end_time' => '11:30:00',

                'appointment_type' => 'Follow-up',

                'duration_minutes' => 30,

                'status' => 'Confirmed',

                'reminder_sent' => true,
                'reminder_method' => 'Email',

                'notes' => 'Follow up after medication',
                'reason_for_visit' => 'Blood pressure monitoring',

                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]
        ]);
    }
}