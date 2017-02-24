<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/welcome', function () {
    return view('welcome');
});

Route::get('mobile/onboard-v1',function(){
	return view('mobile.onboard_v1');
});


Route::get('mobile/onboard-v2',function(){
	return view('mobile.onboard_v2');
});

Route::get('/',function(){
	return view('index');
});