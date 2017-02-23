<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>@yield('title')</title>
    <link href="{{asset('public/css/app.css')}}" rel="stylesheet">
    <link href="{{asset('public/css/mobile.css')}}" rel="stylesheet">
</head>
<body>
    <section>
        @yield('content')
    </section>
    <script src="{{asset('public/js/app.js')}}"></script>
</body>
</html>
