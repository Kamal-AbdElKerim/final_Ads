<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();


        \App\Models\User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'phone' => '0669474622', // Assuming 'Phone' is the column name
            'role' => 'admin', // Assuming 'Phone' is the column name
            'password' => Hash::make('123'), // Hashing the password
        ]);
        \App\Models\User::factory()->create([
            'name' => 'user',
            'email' => 'user@gmail.com',
            'phone' => '0669474622', // Assuming 'Phone' is the column name
            'password' => Hash::make('123'), // Hashing the password
        ]);
        

        $this->call(CategorySeeder::class);
        $this->call(TagsSeeder::class);
    }
}
