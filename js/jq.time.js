(function($){
	$.fn.timeGo = function(options) {        
		var opts = $.extend({},$.fn.timeGo.defaults, options);         
		return this.each(function() {                                                     
			$this = $(this);
			var sysSecond,interValObj;
			var $mainSeconds=$(opts.mainSeconds,$this);
			var $mainTime=$(opts.mainTimeShow,$this);
			var $message=$(opts.message,$this);
			var $day=opts.day;
			var $ms=opts.ms;
			var callBackFunction=opts.callBackFunction;
			var n=10;
			if($ms=="0"){n=1;}
			sysSecond = parseInt($mainSeconds.html())*n;
			interValObj = window.setInterval(setRemainTime, 1000/n);
			function setRemainTime()
			{
				sysSecond = sysSecond - 1;
				var msecond = Math.floor(sysSecond % 10);       
				var second = Math.floor(sysSecond / n % 60);
				var minite = Math.floor((sysSecond / n /60) % 60);      
				var hour = Math.floor((sysSecond / n / 3600) % 24);      
				var day = Math.floor((sysSecond / n / 3600) / 24);        
				if (sysSecond >= 0)
				{
					if (second>=0&&second<10) {second="0"+second};
					if (day>=0&&day<10) {day="0"+day};
					if (hour>=0&&hour<10) {hour="0"+hour};
					if (minite>=0&&minite<10) {minite="0"+minite};
					var dayhtml="";
					if ($day=="1"){dayhtml="<span class='day'>" + day + "</span><i>:</i>"}
						
					
					if($ms=="0"){
						$mainTime.html(dayhtml+"<span class='hour'>" + hour + "</span><i>:</i><span class='mini'>" + minite + "</span><i>:</i><span class='sec'>" + second + "</span>");
						}
						else if($ms=="1")
						{
						$mainTime.html(dayhtml+"<span class='hour'>" + hour + "</span><i>:</i><span class='mini'>" + minite + "</span><i>:</i><span class='sec'>" + second + "<b class='msec'>." + msecond + "</b></span>");
						}
						else
						{
							$mainTime.html(dayhtml+"<span class='day'>" + day + " days</span> <span class='hour'>" + hour + " hours</span> <span class='mini'>" + minite + " minutes</span> <span class='sec'>" + second + " seconds</span>");	
						}
				}
				else if (sysSecond == -1){}
				else
				{
					//鍓╀綑鏃堕棿灏忎簬鎴栫瓑浜�0鐨勬椂鍊欙紝灏卞仠姝㈤棿闅斿嚱鏁�
					window.clearInterval(interValObj);
					if(typeof callBackFunction == "function")callBackFunction($this,$message);
				}
			}
		});
	};

    
	$.fn.timeGo.defaults = {
	  mainSeconds:".remainSeconds",//鍓╀綑鏃堕棿鑾峰彇瀵硅薄
	  mainTimeShow:".remainTime",//鏃堕棿鏄剧ず鍖哄煙瀵硅薄
	  message:'.timeMessage',//鏃堕棿缁撴潫鍚庣殑淇℃伅鏄剧ず瀵硅薄
	  ms:'0',
	  day:'1',
	  callBackFunction:''
	};     

})(jQuery);

//callBackFunction:function(element,msg){msg.show();}