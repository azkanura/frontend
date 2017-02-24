const { mix } = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js(['resources/assets/js/app.js','resources/assets/js/jquery-ui.js','resources/assets/js/slider.js'], 'public/js')
   .sass('resources/assets/sass/app.scss', 'public/css')
   .sass('resources/assets/sass/aha.scss', 'public/css/aha.css')
   .sass('resources/assets/sass/slider.scss', 'public/css/slider.css')
   .styles('resources/assets/css/mobile.css', 'public/css/mobile.css')
   .options({ processCssUrls: false});
// var elixir = require('laravel-elixir');

// elixir(function(mix){
// 	mix.styles('bootstrap.css','public/assets/css/app.css');
// 	mix.sass(['_variable.scss','app.scss'],'public/assets/css/app.css');
// 	mix.scripts(['jquery-3.1.1.min.js','bootstrap.js','app.js'],'public/assets/js/app.js');
// });