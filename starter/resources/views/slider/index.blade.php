@extends('template.app')
@section('title','slider')
@section('content')
<div class="slider">
	<ul class="slider_list">
		<li class="slider_list_item">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<h1 class="text-center">Huplaa</h1>
					</div>
				</div>
			</div>
		</li>
		<li class="slider_list_item active">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<h1 class="text-center">iplee</h1>
					</div>
				</div>
			</div>
		</li>
		<li class="slider_list_item">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<h1 class="text-center">Hokyaaa</h1>
					</div>
				</div>
			</div>
		</li>
	</ul>

	<ul class="slider_nav">
		<li class="slider_nav_item active">
		</li>
		<li class="slider_nav_item">
		</li>
		<li class="slider_nav_item">
		</li>
	</ul>


	<span class="slider_arrow slider_arrow-left"></span>
	<span class="slider_arrow slider_arrow-right"></span>

</div>
@endsection