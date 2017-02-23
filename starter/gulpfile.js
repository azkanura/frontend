var elixir = require('laravel-elixir');

elixir(function(mix){
	mix.styles('bootstrap.css','public/assets/css/app.css');
	mix.sass(['_variable.scss','app.scss'],'public/assets/css/app.css');
	mix.scripts(['jquery-3.1.1.min.js','bootstrap.js','app.js'],'public/assets/js/app.js');
});