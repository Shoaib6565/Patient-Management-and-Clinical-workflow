<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notification;

class NotificationController extends Controller
{
    // get notification
    public function index(Request $request)
    {
        $user = $request->attributes->get('auth_user');

        $notifications = Notification::where('user_id', $user->id)
            ->latest()
            ->get();

        return response()->json($notifications);
    }

    // mark as read
    public function markAsRead($id)
    {
        $notification = Notification::findOrFail($id);

        $notification->update([
            'read_at' => now()
        ]);

        return response()->json(['message' => 'Marked as read']);
    }


    //unread count api for bell icon
    public function unreadCount(Request $request)
    {
        $user = $request->attributes->get('auth_user');

        $count = Notification::where('user_id', $user->id)
            ->whereNull('read_at')
            ->count();

        return response()->json(['count' => $count]);
    }

}
