@extends ('template.app')
@section ('content')
    <div class="section-title">
        Pilih Kategori:
        <a class="section-close">

        </a>
    </div>
    <ul class="category-list">
        <li class="list-item category"><a><span class="icon-sub" style="background-image: url('{{url('public/img/sprite.png')}}')"></span>Batu Cincin</a></li>
        <li class="list-item category"><a><span class="icon-sub" style="background-image: url('{{url('public/img/sprite.png')}}')"></span>Buku</a></li>
        <li class="list-item category"><a><span class="icon-sub" style="background-image: url('{{url('public/img/sprite.png')}}')"></span>Elektronik</a></li>
        <li class="list-item category"><a><span class="icon-sub" style="background-image: url('{{url('public/img/sprite.png')}}')"></span>Elektronik</a></li>
    </ul>
@endsection