<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class TagsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define tags for each category
        $categories = [
            'Vehicle' => [
                'Cars', 'Trucks', 'Motorcycles', 'Vans', 'SUVs',
                'Bicycles', 'Boats', 'RVs', 'Aircraft'
            ],
            'Electronics' => [
                'Computers', 'Smartphones', 'Tablets', 'Laptops', 'TVs',
                'Cameras', 'Audio Equipment', 'Gaming Consoles', 'Wearable Tech'
            ],
            'Health & Beauty' => [
                'Skincare', 'Makeup', 'Haircare', 'Perfumes', 'Personal Care',
                'Supplements', 'Health Devices', 'Spa & Massage', 'Dental Care'
            ],
            'Gadgets' => [
                'Smartwatches', 'Fitness Trackers', 'Headphones', 'Speakers', 'Laptops',
                'Tablets', 'VR Headsets', 'Smart Home Devices', 'Camera Drones'
            ],
            'Backpacks' => [
                'Travel Backpacks', 'Laptop Backpacks', 'School Backpacks', 'Hiking Backpacks', 'Fashion Backpacks',
                'Camera Backpacks', 'Hydration Packs', 'Diaper Bags', 'Backpack Accessories'
            ],
            'Watches' => [
                'Analog Watches', 'Digital Watches', 'Smartwatches', 'Luxury Watches', 'Sports Watches',
                'Fashion Watches', 'Kids Watches', 'Fitness Watches', 'Pocket Watches'
            ],
            'Furnitures' => [
                'Sofas', 'Chairs', 'Tables', 'Beds', 'Desks',
                'Wardrobes', 'Cabinets', 'Outdoor Furniture', 'Home Decor'
            ],
            'Fashion' => [
                'Clothing', 'Shoes', 'Accessories', 'Bags', 'Jewelry',
                'Watches', 'Beauty Products', 'Sunglasses'
            ],
            'Jobs' => [
                'Full-time', 'Part-time', 'Freelance', 'Internships', 'Remote',
                'Contract', 'Temporary', 'Volunteer'
            ],
            'Real Estate' => [
                'Apartments', 'Houses', 'Condos', 'Land', 'Commercial Properties',
                'Rooms for Rent', 'Vacation Rentals', 'Property Management'
            ],
         
            'Education' => [
                'Schools', 'Colleges', 'Courses', 'Tutoring', 'Online Learning',
                'Workshops', 'Certifications', 'Scholarships'
            ],
            'Matrimony' => [
                'Brides', 'Grooms', 'Matrimonial Services', 'Matchmaking', 'Wedding Planners',
                'Bridal Wear', 'Groom Wear', 'Wedding Venues', 'Honeymoon Packages'
            ],
        ];

        // Seed the database
        foreach ($categories as $categoryName => $tags) {
            $categoryID = DB::table('categories')->where('Name', $categoryName)->value('id');

            foreach ($tags as $tag) {
                DB::table('tags')->insert([
                    'TagName' => $tag,
                    'CategoryID' => $categoryID,
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            }
        }
    }
}
