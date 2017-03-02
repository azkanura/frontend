<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Login - Badr Dashboard</title>

    <!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/simple-line-icons.css" rel="stylesheet">
    <link href="css/materialdesignicons.min.css" media="all" rel="stylesheet" type="text/css" />

    <!-- Custom CSS -->
    <link href="css/scrolling-nav.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<!-- The #page-top ID is part of the scrolling feature - the data-spy and data-target are part of the built-in Bootstrap scrollspy function -->

<body id="page-top" data-spy="scroll" data-target=".navbar-fixed-top">

    <!-- Navigation -->
    <div class="col-md-8 col-sm-6  section_hero">
      <h1 class="hero_title">One place, <br>All Solutions</h1>
      <h3 class="hero_content">We provide you the real time <br>progress of our project to <br>deliver sucessful products.</h3>
    </div>
    <div class="col-md-4 col-sm-6  section_login">
      <div class="login_panel">
          <img class="login_logo" src="img/badr.svg">
          <h1 class="login_title">Client Dashboard</h1>
          <p class="login_caption">Sign in with your dashboard account</p>
          <form>
            <input class="form-control input_round login_input" placeholder="Enterprise ID">
            <input class="form-control input_round login_input" placeholder="Password">
            <a href="dashboard.php" class="btn login_btn">Sign in</a>
          </form>
      </div>
    </div>

    <!-- jQuery -->
    <script src="js/jquery.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.js"></script>

    <!-- Scrolling Nav JavaScript -->
    <script src="js/jquery.easing.min.js"></script>
    <script src="js/scrolling-nav.js"></script>
    <script>
        $(document).ready(function(){
            $('#menuToggle').on('click',function(){
              var data = $(this).attr('data');
              switch(data){
                case 'open':
                  $('#sideMenu').css({'width':'37%'});
                  $('#main').css({'right':'37%','left':'-37%'});
                  console.log('berhasil a');
                  $(this).css({'background':'#212943'})
                  $('#menuToggle>i').removeClass('mdi mdi-menu');
                  $('#menuToggle>i').addClass('mdi mdi-arrow-right');
                  $(this).attr('data','close');
                  break;
                case 'close':
                  $('#sideMenu').css({'width':'0'});
                  $('#main').css({'right':'0','left':'0'});
                  console.log('berhasil b');
                  $(this).css({'background':'#02c6f0'});
                  $('#menuToggle>i').removeClass('mdi mdi-arrow-right');
                  $('#menuToggle>i').addClass('mdi mdi-menu');
                  $(this).attr('data','open');
              }


            });
        });
    </script>

</body>

</html>
