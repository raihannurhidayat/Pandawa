<?php

namespace Database\Seeders;

use App\Models\IssueCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class IssueCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'jalan',
            'sampah',
            'lalu lintas',
            'penerangan jalan',
            'air bersih',
            'drainase',
            'kebersihan lingkungan',
            'pohon',
            'taman',
            'keamanan',
            'kebisingan',
            'polusi udara',
            'polusi air',
            'kerusakan fasilitas',
            'vandalisme',
            'trotoar',
            'angkutan umum',
            'internet',
            'listrik',
            'taman bermain',
            'hewan liar',
            'banjir',
            'lainnya',
        ];

        foreach ($categories as $name) {
            IssueCategory::updateOrCreate(
                ['slug' => Str::slug($name)],
                [
                    'name' => ucfirst($name),
                    'slug' => Str::slug($name),
                    'description' => 'Isu ' . ucfirst($name)
                ]
            );
        }
    }
}
