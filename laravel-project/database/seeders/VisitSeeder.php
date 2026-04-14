<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class VisitSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('visits')->insert([
            [
                'visit_number' => 'VISIT-2026-00001',

                'appointment_id' => 1,
                'case_id' => 1,
                'patient_id' => 1,
                'doctor_id' => 2,

                'visit_date' => '2026-04-10',
                'visit_time' => '10:00:00',
                'visit_duration_minutes' => 30,

                'diagnosis' => 'Mild hypertension',
                'diagnosis_codes' => json_encode(['I10']),

                'treatment' => 'Prescribed antihypertensive medication',
                'treatment_plan' => 'Monitor blood pressure for next 2 weeks',
                'prescription' => 'Amlodipine 5mg daily',

                'prescription_documents' => json_encode([
                    'prescription_001.pdf'
                ]),

                'notes' => 'Patient advised to reduce salt intake',

                'vital_signs' => json_encode([
                    'blood_pressure' => '140/90',
                    'heart_rate' => 82,
                    'temperature' => '98.6'
                ]),

                'symptoms' => 'Headache and dizziness',

                'follow_up_required' => true,
                'follow_up_date' => '2026-04-24',

                'referral_made' => false,
                'referral_to' => null,

                'visit_status' => 'Completed',
                'completed_at' => Carbon::now(),

                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],

            [
                'visit_number' => 'VISIT-2026-00002',

                'appointment_id' => 2,
                'case_id' => 2,
                'patient_id' => 2,
                'doctor_id' => 2,

                'visit_date' => '2026-04-11',
                'visit_time' => '11:00:00',
                'visit_duration_minutes' => 25,

                'diagnosis' => 'Knee ligament strain',
                'diagnosis_codes' => json_encode(['S83.5']),

                'treatment' => 'Rest and anti-inflammatory medication',
                'treatment_plan' => 'Physical therapy recommended',

                'prescription' => 'Ibuprofen 400mg twice daily',

                'prescription_documents' => json_encode([
                    'prescription_002.pdf'
                ]),

                'notes' => 'Avoid heavy physical activity',

                'vital_signs' => json_encode([
                    'blood_pressure' => '120/80',
                    'heart_rate' => 75,
                    'temperature' => '98.4'
                ]),

                'symptoms' => 'Knee pain and swelling',

                'follow_up_required' => true,
                'follow_up_date' => '2026-04-20',

                'referral_made' => true,
                'referral_to' => 'Orthopedic Specialist',

                'visit_status' => 'Completed',
                'completed_at' => Carbon::now(),

                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        ]);
    }
}