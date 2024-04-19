<?php

namespace App\Http\Controllers;

use App\Models\ad;
use Carbon\Carbon;
use App\Models\User;
use App\Models\Notification;
use Illuminate\Http\Request;

class DashboardUserController extends Controller
{
    public function Dashboard_user()
    {
        $id = auth()->id(); 
        $user = User::find($id);

        $notifications = $user->notifications()
        ->orderBy('created_at', 'desc')
        ->get()
        ->map(function ($notification) {
            $notification->formatted_created_at = Carbon::parse($notification->created_at)->diffForHumans();
            return $notification;
        });
        $num_ads_pending = Ad::where('UserID', $id)->where('status', 'pending')->count(); // Use count() to get the number directly
        $num_ads_approved = Ad::where('UserID', $id)->where('status', 'approved')->count();
        $num_ads_sold = Ad::where('UserID', $id)->where('status', 'sold')->count();

        $ads = Ad::with(['images'])
            ->where('UserID', $id)
            ->latest('created_at')
            ->limit(4)
            ->get();

        
        $data = [
            'notifications' => $notifications,
            'ads' => $ads,
            'num_ads_pending' => $num_ads_pending,
            'num_ads_approved' => $num_ads_approved,
            'num_ads_sold' => $num_ads_sold,
        ];

        return response()->json($data); 
    }

    public function remove_notification($id){

        $notification = Notification::find($id);
 
        if (!$notification) {
            return response()->json( 'Notification not found.');
        }
 
        // Check if the authenticated user owns the notification
        if (auth()->user()->id !== $notification->user_id) {
            return response()->json('error', 'You are not authorized to remove this notification.');
        }
 
        // Delete the notification
        $notification->delete();
 
        return response()->json();
     }
}
