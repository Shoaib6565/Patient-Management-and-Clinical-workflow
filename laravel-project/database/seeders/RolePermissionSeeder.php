<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Fetch roles
        $admin = Role::firstOrCreate(['name' => 'Admin']);
        $doctor = Role::firstOrCreate(['name' => 'Doctor']);
        $fdo = Role::firstOrCreate(['name' => 'FDO']);

        // Fetch all permissions
        $allPermissions = Permission::all();

        // Assign permissions
        // Admin: All permissions
        $admin->permissions()->sync($allPermissions->pluck('id'));

        // Doctor: Only doctor permissions
        $doctorPermissions = $allPermissions->whereIn('name', [
            'view_assigned_appointments',
            'receive_appointment_notifications',
            'view_patient_demographics',
            'view_medical_history',
            'record_visit_details',
            'finalize_visits',
            'update_appointment_status',
            'view_completed_visit_reports'
        ]);
        $doctor->permissions()->sync($doctorPermissions->pluck('id'));

        // FDO: Only FDO permissions
        $fdoPermissions = $allPermissions->whereIn('name', [
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
        ]);
        $fdo->permissions()->sync($fdoPermissions->pluck('id'));
    }
}
