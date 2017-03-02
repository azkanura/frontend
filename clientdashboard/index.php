<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Badr Dashboard</title>

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
    <div class="main" id="main">
      <nav class="navbar navbar-default" role="navigation">
        <span class="menu_toggle" id="menuToggle" data="open">
            <i class="mdi mdi-menu"></i>
        </span>
          <div class="container-fluid">
              <span class="navbar_app_logo">
                  <img src="img/b.png">
              </span>
              <span class="navbar_app_title">
              client<br>
              dashboard
              </span>

              <span class="navbar_client_logo"
                  <?php
                      if($_GET){
                          if($_GET["name"]){
                          $name = $_GET["name"];
                          switch($name){
                              case 'ace':
                                  echo  htmlspecialchars('style=background-image:url("'.'img/ace.png'.'")');
                                  break;
                              case 'ahaa':
                                  echo htmlspecialchars('style=background-image:url("'.'img/aha.svg'.'")');
                                  break;
                              case 'aha':
                                  echo htmlspecialchars('style=background-image:url("'.'img/aha.svg'.'")');
                                  break;
                              case 'bni':
                                  echo htmlspecialchars('style=background-image:url("'.'img/bni.png'.'")');
                                  break;
                              default:
                                  echo htmlspecialchars('style=background-image:url("'.'img/b.png'.'")');
                              }
                           }
                           else{
                              echo 'style=background-image:url("'.'img/b.png'.'")';
                           }
                      }
                      else{
                          echo 'style=background-image:url("'.'img/b.png'.'")';
                      }
                  ?>
              >

              </span>
              <span class="navbar_greeting">
                  Selamat Datang,
                  <h3 class="navbar_client_name">
                  <?php
                      if($_GET){
                          if($_GET["name"]){
                          $name = $_GET["name"];
                          switch($name){
                              case 'ace':
                                  echo 'Ace Hardware';
                                  break;
                              case 'ahaa':
                                  echo 'Ahaa';
                                  break;
                              case 'aha':
                                  echo 'Ahaa';
                                  break;
                              case 'bni':
                                  echo 'BNI Syariah';
                                  break;
                              default:
                                  echo 'Badr Interactive';

                              }
                           }
                           else{
                              echo 'Badr Interactive';
                           }
                      }
                      else{
                          echo 'Badr Interactive';
                      }

                  ?>
                  </h3>
              </span>

          </div>
          <!-- /.container -->
      </nav>

      <header class="header" style="background-image: url('img/header-img.png')">
          <div class="container-fluid container_fluid">
              <div class="row">
                  <div class="col-md-4">
                      <h2 class="header_title">One place,<br> All Solutions</h2>
                      <p class="header_content">We provide you the real time<br> progress of our project to <br>deliver sucessful products.</p>
                  </div>
              </div>
          </div>
      </header>
      <section class="progress_section">
          <div class="container-fluid container_fluid">
              <div class="row">
                  <div class="col-md-12">
                      <div class="progress_timeline">
                          <div class="progress_timeline_item agreement">
                              <p class="progress_timeline_item_phase">Agreement</p>
                              <div class="progress_timeline_bar">
                                  <span class="progress_timeline_circle"></span>
                              </div>
                               <p class="progress_timeline_item_date">24 Feb</p>
                          </div>
                          <div class="progress_timeline_item zero">
                              <p class="progress_timeline_item_phase">Sprint Zero</p>
                              <div class="progress_timeline_bar">
                                  <span class="progress_timeline_circle"></span>
                              </div>
                               <p class="progress_timeline_item_date">1 Mar</p>
                          </div>
                          <div class="progress_timeline_item feedback">
                              <p class="progress_timeline_item_phase">Feedback</p>
                              <div class="progress_timeline_bar">
                                  <span class="progress_timeline_circle"></span>
                              </div>
                               <p class="progress_timeline_item_date">8 Mar</p>
                          </div>
                          <div class="progress_timeline_item sprint">
                              <p class="progress_timeline_item_phase">Sprint 01-14</p>
                              <div class="progress_timeline_bar">
                                  <span class="progress_timeline_circle"></span>
                              </div>
                               <p class="progress_timeline_item_date">12 Mar</p>
                          </div>
                          <div class="progress_timeline_item">
                              <p class="progress_timeline_item_phase">Usability Test</p>
                              <div class="progress_timeline_bar">
                                  <span class="progress_timeline_circle"></span>
                              </div>
                               <p class="progress_timeline_item_date">Starts 28 Mar</p>
                          </div>
                          <div class="progress_timeline_item">
                              <p class="progress_timeline_item_phase">UAT</p>
                              <div class="progress_timeline_bar">
                                  <span class="progress_timeline_circle"></span>
                              </div>
                               <p class="progress_timeline_item_date">Starts 12 Apr</p>
                          </div>
                          <div class="progress_timeline_item">
                              <p class="progress_timeline_item_phase">Maintenance</p>
                              <div class="progress_timeline_bar">
                                  <span class="progress_timeline_circle"></span>
                              </div>
                               <p class="progress_timeline_item_date">30 Days After UAT</p>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-4 progress_deadline_container hidden_sm">
                      <div class="progress_deadline">
                          <h4 class="progress_deadline_title">The closest due date</h4>
                          <h2 class="progress_deadline_content">Thursday,<br>15 March 2017</h2>
                          <h4 class="progress_deadline_title">Amount</h4>
                          <h2 class="progress_deadline_content amount">Rp 150,000,000</h2>
                          <a href="#" class="btn progress_deadline_btn">view invoice</a>
                      </div>
                  </div>
                  <div class="col-md-8">
                      <div class="row">
                          <div class="col-md-12">
                              <div class="panel">
                                  <h3 class="table_header">
                                  Details Progress Development
                                  <div class="table_searchbar_container">
                                      <img class="table_searchbar_icon" src="img/search.svg">
                                      <input class="table_searchbar">
                                  </div>
                                  </h3>
                                  <div class="table_bg  table-responsive">
                                      <table class="table">
                                          <thead>
                                              <tr>
                                                  <td>Date</td>
                                                  <td>Phase</td>
                                                  <td>Task</td>
                                                  <td>Status</td>
                                                  <td>Link/attachment</td>
                                              </tr>
                                          </thead>
                                          <tbody>

                                              <tr>
                                                  <td>10/2/17</td>
                                                  <td class="zero">Sprint Zero</td>
                                                  <td>Design Style Guideline</td>
                                                  <td>Done</td>
                                                  <td>BNI Styleguide.pdf</td>
                                              </tr>
                                              <tr>
                                                  <td>12/2/17</td>
                                                  <td class="agreement">Agreement</td>
                                                  <td>SPK</td>
                                                  <td>Done</td>
                                                  <td>SPK.pdf</td>
                                              </tr>
                                              <tr>
                                                  <td>10/2/17</td>
                                                  <td class="sprint">Sprint 01</td>
                                                  <td>Mobile Screen 01</td>
                                                  <td>Progress</td>
                                                  <td>bit.ly/mockup</td>
                                              </tr>
                                          </tbody>

                                      </table>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div class="row">
                          <div class="col-sm-5">
                              <p class="table_pagination_text">Showing 1 to 10 of 57 entry</p>
                          </div>
                          <div class="col-sm-7">
                              <div class="btn-group pull-right">
                                <button type="button" class="btn btn-default table_pagination_item">Previous</button>
                                <button type="button" class="btn btn-default table_pagination_item active">1</button>
                                <button type="button" class="btn btn-default table_pagination_item">2</button>
                                <button type="button" class="btn btn-default table_pagination_item">3</button>
                                <button type="button" class="btn btn-default table_pagination_item">4</button>
                                <button type="button" class="btn btn-default table_pagination_item">5</button>
                                <button type="button" class="btn btn-default table_pagination_item">6</button>
                                <button type="button" class="btn btn-default table_pagination_item">Next</button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
      <section class="progress_deadline show_sm">
          <h4 class="progress_deadline_title">The closest due date</h4>
          <h2 class="progress_deadline_content">Thursday,<br>15 March 2017</h2>
          <h4 class="progress_deadline_title">Amount</h4>
          <h2 class="progress_deadline_content amount">Rp 150,000,000</h2>
          <a href="#" class="btn progress_deadline_btn">view invoice</a>
      </section>

      <!-- Contact Section -->
      <section class="request">
          <div class="container-fluid">
              <div class="row">
                  <div class="col-md-4 col-sm-6 request_contact">
                      <img class="request_contact_img" src="img/contact.png">
                      <h4 class="request_contact_title">Meet your Product-lab Manager</h4>
                      <h3 class="request_contact_text">Andika Amri</h3>
                      <p class="request_contact_small">+62 857 1876 5912</p>

                  </div>
                  <div class="col-md-8 col-sm-6 request_info">
                      <div class="col-md-7 col-sm-6">
                          <h4 class="request_info_title">Last ticket Request</h4>
                          <h3 class="request_info_content"><i class="icon-envelope-letter request_info_icon"></i>Additional Feature in home page</h3>
                      </div>
                      <div class="col-md-4 col-sm-4">
                          <h4 class="request_info_title">Date</h4>
                          <h3 class="request_info_content"><i class="icon-calendar request_info_icon"></i>14  Mar 2017</h3>
                      </div>
                      <div class="col-md-1 col-sm-2">
                          <h4 class="request_info_title text-center">Status</h4>
                          <h3 class="request_info_content text-center"><i class="icon-check checklist"></i></h3>
                      </div>
                  </div>
              </div>
          </div>
      </section>
      <section class="section">
          <div class="container-fluid container_fluid">
              <div class="row">
                  <div class="col-md-6 col-md-offset-3">
                      <h2 class="section_title">See the lastest design progress</h2>
                      <p class="section_caption">We always update the most viable product trough prototype & mockup. <br>Check the live prototype that we provides or download the completed ones.*</p>
                      <div class="row">
                          <div class="col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-8 col-xs-offset-2">
                              <a class="section_action_btn" href="#"><img src="img/playstore-btn.png"></a><a class="section_action_btn" href="#"><img src="img/appstore-btn.png"></a>
                          </div>
                      </div>
                      <p class="additional_info">*the final products will be provided after the last sprint
                      </p>

                  </div>
              </div>

          </div>
      </section>
      <div class="no_padding">
          <div class="container-fluid container_fluid">
              <div class="row section_img">
                  <div class="col-md-3 col-xs-3  section_img_item" style="background-image: url('img/section_img_item_1.png')">
                  </div>
                  <div class="col-md-6 col-xs-6 section_img_item" style="background-image: url('img/section_img_item_2.png')">
                  </div>
                  <div class="col-md-3 col-xs-3 section_img_item" style="background-image: url('img/section_img_item_3.svg')">
                  </div>
              </div>
          </div>
      </div>
      <section class="feature">
          <div class="container-fluid container_fluid">
              <div class="col-sm-5 feature_item">
                  <h4 class="feature_item_title">DESIGN STYLE GUIDELINE</h4>
                  <h3 class="feature_item_content">See the principle of the design<br> that we provides based on UX <br>and UI concept</h3>
                  <a class="btn feature_item_action_btn">
                  LIVE PREVIEW
                  </a>
              </div>
              <div class="col-sm-4 feature_item">
                  <h4 class="feature_item_title">DESKTOP VERSION</h4>
                  <h3 class="feature_item_content">Check the interactive mockup<br> of Web/Desktop version<br> via Marvell app</h3>
                  <a class="btn feature_item_action_btn">
                  LIVE PREVIEW
                  </a>
              </div>
              <div class="col-sm-3 feature_item">
                  <h4 class="feature_item_title">MOBILE VERSION</h4>
                  <h3 class="feature_item_content">Check the interactive <br>mockup of mobile version <br>via Marvell App</h3>
                  <a class="btn feature_item_action_btn">
                  LIVE PREVIEW
                  </a>
              </div>
          </div>
      </section>
      <section class="purchase">
          <div class="container-fluid container_fluid">
              <div class="row">
                  <div class="promo">
                      <div class="col-md-5">
                          <h4 class="promo_title">Make new purchase or referal to others</h4>
                          <h3 class="promo_content">and Get Cashback up to IDR5 million</h3>
                      </div>
                      <div class="col-md-4">
                          <img class="promo_ticket" src="img/barcode.png">
                      </div>
                      <div class="col-md-3">
                          <a class="btn promo_action_btn">
                              order now  <i class="icon-arrow-right-circle promo_action_btn_icon"></i>
                          </a>
                      </div>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-12">
                      <div class="panel">
                          <h3 class="table_header">
                          My Purchases
                          <div class="table_searchbar_container searchbar_short">
                              <img class="table_searchbar_icon" src="img/search.svg">
                              <input class="table_searchbar">
                          </div>
                          </h3>
                          <div class="table_bg table-responsive">
                              <table class="table">
                                  <thead>
                                      <tr>
                                          <td>Date</td>
                                          <td>Invoice No</td>
                                          <td>Title of Project</td>
                                          <td>Status</td>
                                          <td>Currency</td>
                                          <td>Balance</td>
                                          <td>Redeem Voucher</td>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      <tr>
                                          <td>10/3/17</td>
                                          <td>201702002</td>
                                          <td>BNI Wakaf MVP 03</td>
                                          <td>Active</td>
                                          <td>USD</td>
                                          <td>1200</td>
                                          <td>No Voucher</td>
                                      </tr>
                                      <tr class="active">
                                          <td>10/3/17</td>
                                          <td>201702002</td>
                                          <td>BNI Wakaf MVP 01</td>
                                          <td>Active</td>
                                          <td>IDR</td>
                                          <td>120,000,000</td>
                                          <td>5,000,000</td>
                                      </tr>
                                      <tr>
                                          <td>10/3/18</td>
                                          <td>201702002</td>
                                          <td>BNI Wakaf MVP 02</td>
                                          <td>Finish</td>
                                          <td>IDR</td>
                                          <td>120,000,000</td>
                                          <td>5,000,000</td>
                                      </tr>
                                  </tbody>

                              </table>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="row">
                  <div class="col-sm-5">
                      <p class="table_pagination_text">Showing 1 to 10 of 57 entry</p>
                  </div>
                  <div class="col-sm-7">
                      <div class="btn-group pull-right">
                        <button type="button" class="btn btn-default table_pagination_item">Previous</button>
                        <button type="button" class="btn btn-default table_pagination_item active">1</button>
                        <button type="button" class="btn btn-default table_pagination_item">2</button>
                        <button type="button" class="btn btn-default table_pagination_item">3</button>
                        <button type="button" class="btn btn-default table_pagination_item">4</button>
                        <button type="button" class="btn btn-default table_pagination_item">5</button>
                        <button type="button" class="btn btn-default table_pagination_item">6</button>
                        <button type="button" class="btn btn-default table_pagination_item">Next</button>
                      </div>
                  </div>
              </div>
          </div>
      </section>
      <footer class="footer">
          <div class="container-fluid container_fluid">
              <div class="row">
                  <div class="col-md-12">
                      <h3 class="footer_action_text">Interested in our other services?</h3>
                      <a class="btn footer_action_btn">
                          See Our Solutions
                      </a>
                      <p class="footer_copyright">Copyright PT BADR INTERACTIVE 2017</p>
                  </div>
              </div>
          </div>
      </footer>
    </div>
    <aside class="side_menu" id="sideMenu">
        <div class="menu_img_container" style="background-image:url('img/aha.svg')">
            <div class="main_info">
                <div class="col-md-7">
                  <h2 class="menu_company_name">Ahaa Apps</h2>
                  <h4 class="menu_package">Badr Enterprise Solutions</h4>
                </div>
                <div class="col-md-5">
                  <a href="login.php">
                    <span class="menu_action_btn">
                        <i class="mdi mdi-login-variant"></i>
                    </span>
                  </a>
                  <a href="#">
                    <span class="menu_action_btn">
                        <i class="mdi mdi-lead-pencil"></i>
                    </span>
                  </a>
                </div>
            </div>
        </div>
        <div class="menu_info_container">
            <h4 class="menu_title">BASIC INFO :</h4>
            <p class="menu_content"><i class="mdi mdi-phone"></i>021-987 654 321</p>
            <p class="menu_content"><i class="mdi mdi-email"></i>halo@ahaa.com</p>
            <p class="menu_content"><i class="mdi mdi-domain"></i><span>Menara Global Building <br>16th Floor, Unit C-D <br>Jl. Jend. Gatot Subroto Kav.27 <br>Jakarta, 12950 Indonesia</span></p>
        </div>
        <div class="menu_info_container">
            <h4 class="menu_title">PAYMENT METHOD :</h4>
            <p class="menu_content"><i class="mdi mdi-credit-card"></i>Transfer</p>
        </div>
        <div class="menu_info_container">
            <h4 class="menu_title">DELIVERY DATE :</h4>
            <p class="menu_content"><i class="mdi mdi-calendar-range"></i>March, 23 2017</p>
        </div>
        <div class="menu_info_container">
            <h4 class="menu_title">SHIP TO :</h4>
            <p class="menu_content"><i class="mdi mdi-cart"></i><span>Menara Global Building <br>16th Floor, Unit C-D <br>Jl. Jend. Gatot Subroto Kav.27 <br>Jakarta, 12950 Indonesia</span></p>
        </div>


    </aside>

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

            $('.progress_timeline_bar').click(function(){
              // $(this).css({'background-color':'black'});
              $(this).siblings().css({'visibility':'visible'});
              $(this).parent().siblings().children('.progress_timeline_item_phase').css({'visibility':'hidden'});
              $(this).parent().siblings().children('.progress_timeline_item_date').css({'visibility':'hidden'});
            });

            $('.progress_timeline_bar').hover(function(){
              // $(this).css({'background-color':'black'});
              $(this).siblings().css({'visibility':'visible'});
              $(this).parent().siblings().children('.progress_timeline_item_phase').css({'visibility':'hidden'});
              $(this).parent().siblings().children('.progress_timeline_item_date').css({'visibility':'hidden'});
            });
        });
    </script>

</body>

</html>
