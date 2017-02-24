$(document).ready(function(){
	var index;
	var activeSlide = $('.slider_list_item.active');
	var leftArrow = $('.slider_arrow-left');
	var rightArrow = $('.slider_arrow-right');
	leftArrow.on('click',function(){
		if(activeSlide.prev()){
			activeSlide.hide('slide',{direction:'right'},100,function(){
				$(this).removeClass('active');
				$(this).prev().show("slide",{direction:"left",display:"inline-block"},100,function(){
					$(this).addClass('active');
				});
			});
		}
	});

	rightArrow.on('click',function(){
		if(activeSlide.next()){
			activeSlide.hide('slide',{direction:'left'},100,function(){
				$(this).removeClass('active');
				$(this).next().show("slide",{direction:"right",display:"inline-block"},100,function(){
					$(this).addClass('active');
				});
			});
		}
	});
});
