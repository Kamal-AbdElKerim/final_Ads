<?php

namespace Database\Seeders;

use App\Models\categorie;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Vehicle' => 'public/photos/car.svg',
            'Electronics' => 'public/photos/controller.svg',
            'Furnitures' => 'public/photos/furniture.svg',
            'Fashion' => 'public/photos/tshirt.svg',
            'Health & Beauty' => 'public/photos/hospital.svg',
            'Gadgets' => 'public/photos/controller.svg',
            'Backpacks' => 'public/photos/travel.svg',
            'Watches' => 'public/photos/watch.svg',
            'Jobs' => 'public/photos/jobs.svg',
            'Real Estate' => 'public/photos/real-estate.svg',
            'Education' => 'public/photos/education.svg',
            'Matrimony' => 'public/photos/matrimony.svg',
        ];

        foreach ($categories as $categoryName => $photoPath) {
            categorie::create([
                'Name' => $categoryName,
                'icon' => $photoPath,
            ]);
        }
    }
}
