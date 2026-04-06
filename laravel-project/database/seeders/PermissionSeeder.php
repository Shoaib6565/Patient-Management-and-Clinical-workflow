<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Permission;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = [
            // User Management
            'add_user',
            'edit_user',
            'delete_user',
            'assign_role',
            'reset_user_password',

            // Doctor specialties & availability
            'manage_doctor_specialties',
            'schedule_doctor_availability',
            'assign_doctor_location',

            // FDO permissions management
            'assign_fdo_permissions',

            // Dashboard / Reports
            'view_dashboard',
            'view_doctor_overview',
            'view_fdo_performance',
            'view_visit_statistics',

            // System Settings / Master Data
            'manage_specialties',
            'manage_practice_locations',
            'manage_insurance',
            'manage_firms',
            'manage_categories',
            'configure_application',

            // Patient Management
            'view_patients',
            'edit_patients',
            'delete_patients',

            // Case Management
            'view_cases',
            'edit_cases',
            'delete_cases',

            // Appointment Management
            'view_appointments',
            'edit_appointments',
            'cancel_appointments',
            'reschedule_appointments',
            'delete_appointments',

            // Visit Management
            'view_visits',
            'record_visit_details',
            'finalize_visits',

            // Reports
            'view_reports_patients',
            'view_reports_cases',
            'view_reports_appointments',
            'view_reports_visits',
            'view_reports_doctor_performance',
            'view_reports_fdo_activity',

            // Doctor specific
            'view_assigned_appointments',
            'receive_appointment_notifications',
            'view_patient_demographics',
            'view_medical_history',
            'update_appointment_status',
            'view_completed_visit_reports',

            // FDO specific
            'view_all_patients',
            'view_all_cases',
            'view_doctor_schedules',
            'receive_upcoming_appointment_notifications',
            'daily_agenda_view',
            'register_patients',
            'edit_patient_demographics',
            'search_view_patient_records',
            'manage_patient_status',
            'create_case',
            'update_case_info',
            'close_case',
            'create_appointment',
            'assign_appointment_doctor',
            'edit_appointment_details',
            'cancel_appointment',
            'reschedule_appointment',
            'view_appointment_history'
        ];

        foreach ($permissions as $perm) {
            Permission::firstOrCreate(['name' => $perm]);
        }
    }
}
