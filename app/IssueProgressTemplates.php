<?php

namespace App;

class IssueProgressTemplates
{

    public const ISSUE_PROGRESS_TEMPLATES = [
        [ // step 1 verifikasi pengaduan baru
            IssueStatus::Pending->value => [
                'title' => 'Pengaduan diajukan',
                'body' => 'Pengaduan telah diajukan dan menunggu tindak lanjut',
                'status' => IssueStatus::Pending->value
            ],
            IssueStatus::InProgress->value => [
                'title' => 'Pengaduan diproses',
                'body' => 'Pengaduan sedang diproses dan diverifikasi',
                'status' => IssueStatus::InProgress->value
            ],
            IssueStatus::Resolved->value => [
                'title' => 'Pengaduan diterima',
                'body' => 'Pengaduan diterima dan terverifikasi',
                'status' => IssueStatus::Resolved->value
            ],
            IssueStatus::Closed->value => [
                'title' => 'Pengaduan ditolak',
                'body' => 'Pengaduan ditolak dan tidak diterima',
                'status' => IssueStatus::Closed->value
            ]
        ],
        [ // step 2 tindak lanjut/penyusunan solusi
            IssueStatus::Pending->value => [
                'title' => 'Menunggu tindak lanjut',
                'body' => 'Pengaduan menunggu tindak lanjut',
                'status' => IssueStatus::Pending->value
            ],
            IssueStatus::InProgress->value => [
                'title' => 'Penyusunan solusi',
                'body' => 'Solusi pengaduan sedang disusun sebagai tindak lanjut',
                'status' => IssueStatus::InProgress->value
            ],
            IssueStatus::Resolved->value => [
                'title' => 'Solusi disetujui',
                'body' => 'Solusi pengaduan telah disetujui dan selesai',
                'status' => IssueStatus::Resolved->value
            ],
            IssueStatus::Closed->value => [
                'title' => 'Solusi ditolak',
                'body' => 'Solusi pengaduan ditolak dan tidak disetujui',
                'status' => IssueStatus::Closed->value
            ]
        ],
        [ // step 3 eksekusi solusi
            IssueStatus::Pending->value => [
                'title' => 'Persiapan pelaksanaan',
                'body' => 'Persiapan pelaksanaan solusi pengaduan',
                'status' => IssueStatus::Pending->value
            ],
            IssueStatus::InProgress->value => [
                'title' => 'Pelaksanaan solusi',
                'body' => 'Solusi pengaduan sedang dilaksanakan',
                'status' => IssueStatus::InProgress->value
            ],
            IssueStatus::Resolved->value => [
                'title' => 'Pelaksanaan selesai',
                'body' => 'Solusi pengaduan telah selesai dilaksanakan',
                'status' => IssueStatus::Resolved->value
            ],
            IssueStatus::Closed->value => [
                'title' => 'Pelaksanaan dibatalkan',
                'body' => 'Pelaksanaan solusi pengaduan dibatalkan',
                'status' => IssueStatus::Closed->value
            ]
        ],
        [ // step 4 penyelesaian
            IssueStatus::Pending->value => [
                'title' => 'Menunggu konfirmasi',
                'body' => 'Menunggu konfirmasi akhir dari pelapor',
                'status' => IssueStatus::Pending->value
            ],
            IssueStatus::InProgress->value => [
                'title' => 'Konfirmasi diproses',
                'body' => 'Konfirmasi akhir dari pelapor sedang diproses',
                'status' => IssueStatus::InProgress->value
            ],
            IssueStatus::Resolved->value => [
                'title' => 'Pengaduan selesai',
                'body' => 'Pengaduan telah selesai dan dikonfirmasi',
                'status' => IssueStatus::Resolved->value
            ],
            IssueStatus::Closed->value => [
                'title' => 'Pengaduan ditutup',
                'body' => 'Pengaduan telah ditutup tanpa konfirmasi akhir',
                'status' => IssueStatus::Closed->value
            ]
        ]
    ];
}
