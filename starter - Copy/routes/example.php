<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

Route::get('avatar/{uuid}', ['as' => 'avatar.url', function($uuid) {
    $filename = $uuid . '.png';
    if(Storage::disk('local')->has('avatars/' . $filename)) {
        $file = Storage::disk('local')->get('avatars/' . $filename);
        $mimeType = Storage::disk('local')->mimeType('avatars/' . $filename);

        return response($file, 200)->header('Content-Type', $mimeType);
    }

    return response()->view('errors.404', [], 404);
}]);
Route::get('image/{module}/{uuid}', 'ResourceController@getFile')->name('image');

Route::group(['middleware' => 'web'], function () {
    Route::auth();
    Route::get('/activate', ['as' => 'activation', 'uses' => 'UserController@activation']);

    Route::group(['middleware' => 'auth'], function() {
        Route::get('/', ['as' => 'home', function () {
            return view('welcome');
        }]);

        Route::group(['prefix' => 'user'], function () {
            Route::get('profile', ['as' => 'profile', 'uses' => 'UserController@profile']);
            Route::post('change_password', ['as' => 'change_password', 'uses' => 'UserController@changePassword']);
            Route::post('update_image',['as' => 'update_image', 'uses' => 'UserController@updateImage']);
        });

        Route::group(['prefix' => 'manages'], function () {
            Route::group(['prefix' => 'users', 'as' => 'user.', 'middleware' => ['permission:manage-users']], function () {
                Route::get('/', ['as' => 'index', 'uses' => 'UserController@index']);
                Route::get('form/{uuid?}', ['as' => 'form', 'uses' => 'UserController@form']);
                Route::get('data', ['as' => 'data', 'uses' => 'UserController@ajaxData']);
                Route::post('save', ['as' => 'save', 'uses' => 'UserController@save']);
                Route::post('delete', ['as' => 'delete', 'uses' => 'UserController@delete']);
            });

            Route::group(['prefix' => 'user_roles', 'as' => 'user_role.', 'middleware' => ['permission:manage-roles']], function () {
                Route::get('/', ['as' => 'index', 'uses' => 'UserRoleController@index']);
                Route::get('form/{uuid?}', ['as' => 'form', 'uses' => 'UserRoleController@form']);
                Route::get('data', ['as' => 'data', 'uses' => 'UserRoleController@ajaxData']);
                Route::post('save', ['as' => 'save', 'uses' => 'UserRoleController@save']);
                Route::post('delete', ['as' => 'delete', 'uses' => 'UserRoleController@delete']);
            });

            Route::group(['prefix' => 'controls', 'as' => 'control.', 'middleware' => ['permission:manage-controls']], function () {
                Route::get('/', ['as' => 'index', 'uses' => 'AccessController@index']);
                Route::get('data', ['as' => 'data', 'uses' => 'AccessController@ajaxData']);
                Route::get('permission/{id}', ['as' => 'permission', 'uses' => 'AccessController@ajaxPermissions']);
                Route::post('grant/{permission}/{role_id}', ['as' => 'permission', 'uses' => 'AccessController@ajaxGrantPermission']);
                Route::post('revoke/{permission}/{role_id}', ['as' => 'permission', 'uses' => 'AccessController@ajaxRevokePermission']);
            });

            // Route::group(['prefix' => 'all-users', 'as' => 'app.user.'], function () {
            Route::group(['prefix' => 'all-users', 'as' => 'app.user.', 'middleware' => ['permission:manage-users']], function () {
                Route::get('/', ['as' => 'index', 'uses' => 'App\UserController@index']);
                Route::post('filterUniversity', ['as' => 'filterUniversity', 'uses' => 'App\UserController@filterUniversity']);
                Route::post('filterFaculty', ['as' => 'filterFaculty', 'uses' => 'App\UserController@filterFaculty']);
                Route::get('form/{uuid?}', ['as' => 'form', 'uses' => 'App\UserController@form']);
                Route::get('detail/{uuid?}', ['as'=> 'detail', 'uses'=> 'App\UserController@detail']);
                Route::post('block', ['as'=> 'block', 'uses'=> 'App\UserController@block']);
                Route::post('unblock', ['as'=> 'unblock', 'uses'=> 'App\UserController@unblock']);
                Route::get('data', ['as' => 'data', 'uses' => 'App\UserController@ajaxData']);
                Route::post('save', ['as' => 'save', 'uses' => 'App\UserController@save']);
                Route::post('delete', ['as' => 'delete', 'uses' => 'App\UserController@delete']);
            });

            Route::group(['prefix' => 'posts', 'as' => 'app.post.', 'middleware' => ['permission:manage-users']], function () {
                Route::get('/', ['as' => 'index', 'uses' => 'App\PostController@index']);
                Route::get('form', ['as' => 'form', 'uses' => 'App\PostController@form']);
                Route::get('detail/{uuid?}/{type?}', ['as'=> 'detail', 'uses'=> 'App\PostController@detail']);
                Route::get('data', ['as' => 'data', 'uses' => 'App\PostController@ajaxData']);
                Route::get('data-comment', ['as' => 'data_comment', 'uses' => 'App\PostController@ajaxDataComment']);
                Route::post('save', ['as' => 'save', 'uses' => 'App\PostController@save']);
                Route::post('delete-comment', ['as' => 'delete_comment', 'uses' => 'App\PostController@deleteComment']);
                Route::post('filterUniversity', ['as' => 'filterUniversity', 'uses' => 'App\PostController@filterUniversity']);
                Route::post('filterFaculty', ['as' => 'filterFaculty', 'uses' => 'App\PostController@filterFaculty']);
                Route::post('filterStat', ['as' => 'filterStat','uses'=>'App\PostController@filterStat']);
                Route::post('filterGreetingCategory', ['as' => 'filterGreetingCategory','uses'=>'App\PostController@filterGreetingCategory']);
            });

            Route::group(['prefix'=>'dashboard', 'as'=>'app.dashboard.'], function(){
                Route::get('/', ['as'=>'index','uses'=>'App\DashboardController@index']);
                Route::post('/filter-university', ['as'=>'filterUniversity','uses'=>'App\DashboardController@filterUniversity']);
            });

            Route::group(['prefix'=>'log-poin', 'as'=>'app.log_poin.'], function(){
                Route::get('/', ['as'=>'index','uses'=>'App\LogPoinController@index']);
                Route::get('/data', ['as'=>'data','uses'=>'App\LogPoinController@ajaxData']);
            });

            Route::group(['prefix'=>'poin', 'as'=>'app.poin.'], function(){
                Route::get('/', ['as'=>'index','uses'=>'App\PoinController@index']);
                Route::post('/save', ['as'=>'save','uses'=>'App\PoinController@save']);
            });


        });
    });
});