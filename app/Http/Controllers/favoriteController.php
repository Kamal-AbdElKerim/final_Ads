<?php

namespace App\Http\Controllers;

use App\Models\favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class favoriteController extends Controller
{
    public function favorite($id_ads){

        $id_user = Auth()->id();

        $favorite =new favorite();
        $favorite->UserID = $id_user;
        $favorite->AdID = $id_ads;
        $favorite->save();

        return response()->json('Ad added to favorites', 200);


    }

    public function remove_favorite($id)
    {
        $favorite = favorite::where('AdID', $id)
            ->where('UserID', Auth::id())
            ->first();

        if ($favorite) {
            $favorite->delete();

            return response()->json('Ad added to favorites', 200);
        } else {
            return response()->json('Ad is not in your favorites', 200);

        }

      
    }

    public function list_favorite()
    {
        $userId = Auth::id();

        $favorites = favorite::where('UserID', $userId)
        ->with(['ads.categories', 'ads.images'])

        ->paginate(4);

        return response()->json($favorites, 200);
       
    }
}
