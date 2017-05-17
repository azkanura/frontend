$("#tentang-kami-2").click(function(){
	$("#konten-ttg-1").hide(1);
	$("#konten-ttg-3").hide(1);
    $("#konten-ttg-2").show(1);
});

$("#tentang-kami-3").click(function(){
	$("#konten-ttg-2").hide(1);
	$("#konten-ttg-1").hide(1);
    $("#konten-ttg-3").show(1);
});

$("#tentang-kami-1").click(function(){
	$("#konten-ttg-2").hide(1);
	$("#konten-ttg-3").hide(1);
    $("#konten-ttg-1").show(1);
});

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();   
});

$(document).ready(function(){
    $("#flip").click(function(){
        $("#panel").slideToggle(200);
    });
});

$(document).ready(function(){
    $("#flip2").click(function(){
        $("#panel2").slideToggle(200);
    });
});

$(document).ready(function(){
    $("#flip3").click(function(){
        $("#panel3").slideToggle(200);
    });
});

$(document).ready(function(){
    $("#btn-hover-donatur").click(function(){
        $(".hidden-donatur").slideToggle(200);
    });
});

$(document).ready(function(){
    $("#btn-hover-peserta").click(function(){
        $(".hidden-peserta").slideToggle(200);
    });
});