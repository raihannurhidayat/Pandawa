<?php

namespace Database\Seeders;

use App\Models\IssueCategory;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class IssueCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $issueCategories = [
            [
                'name' => 'Jalan',
                'slug' => 'jalan',
                'description' => 'Isu Jalan'
            ],
            [
                'name' => 'Sampah',
                'slug' => 'sampah',
                'description' => 'Isu Sampah'
            ],
            [
                'name' => 'Lainnya',
                'slug' => 'lainnya',
                'description' => 'Isu Lainnya'
            ]
        ];

        foreach ($issueCategories as $issueCategory) {
            IssueCategory::create($issueCategory);
        }
    }
}
