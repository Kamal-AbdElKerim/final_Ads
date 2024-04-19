<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdsController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\TagsController;
use App\Http\Controllers\favoriteController;
use App\Http\Controllers\UserAuthController;
use App\Http\Controllers\BusinessCardController;
use App\Http\Controllers\DashboardUserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/




    Route::post('register', [UserAuthController::class, 'register']);
    Route::post('login', [UserAuthController::class, 'login']);


    Route::get('getAllAds', [AdsController::class, 'getAllAds']);
    Route::get('SinglPage/{id}', [AdsController::class, 'SinglPage']);

    Route::get('ads', [AdsController::class, 'findByFilters']);


    Route::get('Citys', [CityController::class, 'index']);

    
    
    Route::get('getTagsByCategory/{category}', [TagsController::class, 'getTagsByCategory']);
    
    Route::middleware('auth:sanctum')->group(function () {
        
   Route::post('storeAds', [AdsController::class, 'storeAds']);
    Route::post('logout', [UserAuthController::class, 'logout']);
    Route::get('user', [UserAuthController::class, 'user']);


    Route::get('/favorite/{id}', [favoriteController::class, 'favorite'])->name('favorite');
    Route::get('/remove_favorite/{id}', [favoriteController::class, 'remove_favorite'])->name('remove_favorite');
    Route::get('/list_favorite', [favoriteController::class, 'list_favorite'])->name('list_favorite');

   
            // Route to fetch ads
        Route::get('/myAds/{status}', [AdsController::class, 'myAds']);

        // Route to delete an ad
        Route::get('/deleteAds/{id}', [AdsController::class, 'deleteAds']);


        Route::post('/updateAds/{id}', [AdsController::class, 'updateAds']);

        // Route to update an ad
        // Route::post('/my-ads/{id}', [favoriteController::class, 'update'])->name('my-ads.update');


           // Route to update authenticated user's profile
                Route::post('/user/profile', [UserAuthController::class, 'updateProfile']);


                Route::get('/getUser/{id}', [UserAuthController::class, 'getUser']);

                // Route to change authenticated user's password
                Route::put('/user/password', [UserAuthController::class, 'changePassword']);

                // Route to upload user's profile picture
                Route::get('/Dashboard_user', [DashboardUserController::class, 'Dashboard_user']);

                Route::get('/remove_notification/{id}', [DashboardUserController::class, 'remove_notification']);

                Route::post('/add_Message', [ChatController::class, 'addMessage'])->name('add_Message');


                Route::get('/user_message/{user_id}', [ChatController::class, 'userMessages']);



                Route::get('/messages-list-json',[ChatController::class, 'messagesList_json'] );

   

});

Route::group(['middleware' => 'admin'], function () {
   
});
