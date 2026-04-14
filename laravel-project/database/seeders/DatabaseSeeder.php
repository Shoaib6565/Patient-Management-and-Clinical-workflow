<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
        {
            $this->call([
            UserSeeder::class,
            ]);
            $this->call([
            RoleSeeder::class,
            ]);
            $this->call([
            PermissionSeeder::class,
            ]);
            $this->call([
            UserRoleSeeder::class,
            ]);
            $this->call([
            RolePermissionSeeder::class,
            ]);
            $this->call([
            PatientSeeder::class,
            ]);
            $this->call([
            SpecialtySeeder::class,
            ]);
            $this->call([
            InsuranceSeeder::class,
            ]);
            $this->call([
            FirmSeeder::class,
            ]);
            $this->call([
            PracticeLocationSeeder::class,
            ]);
            $this->call([
            DoctorSpecialtySeeder::class,
            ]);
            $this->call([
            DoctorAvailabilitiesSeeder::class,
            ]);
            $this->call([
            CategorySeeder::class,
            ]);
            $this->call([
            CasesSeeder::class,
            ]);
            $this->call([
            AppointmentSeeder::class,
            ]);
            $this->call([
            VisitSeeder::class,
            ]);
        }
}
