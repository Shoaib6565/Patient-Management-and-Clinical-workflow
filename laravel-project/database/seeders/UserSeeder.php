<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            [
                'name' => 'Muhammad Shoaib',
                'email' => 'shoaib@gmail.com',
                'password' => Hash::make('123456'),
            ],
            [
                'name' => 'Saleem Iqbal',
                'email' => 'saleem@gmail.com',
                'password' => Hash::make('123456'),
            ],
            [
                'name' => 'Yasir Shah',
                'email' => 'yasir@gmail.com',
                'password' => Hash::make('123456'),
            ],
        ];

        foreach ($users as $user) {
            User::firstOrCreate(
                ['email' => $user['email']], // unique check
                $user
            );
        }
    }
}
