<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>@yield('title')</title>
    <link href="{{asset('public/css/app.css')}}" rel="stylesheet">
    <link href="{{asset('public/css/slider.css')}}" rel="stylesheet">
    <link href="{{asset('public/css/aha.css')}}" rel="stylesheet">
    <script>
        // rename myToken as you like
        window.Laravel =  <?php echo json_encode([
            'csrfToken' => csrf_token(),
        ]); ?>
    </script>
</head>
<body>
    <section>

        @yield('content')
    </section>
    <script src="{{asset('public/public/js/app.js')}}"></script>
</body>
</html>
