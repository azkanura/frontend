@extends('template.app')
@section('title','Ahaa')
@section('content')
<div class="onboard_header">
	<img class="onboard_icon" src="{{asset('public/img/aha_icon.svg')}}">
</div>
<div class="slider">
	<div class="slider_list">
		<div class="slider_list_item onboard">
			<div class="container-fluid">
				<div class="row">
					<div class="col-md-5 col-md-offset-2 col-sm-6 col-xs-12">
						<h1 class="onboard_title">Social Media Produktif</h1>
						<p class="onboard_content">Terlalu banyak ide di pikiranmu? <br>Ahaa! Yuk jadi lebih produktif dengan berdiskusi bersama temanmu.</p>
						<div class="row">
							<div class="col-md-12">
								<a class="btn-primary onboard_action_btn" style="">Login</a>
								<span class="onboard_action_text" style="">Don’t have account?<a class="onboard_action_text_link"> Create Here</a></span>
							</div>
						</div>
					</div>
					<div class="col-md-3 col-sm-6" class="onboard_illustration_container">
						<img class="onboard_illustration" src="{{asset('public/img/illustration-big.svg')}}" >
					</div>
				</div>
			</div>
		</div>
		<div class="slider_list_item onboard">
			<div class="container-fluid">
				<div class="row">
					<div class="col-md-5 col-md-offset-2 col-sm-6 col-xs-12">
						<h1 class="onboard_title">Social Media Produktif</h1>
						<p class="onboard_content">Terlalu banyak ide di pikiranmu? <br>Ahaa! Yuk jadi lebih produktif dengan berdiskusi bersama temanmu.</p>
						<div class="row">
							<div class="col-md-12">
								<a class="btn-primary onboard_action_btn" style="">Login</a>
								<span class="onboard_action_text" style="">Don’t have account?<a class="onboard_action_text_link"> Create Here</a></span>
							</div>
						</div>
					</div>
					<div class="col-md-3 col-sm-6" class="onboard_illustration_container">
						<img class="onboard_illustration" src="{{asset('public/img/illustration-big.svg')}}" >
					</div>
				</div>
			</div>
		</div>
		<div class="slider_list_item onboard">
			<div class="container-fluid">
				<div class="row">
					<div class="col-md-5 col-md-offset-2 col-sm-6 col-xs-12">
						<h1 class="onboard_title">Social Media Produktif</h1>
						<p class="onboard_content">Terlalu banyak ide di pikiranmu? <br>Ahaa! Yuk jadi lebih produktif dengan berdiskusi bersama temanmu.</p>
						<div class="row">
							<div class="col-md-12">
								<a class="btn-primary onboard_action_btn" style="">Login</a>
								<span class="onboard_action_text" style="">Don’t have account?<a class="onboard_action_text_link"> Create Here</a></span>
							</div>
						</div>
					</div>
					<div class="col-md-3 col-sm-6" class="onboard_illustration_container">
						<img class="onboard_illustration" src="{{asset('public/img/illustration-big.svg')}}" >
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
@endsection