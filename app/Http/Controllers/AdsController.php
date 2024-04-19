<?php

namespace App\Http\Controllers;

use App\Models\ad;
use App\Models\User;
use App\Models\image;
use App\Models\categorie;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class AdsController extends Controller
{
    public function getAllAds(){
        
        $citys = json_decode(file_get_contents(public_path('json/city.json')), true);
        $years = json_decode(file_get_contents(public_path('json/years.json')), true);


        $ads = ad::with(['users','categories', 'images', 'favorites'])
          ->where('status','approved')
          ->latest('created_at')
          ->limit(6)
          ->get();

          
          $num_categories = categorie::all();
          $num_ADS = ad::all();
          $num_users = User::all();

          return response()->json(['ads' => $ads, 'num_categories' => $num_categories, 'num_ADS' => $num_ADS, 'num_users' => $num_users, 'citys' => $citys, 'years' => $years], 200);

    }


    public function myAds($status){

        if ($status === 'all') {
            $query = Ad::latest()->with('images','categories')->where('UserID',Auth()->id())->paginate(4);
        } else {
            $query = Ad::latest()->with('images','categories')->where('status', $status)->where('UserID',Auth()->id())->paginate(4);
        }

        return response()->json(['ads' => $query], 200);
    }


    public function updateAds(Request $request, $id)
    {
        $validatedData = $request->validate([
            'Price' => 'required',
            'Title' => 'required',
            'TypePrice' => 'required',
            'Condition' => 'required',
            'Description' => 'required',
            'Location' => 'required',
        ]);

        $ad = Ad::findOrFail($id);

        Notification::create([
            'user_id' => Auth::id(),
            'type' => 'info',
            'message' => "Your ad ({$ad->Title}) has been updated.",
        ]);

        $ad->update([
            'Title' => $request->input('Title'),
            'Price' => $request->input('Price'),
            'TypePrice' => $request->input('TypePrice'),
            'Condition' => $request->input('Condition'),
            'Description' => $request->input('Description'),
            'Location' => $request->input('Location'),
            'status' => 'pending',
        ]);

        return response()->json(['message' => 'Ad updated successfully.']);
    }

    public function deleteAds($id)
    {
        $ad = Ad::findOrFail($id);

        Notification::create([
            'user_id' => Auth::id(),
            'type' => 'info',
            'message' => "Your ad ({$ad->Title}) has been deleted.",
        ]);

        $ad->status = 'sold';
        $ad->save();

        return response()->json(['message' => 'Ad deleted successfully.']);
    }

    public function SinglPage($id){

        $ad = ad::with(['categories', 'users', 'images', 'tags'])->findOrFail($id);

        return response()->json(['ad' => $ad], 200);

       
    }

    public function storeAds(Request $request)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'Title' => 'string',
            'Description' => 'string',
            'Category' => 'integer',
            'Condition' => 'string',
            'Puissance' => 'string',
            'TypeCar' => 'string',
            'Model' => 'string',
            'Price' => 'numeric',
            'TypePrice' => 'string',
            'City' => 'string',
            'Location' => 'string',
            'tags_selected.*' => 'integer',
        ]);
    
        // Check if validation fails
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
    
        // Create a new ad instance
        $ad = new ad();
    
        // Assign validated data to the ad instance
        $ad->Title = $request->input('title');
        $ad->Description = $request->input('Description');
        $ad->CategoryID = $request->input('Category');
        $ad->Condition = $request->input('Condition');
        $ad->Puissance = $request->input('Puissance');
        $ad->TypeCar = $request->input('TypeCar');
        $ad->Model = $request->input('Model');
        $ad->UserID = Auth::id(); // Use Auth::id() to get the authenticated user's ID
        $ad->Price = $request->input('price');
        $ad->TypePrice = $request->input('Type_price');
        $ad->City = $request->input('City');
        $ad->Location = $request->input('Location');
    
        // Save the ad to the database
        $ad->save();
    
        // Retrieve the ID of the last inserted ad
        $lastInsertedId = $ad->id;
    
        // Add Notification
        Notification::create([
            'user_id' => Auth::id(),
            'type' => 'info',
            'message' => 'Your ad has been saved. You must wait for the admin to accept your Ad.',
        ]);
    
        // Process and save uploaded images
        if ($request->has('photos')) {
            $photos = $request->file('photos');
    
            foreach ($photos as $photo) {
    
                $url = Storage::putFile('public/Ads', $photo);
    
                $image = new Image();
                $image->ImageURL = $url;
                $image->AdID = $lastInsertedId; 
                $image->save();
            }
    
            // return response()->json(['message' => 'Images uploaded successfully'], 200);
        } else {
            return response()->json(['errors' => 'No photos found in the request'], 400);
        }
        
    
        // Optionally, handle tags_selected (if using tags)
    
        // Return success response
        return response()->json([
            
            'message' => 'Ad saved successfully. You must wait for the admin to accept your Ad.',
            'ad_id' => $lastInsertedId,

        ], 200);
    }


    public function findByFilters(Request $request)
    {
        $query = ad::latest()->with(['favorites','categories','images']);
        $Category = Categorie::has('ads')->with('ads')->withCount('ads')->get();


        // Apply category filter
        if ($request->keyword) {

              $query->where('Title', 'LIKE', '%'. $request->keyword. '%');
                
        }

        if($request->Category){

              $query->where('CategoryID', $request->Category);

        }
  // Apply city filter
        if ($request->city) {
            $query->where('City', $request->city);
        }

        

        // Apply price filter (range)
        if ($request->price) {
         
            $query->where('Price', '<=', $request->price);
        }

      

        // Get the ads matching the filters
        $ads = $query->paginate(3);

        return response()->json([
            'ads' => $ads,
            'Category' => $Category,
        ]);
    }
}
