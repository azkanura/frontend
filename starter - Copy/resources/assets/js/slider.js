$(document).ready(function(){
	var idx=0;
	$('.slider').append('<div class="slider_nav"></div><span class="slider_arrow slider_arrow-left"></span><span class="slider_arrow slider_arrow-right"></span>');
	
	var activeSlide = $('.slider_list_item.active');
	var leftArrow = $('.slider_arrow-left');
	var rightArrow = $('.slider_arrow-right');
	var slide = $('.slider_list_item');
	var nav = $('.slider_nav');

	slide.each(function(index){
		$(this).attr('id','slide'+index);
		$(this).attr('data',index);
		if(index==0){
			$(this).addClass('active');
			nav.append('<a class="slider_nav_item active" data-slide="#slide'+index+'"></a>');
		}
		else{
			nav.append('<a class="slider_nav_item" data-slide="#slide'+index+'"></a>');
		}
	});

	var navItem = $('.slider_nav_item');


	navItem.click(function(){
		var targetSlide=$($(this).attr('data-slide'));
		console.log(targetSlide);
		if(targetSlide.attr('data')!=idx){
			var currentSlide=$('.slider_list_item[data="'+idx+'"]');
			currentSlide.hide('slide',{direction:'right',height:'100%'},200);
			currentSlide.removeClass('active');
			targetSlide.show('slide',{direction:'left',height:'100%'},200);
			targetSlide.css('display','inline-block');
			targetSlide.addClass('active');
			$(this).addClass('active');
			$(this).siblings().removeClass('active');
			idx=parseInt(targetSlide.attr('data'));
			console.log(idx);
		}
	});

	leftArrow.click(function(){
		var currentSlide=$('.slider_list_item[data="'+idx+'"]');
		if(currentSlide.prev().length){
			targetIdx = parseInt(idx)-1;
			var targetSlide=$('.slider_list_item[data="'+targetIdx+'"]');
			currentSlide.hide('slide',{direction:'right',height:'100%'},200);
			currentSlide.removeClass('active');
			targetSlide.show('slide',{direction:'left',height:'100%'},200);
			targetSlide.addClass('active');
			var navActive=$('.slider_nav_item[data-slide="#'+targetSlide.attr('id')+'"]');
			navActive.siblings().removeClass('active');
			navActive.addClass('active');
			idx=parseInt(idx)-1;
			console.log(idx);
		}
	});

	rightArrow.click(function(){
		var currentSlide=$('.slider_list_item[data="'+idx+'"]');
		if(currentSlide.next().length){
			targetIdx = parseInt(idx)+1;
			var targetSlide=$('.slider_list_item[data="'+targetIdx+'"]');
			currentSlide.hide('slide',{direction:'left',height:'100%'},200);
			currentSlide.removeClass('active');
			targetSlide.show('slide',{direction:'right',height:'100%'},200);
			targetSlide.addClass('active');
			var navActive=$('.slider_nav_item[data-slide="#'+targetSlide.attr('id')+'"]');
			navActive.siblings().removeClass('active');
			navActive.addClass('active');
			idx=parseInt(idx)+1;
			console.log(idx);
		}
	});
});
