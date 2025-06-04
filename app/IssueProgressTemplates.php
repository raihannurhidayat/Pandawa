<?php

namespace App;

use App\Enums\PhaseStatus;

class IssueProgressTemplates
{

    public const ISSUE_PROGRESS_TEMPLATES = [
        [ // step 1 verifikasi pengaduan baru
            PhaseStatus::Pending->value => [
                'title' => 'Pengaduan diajukan',
                'body' => 'Pengaduan telah diajukan dan menunggu tindak lanjut',
                'status' => PhaseStatus::Pending->value
            ],
            PhaseStatus::InProgress->value => [
                'title' => 'Pengaduan diproses',
                'body' => 'Pengaduan sedang diproses dan diverifikasi',
                'status' => PhaseStatus::InProgress->value
            ],
            PhaseStatus::Resolved->value => [
                'title' => 'Pengaduan diterima',
                'body' => 'Pengaduan diterima dan terverifikasi',
                'status' => PhaseStatus::Resolved->value
            ],
            PhaseStatus::Closed->value => [
                'title' => 'Pengaduan ditolak',
                'body' => 'Pengaduan ditolak dan tidak diterima',
                'status' => PhaseStatus::Closed->value
            ]
        ],
        [ // step 2 tindak lanjut/penyusunan solusi
            PhaseStatus::Pending->value => [
                'title' => 'Menunggu tindak lanjut',
                'body' => 'Pengaduan menunggu tindak lanjut',
                'status' => PhaseStatus::Pending->value
            ],
            PhaseStatus::InProgress->value => [
                'title' => 'Penyusunan solusi',
                'body' => 'Solusi pengaduan sedang disusun sebagai tindak lanjut',
                'status' => PhaseStatus::InProgress->value
            ],
            PhaseStatus::Resolved->value => [
                'title' => 'Solusi disetujui',
                'body' => 'Solusi pengaduan telah disetujui dan selesai',
                'status' => PhaseStatus::Resolved->value
            ],
            PhaseStatus::Closed->value => [
                'title' => 'Solusi ditolak',
                'body' => 'Solusi pengaduan ditolak dan tidak disetujui',
                'status' => PhaseStatus::Closed->value
            ]
        ],
        [ // step 3 eksekusi solusi
            PhaseStatus::Pending->value => [
                'title' => 'Persiapan pelaksanaan',
                'body' => 'Persiapan pelaksanaan solusi pengaduan',
                'status' => PhaseStatus::Pending->value
            ],
            PhaseStatus::InProgress->value => [
                'title' => 'Pelaksanaan solusi',
                'body' => 'Solusi pengaduan sedang dilaksanakan',
                'status' => PhaseStatus::InProgress->value
            ],
            PhaseStatus::Resolved->value => [
                'title' => 'Pelaksanaan selesai',
                'body' => 'Solusi pengaduan telah selesai dilaksanakan',
                'status' => PhaseStatus::Resolved->value
            ],
            PhaseStatus::Closed->value => [
                'title' => 'Pelaksanaan dibatalkan',
                'body' => 'Pelaksanaan solusi pengaduan dibatalkan',
                'status' => PhaseStatus::Closed->value
            ]
        ],
        [ // step 4 penyelesaian
            PhaseStatus::Pending->value => [
                'title' => 'Menunggu konfirmasi',
                'body' => 'Menunggu konfirmasi akhir dari pelapor',
                'status' => PhaseStatus::Pending->value
            ],
            PhaseStatus::InProgress->value => [
                'title' => 'Konfirmasi diproses',
                'body' => 'Konfirmasi akhir dari pelapor sedang diproses',
                'status' => PhaseStatus::InProgress->value
            ],
            PhaseStatus::Resolved->value => [
                'title' => 'Pengaduan selesai',
                'body' => 'Pengaduan telah selesai dan dikonfirmasi',
                'status' => PhaseStatus::Resolved->value
            ],
            PhaseStatus::Closed->value => [
                'title' => 'Pengaduan ditutup',
                'body' => 'Pengaduan telah ditutup tanpa konfirmasi akhir',
                'status' => PhaseStatus::Closed->value
            ]
        ]
    ];
}
