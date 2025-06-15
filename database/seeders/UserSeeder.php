<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'admin',
                'role' => 'admin',
                'username' => 'admin',
                'email' => 'admin@example.com',
                'password' => Hash::make('admin')
            ],
            [
                'name' => 'user',
                'role' => 'user',
                'username' => 'user',
                'email' => 'user@example.com',
                'password' => Hash::make('user')
            ]
        ];

        foreach ($users as $user) {
            \App\Models\User::create($user);
        }
    }
}
