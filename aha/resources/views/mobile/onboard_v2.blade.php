@extends('template.mobile')
@section('title','Onboard version 2')
@section('content')
<div class="container mobile p-0">
    <div class="row illustration-container">
        <div class="col-xs-8 col-xs-offset-2">
            <img class="img-onboard" src="{{asset('public/img/illustration.svg')}}">
        </div>
    </div>
    <div class="row">
        <div class="col-xs-10 col-xs-offset-1">
            <h2 class="onboard-title">Sosial Media Produktif</h2>
            <p class="onboard-content">Terlalu banyak ide di pikiranmu? <br>Ahaa! Yuk jadi lebih produktif dengan berdiskusi bersama temanmu.</p>
        </div>
    </div>
    <div class="row  onboard-nav">
        <div class="col-md-4 col-md-offset-4">
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
    <div class="row">
        <div class="col-xs-10 col-xs-offset-1">
            <a class="action-btn-v2 action-btn-login-v2 block">login</a>
        </div>
    </div>
    <div class="row p-b-10">
        <div class="col-xs-10 col-xs-offset-1">
            <a class="action-btn-v2 action-btn-discover-v2 round block">jelajahi</a>
        </div>
    </div>
</div>
@endsection
