$(function(){

var $canvas = $("#canvas");
var ctx = canvas.getContext("2d");
canvas.width = $('.match-container').width();
// console.log(canvas.width);
canvas.height = $('.match-container').height();
// console.log(canvas.height);
ctx.lineWidth = 3;

var canvasOffset = $canvas.offset();
// console.log(canvasOffset);
var offsetX = canvasOffset.left;
// console.log('Canvas Offset X: '+offsetX);
var offsetY = canvasOffset.top;
// console.log('Canvas Offset Y: '+offsetY);

var from;
var lines = [];

$(document).on('click','.question',function(){
    from = '#'+$(this).attr('id');
    $(from).siblings().removeClass('active');
    $(from).addClass('active');
});

$(document).on('click','.answer',function(){
    var to = '#'+$(this).attr('id');
    if(from){
        if(!doesToExist(to,lines).exist){
            if(doesFromExist(from,lines).exist){
                lines[doesFromExist(from,lines).index].to=to;
                console.log(lines);
                redraw(lines);
            }
            else{
                lines.push({from:from,to:to});
                console.log(lines);
                connect(from,to);
            }
            $(to).siblings().removeClass('active');
            $(to).addClass('active');
        }
    }
});

function redraw(lines){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(var i=0;i<lines.length;i++){
        connect(lines[i].from,lines[i].to);
    }
}

function doesFromExist(from,lines){
    for(var i=0;i<lines.length;i++){
        if(from==lines[i].from){
            console.log(from==lines[i].from);
            return {exist:true,index:i};
        }
    }
    return {exist:false,index:-1};
}

function doesToExist(to,lines){
    for(var i=0;i<lines.length;i++){
        if(to==lines[i].to){
            console.log(to,lines[i].to);
            return {exist:true,index:i};
        }
    }
    return {exist:false,index:-1};

}
// connect($('#0'),$('#1r'));

function connect(eFrom, eTo) {
        var pos1 = $(eFrom).offset();
        // console.log(pos1);
        var pos2 = $(eTo).offset();
        // console.log(pos2);
        var size1 = $(eFrom).size();
        var size2 = $(eTo).size();

        ctx.beginPath();
        // ctx.moveTo(pos1.left + canvas.width*0.2326153846153846, (pos1.top + eFrom.height()/2));
        ctx.moveTo(pos1.left + window.innerWidth*0.1992386530014641, (pos1.top + $(eFrom).height()/2));
        // console.log(pos1.left);
        //272.16
        //0.1992386530014641
        // console.log(eFrom.width());
        // console.log(window.innerWidth);
        ctx.lineTo(pos2.left-116, (pos2.top + $(eTo).height()/2));
        ctx.stroke();
}
});