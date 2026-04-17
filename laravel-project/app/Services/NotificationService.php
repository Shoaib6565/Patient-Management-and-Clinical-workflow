<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class NotificationService
{
    public function sendToUser($userId, $data)
    {
        Http::post('http://localhost:3001/send', [
            'userId' => $userId,
            'data' => $data
        ]);
    }
}
