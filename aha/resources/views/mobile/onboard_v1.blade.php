
@extends('template.mobile')
@section('title','Onboard version 1')
@section('content')
<div class="container p-0">
    <div class="row">
        <div class="col-md-12 onboard-illustration">
            
        </div>
    </div>
    <div class="row">
        <div class="col-md-12 onboard">
            <h2 class="onboard-title">Title</h2>
            <p class="onboard-content">Ahaa adalah aplikasi sosial media yang produktif dengan cara membagi ide ke orang lain dengan harapan melihat reaksi orang bagus atau tidak</p>
        </div>
    </div>
    <div class="row">
        <div class="col-md-4 col-md-offset-4 onboard-nav">
            <a><span class="onboard-nav-item active">
            </span></a>
            <a><span class="onboard-nav-item">
            </span></a>
            <a><span class="onboard-nav-item">
            </span></a>
            <a><span class="onboard-nav-item">
            </span></a>
        </div>
    </div>
    <div class="row action-btn-group">
        <div class="col-md-6 col-sm-6 col-xs-6 action-btn-container">
            <a class="action-btn action-btn-discover">jelajahi</a>
        </div>
        <div class="col-md-6 col-sm-6 col-xs-6 action-btn-container">
            <a class="action-btn action-btn-login">login</a>
        </div>
    </div>
</div>
@endsection
