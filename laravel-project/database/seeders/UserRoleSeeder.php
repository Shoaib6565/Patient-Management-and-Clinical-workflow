<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;

class UserRoleSeeder extends Seeder
{
    public function run(): void
    {
        // Get roles
        $adminRole = Role::where('name', 'Admin')->first();
        $doctorRole = Role::where('name', 'Doctor')->first();
        $fdoRole = Role::where('name', 'FDO')->first();

        // Example Users (make sure these users exist in DB)
        $admin = User::where('email', 'shoaib@gmail.com')->first();
        $doctor = User::where('email', 'saleem@gmail.com')->first();
        $fdo = User::where('email', 'yasir@gmail.com')->first();

        // Assign roles using pivot (user_roles)
        if ($admin && $adminRole) {
            $admin->roles()->syncWithoutDetaching([$adminRole->id]);
        }

        if ($doctor && $doctorRole) {
            $doctor->roles()->syncWithoutDetaching([$doctorRole->id]);
        }

        if ($fdo && $fdoRole) {
            $fdo->roles()->syncWithoutDetaching([$fdoRole->id]);
        }
    }
}
