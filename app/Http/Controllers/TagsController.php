<?php

namespace App\Http\Controllers;

use App\Models\tag;
use Illuminate\Http\Request;

class TagsController extends Controller
{
    public function getTagsByCategory($category){

        $tags = tag::where('CategoryID', '=', $category)->get();

        return $tags;

    }
}
