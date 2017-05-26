<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('home');
    }

    public function category(Request $request){
        // $path = storage_path()."/json/${filename}.json"; // ie: /var/www/laravel/app/storage/json/filename.json
        // $json = json_decode(file_get_contents($path), true); 
        return view('category');
    }

    public function subCategory(Request $request){
        return view('sub_category');
    }

    public function subSubCategory(Request $request){
        return view('sub_sub_category');
    }
}
