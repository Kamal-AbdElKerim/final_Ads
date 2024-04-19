<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CityController extends Controller
{
    public function index(){

        $citys = json_decode(file_get_contents(public_path('json/city.json')), true);
        return $citys;

    }
}
