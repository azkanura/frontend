$(function(){

// var $canvas = $("#canvas");
// var ctx = canvas.getContext("2d");
// canvas.width = $('.match-container').width();
// console.log(canvas.width);
// canvas.height = $('.match-container').height();
// console.log(canvas.height);
// ctx.lineWidth = 3;

// var canvasOffset = $canvas.offset();
// console.log(canvasOffset);
// var offsetX = canvasOffset.left;
// console.log('Canvas Offset X: '+offsetX);
// var offsetY = canvasOffset.top;
// console.log('Canvas Offset Y: '+offsetY);

var from;
$(document).on('click','.question',function(){
    from = $(this);
});

$(document).on('click','.answer',function(){
    var to = $(this);
    if(from){
        connect(from,to);
    }
});

// connect($('#0'),$('#1r'));

function connect(eFrom, eTo) {
    
        var pos1 = eFrom.offset();
        console.log(pos1);
        var pos2 = eTo.offset();
        console.log(pos2);
        var size1 = eFrom.size();
        var size2 = eTo.size();

        // ctx.beginPath();
        // ctx.moveTo(pos1.left + canvas.width*0.2326153846153846, (pos1.top + eFrom.height()/2));
        // ctx.moveTo(pos1.left + window.innerWidth*0.1992386530014641, (pos1.top + eFrom.height()/2));
        // console.log(pos1.left);
        //272.16
        //0.1992386530014641
        // console.log(eFrom.width());
        // console.log(window.innerWidth);
        // ctx.lineTo(pos2.left-116, (pos2.top + eTo.height()/2));
        // ctx.stroke();
        $('#connector').append('<line x1="0" y1="0" x2="200" y2="200" style="stroke:rgb(255,0,0);stroke-width:2" />');

}

});
