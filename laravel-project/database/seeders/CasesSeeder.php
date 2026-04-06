<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CasesSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('cases')->insert([
            [
                'case_number' => 'CASE-2026-00001',

                'patient_id' => 1,
                'category_id' => 1,
                'practice_location_id' => 1,

                'purpose_of_visit' => 'Patient experiencing chest pain and shortness of breath.',

                'case_type' => 'Initial Consultation',
                'priority' => 'High',
                'case_status' => 'Active',

                'date_of_accident' => null,

                'insurance_id' => 1,
                'firm_id' => null,

                'referred_by' => 'Family Doctor',
                'referred_doctor_name' => 'Dr. John Smith',

                'opening_date' => '2026-04-01',
                'closing_date' => null,

                'clinical_notes' => 'Initial diagnosis suggests possible cardiac issue. ECG recommended.',

                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],

            [
                'case_number' => 'CASE-2026-00002',

                'patient_id' => 2,
                'category_id' => 2,
                'practice_location_id' => 1,

                'purpose_of_visit' => 'Knee pain after sports injury.',

                'case_type' => 'Emergency',
                'priority' => 'Urgent',
                'case_status' => 'Active',

                'date_of_accident' => '2026-03-29',

                'insurance_id' => 1,
                'firm_id' => null,

                'referred_by' => null,
                'referred_doctor_name' => null,

                'opening_date' => '2026-04-02',
                'closing_date' => null,

                'clinical_notes' => 'Possible ligament tear. MRI scheduled.',

                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        ]);
    }
}