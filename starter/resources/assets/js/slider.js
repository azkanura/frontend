$(document).ready(function(){
	var idx=0;
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
		var currentSlide=$('.slider_list_item[data="'+idx+'"]');
		currentSlide.hide('slide',{direction:'right',height:'100%'},100);
		// currentSlide.toggle('slide');
		// currentSlide.fadeOut('fast');
		currentSlide.removeClass('active');
		targetSlide.show('slide',{direction:'left',height:'100%'},100);
		// targetSlide.toggle('slide');
		// targetSlide.fadeIn('slow');

		targetSlide.css('display','inline-block');
		targetSlide.addClass('active');
		$(this).addClass('active');
		$(this).siblings().removeClass('active');
		idx=targetSlide.attr('data');
		console.log(idx);
	});

	leftArrow.click(function(){
		var currentSlide=$('.slider_list_item[data="'+idx+'"]');
		if(currentSlide.prev().length){
			targetIdx = idx-1;
			var targetSlide=$('.slider_list_item[data="'+targetIdx+'"]');
			currentSlide.hide('slide',{direction:'right',height:'100%'},100);
			// currentSlide.toggle('slide');
			// currentSlide.fadeOut('fast');
			currentSlide.removeClass('active');
			targetSlide.show('slide',{direction:'left',height:'100%'},100);
			// targetSlide.toggle('slide');
			// targetSlide.fadeIn('slow');

			targetSlide.addClass('active');
			var navActive=$('.slider_nav_item[data-slide="#'+targetSlide.attr('id')+'"]');
			navActive.siblings().removeClass('active');
			navActive.addClass('active');
			--idx;
		}
	});

	rightArrow.click(function(){
		var currentSlide=$('.slider_list_item[data="'+idx+'"]');
		if(currentSlide.next().length){
			targetIdx = idx+1;
			var targetSlide=$('.slider_list_item[data="'+targetIdx+'"]');
			currentSlide.hide('slide',{direction:'left',height:'100%'},100);
			// currentSlide.toggle('slide');
			// currentSlide.fadeOut('fast');
			currentSlide.removeClass('active');
			targetSlide.show('slide',{direction:'right',height:'100%'},100);
			// targetSlide.toggle('slide');
			// targetSlide.fadeIn('slow');

			targetSlide.addClass('active');
			var navActive=$('.slider_nav_item[data-slide="#'+targetSlide.attr('id')+'"]');
			navActive.siblings().removeClass('active');
			navActive.addClass('active');
			++idx;
		}
	});


	
	// leftArrow.on('click',function(){
	// 	if(activeSlide.prev().length!=0){
	// 		activeSlide.hide('slide',{direction:'right'},1000);
	// 		activeSlide.removeClass('active');
	// 		activeSlide.prev().show("slide",{direction:"left",display:"inline-block"},1000);
	// 		activeSlide.prev().addClass('active');
	// 	}
	// 	console.log(activeSlide.prev().length);
	// });

	// rightArrow.on('click',function(){
	// 	if(activeSlide.next().length!=0){
	// 		activeSlide.hide('slide',{direction:'left'},1000);
	// 		activeSlide.removeClass('active');
	// 		activeSlide.next().show("slide",{direction:"right",display:"inline-block"},1000);
	// 		activeSlide.next().addClass('active');
	// 	}
	// 	console.log(activeSlide.next().length);
	// });
});
