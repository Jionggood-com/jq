;(function($){
    $.fn.JiongCaptcha = function(options){
        var x, JiongSlide = this, isMove = false, defaults = {};
        var options = $.extend(defaults, options);
        JiongSlide.find('.init').remove();
		 //添加背景，文字，滑块
        var html = '<div class="captcha_bg"></div>'+
                    '<div class="captcha_text" onselectstart="return false;" unselectable="on"><span>'+Captcha_text+'</span></div>'+
                    '<div class="handler"><span class="bg"></span></div>';
        this.append(html);
        var handler = JiongSlide.find('.handler');
        var JiongSlide_bg = JiongSlide.find('.captcha_bg');
        var text = JiongSlide.find('.captcha_text');
        var maxWidth = JiongSlide.width() - handler.width(); //能滑动的最大间距
    	//鼠标按下时候的x轴的位置
        handler.mousedown(function(e){
            isMove = true;
            x = e.pageX - parseInt(handler.css('left'), 10);
			handler.css("cursor","move");
        });
		
		//鼠标指针在上下文移动时，移动距离大于0小于最大间距，滑块x轴位置等于鼠标移动距离
        $(document).mousemove(function(e){
            var _x = e.pageX - x;
            if(isMove){
                if(_x > 0 && _x <= maxWidth){
                    handler.css({'left': _x});
                    JiongSlide_bg.css({'width': _x});
                }else if(_x > maxWidth){ //鼠标指针移动距离达到最大时清空事件
                    JiongSlideOk();
                }
            }
        }).mouseup(function(e){
            isMove = false;
            var _x = e.pageX - x;
            if(_x < maxWidth){ //鼠标松开时，如果没有达到最大距离位置，滑块就返回初始位置
                handler.css({'left': 0});
                JiongSlide_bg.css({'width': 0});
            }
        });
        
		//清空事件
        function JiongSlideOk(){
			handler.css({'left': maxWidth});
           	JiongSlide_bg.css({'width': maxWidth});
			text.html('<span style="color:#ffffff;margin:0 40px 0 0;">Loading</span>');
			setTimeout(function(){
				handler.addClass('handler_ok_bg');
				text.addClass('captcha_yes_text')
				handler.css("cursor","default");
				text.html('<span data-ok-lang="_yes">'+Captcha_ok_text+'</span>');
				JiongSlide.css({'color':'#ffffff'});
				handler.off('mousedown');
				$(document).off('mousemove');
				$(document).off('mouseup');
			},1500);
        }
    };
})(jQuery);


