<?php

use Illuminate\Support\Facades\Route;

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

Auth::routes();

Route::prefix('auth')->middleware('guest')->group(function() {

    // whereメソッドでパラメーターに成約を設けている
    Route::get('/{provider}', 'App\Http\Controllers\Auth\OAuthController@socialOAuth')
        ->where('provider','google')
        ->name('socialOAuth');
 
     Route::get('/{provider}/callback', 'App\Http\Controllers\Auth\OAuthController@handleProviderCallback')
         ->where('provider','google')
         ->name('oauthCallback');
 });

//'api'以外から始まるルーティングを全てReactに投げる。
Route::get('/{any}', function(){
    return view('app');
})->where('any', '^(?!api).*$');
