	var loginRefresh = true;

	$(document).on("focus",".inputchang",function(){if($(this).val()==$(this).attr("dvalue")){$(this).css("color","#000000").val("");}});
	$(document).on("blur",".inputchang",function(){if($(this).val()==''){$(this).css("color","#cccccc").val($(this).attr("dvalue"));}});

	function msgbox(i,j,k){
		$('.modal_container').append("<div class='modal_msgbox'><div class='modal_msgbox_msg'>"+j+"</div><div class='modal_msgbox_button'></div></div>");
		if(i==0)$('.modal_container .modal_msgbox_button').append("<span class='button_ok' onclick='modal_remove();'>OK</span>");
		if(i==1)
		{
			$('.modal_container .modal_msgbox_button').append("<span class='button_yes'>" + LANGUAGE.LP_YES +"</span><span class='button_no' onclick='modal_remove();'>" + LANGUAGE.LP_CANCEL +"</span>");
			$(document).off("click",".button_yes").on("click",".button_yes",function(){k();});
		}
		modal_add();
	};
	
	function checkboxClick(chk){
		if($(chk).hasClass('checkbox_off_active') || $(chk).attr('disabled') == 'disabled'){
			return false;
		}
		if($(chk).hasClass('checkbox_on')){
			$(chk).removeClass('checkbox_on');
			$(chk).addClass('checkbox_on_active');
		}else{
			$(chk).removeClass('checkbox_on_active');
			$(chk).addClass('checkbox_on');	
		}
	}
	$(document).on("click",".checkbox_on",function(){
		checkboxClick(this);
	});

	$(document).on("click",".checkbox_on_active",function(){
		checkboxClick(this);
	});
	$(document).on("click",".inputbox",function(){$(this).find(".tips").hide(200,function(){$(this).find(".tips").remove();});});
	
	$(document).on("mouseenter",".tipsbox",function(){$(this).find(".tipsbox_con").css({"bottom":$(this).height()+20}).stop().show(200);});
	$(document).on("mouseleave",".tipsbox",function(){$(this).find(".tipsbox_con").stop().hide();});
	
	$(document).on("click",".error_common",function(){$(this).remove();});
	
	function inputNotice(obj, msg, type){
		var typee = '';
		if(typeof(type) == 'undefined'){
			type = false;	
		}
		if(type == true){typee = " tips_ok";}
		obj.after('<span class="tips'+ typee +'"><i></i>'+ msg +'</span>');	
	}
	
	function delInputNotice(input){
		input.nextAll('.tips').remove();	
	}
	
	
	$(window).scroll(function(){
		if($(window).scrollTop()>300){
			$(".totop_button").slideDown(200);
		}else{
			$(".totop_button").slideUp(200);
		}
	});
	$(".totop_button").click(function(){
		$("html,body").animate({ scrollTop:0});
	});
	
    $('a[href*=#],area[href*=#]').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var $target = $(this.hash);
            $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
            if ($target.length) {
                var targetOffset = $target.offset().top;
                $('html,body').animate({
                    scrollTop: targetOffset
                },
                300);
                return false;
            }
        }
    });
	
	$(document).on("blur", "#minireg .inputbox .userpwd", function(){
		if($(this).val().length < 1)
		{
			$(this).siblings(".pwdtip").show();
		}
	});
	
	$(document).on("click", "form#minireg .inputbox", function(){
		if($(this).find(".pwdtip").length>0){
			$(this).find(".pwdtip").hide();
			$(this).find(".userpwd").focus();
		}
	});
	
	var zValidate = {};
	zValidate.email = function(email){
		var myreg = /^[\w-']+([\.\+][\w-']+)*@([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*?\.[a-zA-Z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
		return myreg.test(email.replace(/(^\s*)|(\s*$)/g, ""));
	};
	
	zValidate.int = function(int){
		var myreg = /^[0-9]*[1-9][0-9]*$/;
		return myreg.test(int);
	};
	zValidate.float = function(float){
		var myreg = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
		return myreg.test(float);
	};
	zValidate.url = function(url){
		var myreg = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
		return myreg.test(url);
	};
	
	zValidate.password = function(password){
		var myreg = /^(.*){6,}$/;
		return myreg.test(password);
	};
	zValidate.creditMonth = function(month){
		month = parseInt(month);
		if(isNaN(month) || month < 1 || month > 12){
			return false;	
		}
		return true;
	};
	zValidate.creditYear = function(year){
		year = parseInt(year);
		if(isNaN(year) || year < 14 ||  year > 99){
			return false;	
		}
		return true;
	};
	zValidate.cardNumber = function(ccNumb){


		ccNumb = ccNumb.replace(/\s/g, '');
		var LuhnDigit = parseInt(ccNumb.substring(ccNumb.length-1, ccNumb.length));
		var LuhnLess = ccNumb.substring(0,ccNumb.length-1);
		
		if (zValidate.calculateCard(LuhnLess) == parseInt(LuhnDigit)) {
			return true;
		}	
		
		return false;	
	};
	zValidate.calculateCard = function(Luhn){
		var sum = 0;
		for (i=0; i<Luhn.length; i++ ) {
			sum += parseInt(Luhn.substring(i,i+1));
		}
		
		var delta = new Array (0, 1, 2, 3, 4, -4, -3, -2, -1, 0);
		for (i=Luhn.length-1; i>=0; i-=2 ) {		
			var deltaIndex = parseInt(Luhn.substring(i, i + 1));
			var deltaValue = delta[deltaIndex];	
			sum += deltaValue;
		}	
	
		var mod10 = sum % 10;
		mod10 = 10 - mod10;	
		
		if (mod10 == 10) {		
			mod10 = 0;
		}
		
		return mod10;
	};
	
	function tabs(tabTit,type){
		 $(document).on(type,tabTit,function(){
			$(this).addClass("active").siblings().removeClass("active").parent().next().children().eq($(this).index()).show().siblings().hide();
		});
	}
	
	
	if($(".pull_category").length>0)
	{
		$(".nav .nav_title").hover(
			function(){
				$(".pull_category").show();						   
			},
			function(){						   
			}				   
		);
		$(".pull_category").hover(
			function(){				   
			},
			function(){	
				$(this).hide();
			}				   
		);
	}
	
	$(".category_now dt b").click(function(){
		if($(this).parent().hasClass("cur")){
			$(this).parent().removeClass("cur");
			$(this).parent().next().hide();
		}else{
			$(this).parent().addClass("cur").parent().siblings().find("dt").removeClass("cur");
			$(this).parent().next().show().parent().siblings().find("ul").hide();
		};
	});

	$(".nav_category ul")
		.click(function(event){
			 if($(".nav_category_list").is(":hidden"))
			 {
			 	$(".nav_category_list").show();
			 }
			 else
			 {
			 	$(".nav_category_list").hide();
			 }
			$("body").one("click",function(){
				$(".nav_category_list").hide();
			});
			event.stopPropagation();
		});
	$(".nav_category_list")
		.click(function(event){
			event.stopPropagation();
		});
	
	$(".nav_category_list dd")
		.click(function(){
			$(this).addClass("on").siblings().removeClass("on");
			$(".nav_category input[name='cat_id']").val($(this).attr("cid"));
			$(".nav_category li:first-child").html($(this).html());
			$(".nav_category_list").hide();
			$(".nav_category").css("width",$(".nav_category ul").outerWidth()+45);
			$(".nav_search .keyword").css("width",555+110-$(".nav_category ul").outerWidth());
			$(".nav_search .quick_tips").css("width",555+110-$(".nav_category ul").outerWidth()+21);
		});
		
	$(".cate_direct_list a").hover(
		function(){
			$(this).children("i").animate({"top":"10px"});
			$(this).siblings().children("i").animate({"top":"0"});
		},
		function(){
			$(this).children("i").animate({"top":"0"});
		}
	);

	$(".nav_layer_close").mouseenter(function(){
			$(".nav_category_list").hide();
			$(".nav_search .quick_tips").hide();
	});
	
	$(".nav_cart").hover(
			function(){
				$(".nav_cart_box").show();
			},
			function(){
				$(".nav_cart_box").hide();
			}
	);
	
	
	function check_wish_flag(){
		if($(".nav_right").length > 0)
		{
			var wish_text = $(".nav_right .nav_wish s").text();
			var wish_userwish = $(".nav_right .nav_wish span").text();
			var wish_attr = wish_text + "(" + wish_userwish + ")";
			var wish_str = $(".nav_right .nav_wish s").text().length;
			var wish_flag = $(".nav_right .nav_wish span").text().length;
			if(wish_str > 8)
			{
				$(".nav_right .nav_wish a").addClass("ru");
				if(wish_flag > 1)
				{
					$(".nav_right .nav_wish s").addClass("limit");
					$(".nav_right .nav_wish a").attr("title",wish_attr);
				}
			}
		}
	}
	function txtHighLight(text, keywords){
		if(typeof(text) == 'undefined' || text.length == 0){
			return false;
		}
		if(typeof(keywords) == 'undefined' || keywords.length == 0){
			return false;
		}
		var arr = keywords.split(' ');
		for(var i = 0; i < arr.length; i++){
			var word = arr[i];
			var reg = '/'+word+'/';
			var rep = '<b>'+word+'</b>';
			eval("text = text.replace("+reg+", '"+rep+"');");
		}
		return text;
	}
	
	$(".nav_category").css("width",$(".nav_category ul").outerWidth()+45);
	$(".nav_search .keyword").css("width",555+110-$(".nav_category ul").outerWidth());
	$(".nav_search .quick_tips").css("width",555+110-$(".nav_category ul").outerWidth()+18);
	$(".nav_search .keyword")
		.click(function(event){
			var $_this=$(".nav_search .quick_tips");
			if($_this.html().length > 0){
				$_this.show();
				$("body").one("click",function(){
					$_this.hide();
				});	
			}
			event.stopPropagation();
		});
	
	$(document)
		.on("click",".nav_search .quick_tips li",function(){
			var url = $(this).attr('url');
			$(".nav_search .quick_tips").hide();
			var keywords = $(this).html().replace(/<u>(.*)<\/u>/ig, '');
			keywords = keywords.replace(/(<[a-z0-9\/]+>)+/ig, '');
			$(".nav_search .keyword").val(keywords).css("color","#000000");
			window.location.href=url;
		});
	$(document)
		.on("click",".nav_search .quick_tips li u",function(event){
			var $_this=$(".nav_search .quick_tips");
			$_this.show();
			if($(this).parent().hasClass("clearhistory")){
				$_this.hide().empty();
				var data = 'com=ajax&t=clearSearchHistory';
			}else{
				var keywords = $(this).parent().html().replace(/<u>(.*)<\/u>/ig, '');
				keywords = keywords.replace(/(<[a-z0-9\/]+>)+/ig, '');
				var data = 'com=ajax&t=deleteSearchHistory&keywords='+keywords;
				$(this).parent().remove();
			};
			$("body").one("click",function(){
				$_this.hide();
			});
			event.stopPropagation();
			/*$.ajax({
				url:homeUrl+'index.php',
				timeout : 10000,
				type : 'get',
				data :data,
				dataType:'html',
				success:function(res){
					loadHeadKeywords();
					check_search_keyword();
				}   
			});*/
		});
	if($(".nav_search .keyword").length>0){
		if(!($(".nav_search .keyword").val().toLowerCase()==$(".nav_search .keyword").attr("dvalue").toLowerCase()))
		{
			$(".nav_search .keyword").val(keywords).css("color","#000000");
		}	
		$(".nav_search form").submit(function(){
			if($(this).find(".keyword").eq(0).val().toLowerCase()==$(this).find(".keyword").eq(0).attr("dvalue").toLowerCase())
			{
				$(this).find(".keyword").eq(0).focus();
				return false;
			}								  
		});
	}
	
	$(".nav_search .keyword")
		.keyup(function(event){
			var $this = $(".nav_search .quick_tips ul");
			if(!$this.is(":hidden"))
			{		
				var keys = {
					UP: 38,
					DOWN: 40,
					PAGEUP: 33,
					PAGEDOWN: 34
				};
				var kc = event.keyCode;
				if (kc == keys.UP || kc == keys.PAGEUP)
				{
					if($this.find("li:first.active").length==1 || $this.find("li.active").length==0){
						$this.children().removeClass("active").last().addClass("active");
					}else{
						$this.find("li.active").removeClass("active").prev().addClass("active");	
					}
					var keywords = $this.find("li.active").html().replace(/<u>(.*)<\/u>/ig, '');
					keywords = keywords.replace(/(<[a-z0-9\/]+>)+/ig, '');
					$(this).val(keywords);
				}	
				if (kc == keys.DOWN || kc == keys.PAGEDOWN)
				{
					if($this.find("li:last.active").length==1 || $this.find("li.active").length==0)
					{
						$this.children().removeClass("active").first().addClass("active");
					}else{
						$this.find("li.active").removeClass("active").next().addClass("active");	
					}
					var keywords = $this.find("li.active").html().replace(/<u>(.*)<\/u>/ig, '');
					keywords = keywords.replace(/(<[a-z0-9\/]+>)+/ig, '');
					$(this).val(keywords);
				}	
			}								 
		});
		
		function check_propertychange(o){
			var _this = $(o);
			var i=-1;
			var emailList = _this.parent().find(".add_email_tips");
			var emailDomain = ["gmail.com","hotmail.com","yahoo.com","mail.ru","aol.com","hotmail.co.uk","live.com","msn.com","yandex.ru","hotmail.fr"];
			var val = _this.val();
			var inputEmail = (val.indexOf('@') != -1) ? val.split('@')[0] : val;
			emailList.empty().removeClass("add_email_tips_active");
			for(var i=0;i<emailDomain.length;i++){
				var myEmail = inputEmail + "@" + emailDomain[i];
				if (myEmail.indexOf(val) != -1) {
					_this.parent().find(".add_email_tips").addClass("add_email_tips_active");
					_this.parent().find(".add_email_tips").append("<li>" + myEmail + "</li>");
				}
			};
			emailList.find("li").click(function(){
				var val = $(this).text();
				_this.val(val).focus();
				emailList.empty().removeClass("add_email_tips_active");
			});
			
			$(document).click(function(event){
				if(!$(event.target).parents(".add_my_emailbox").length > 0)
				{
					setTimeout(function(){
						$(".add_email_tips").empty().removeClass("add_email_tips_active");
					},200);	
				}
			});
		}
		function add_email_tips(){
			$("#minilogin li input.username").parent().addClass("add_my_emailbox");
			$("#minireg li input.username").parent().addClass("add_my_emailbox");
			$("#minilogin li input.username").after('<ul class="add_email_tips"></ul>');
			$("#minireg li input.username").after('<ul class="add_email_tips"></ul>');
			$("#minireg li input.username").parent().css("z-index","2");
			$("#minilogin li input.username").on("input propertychange",function(){ 
				check_propertychange(this);
			});
			$("#minireg li input.username").on("input propertychange",function(){ 
				check_propertychange(this);
			});
		}
		add_email_tips();
		//
		$(document).on("keyup","#minilogin li input.username, #minireg li input.username",function(event){
			var keys = {
				UP: 38,
				DOWN: 40,
				PAGEUP: 33,
				PAGEDOWN: 34
			};
			var kc = event.keyCode;
			var _this = $(this).parent().find(".add_email_tips");
			if (kc == keys.UP || kc == keys.PAGEUP)
			{
				if(_this.find("li.active").length==0)
				{
					_this.find("li:last").addClass("active");
				}
				else
				{
					_this.find("li.active").removeClass("active").prev().addClass("active");	
				}
			}	
			if (kc == keys.DOWN || kc == keys.PAGEDOWN)
			{
				if(_this.find("li.active").length==0)
				{
					_this.find("li:first").addClass("active");
				}
				else
				{
					_this.find("li.active").removeClass("active").next().addClass("active");	
				}
			}
			});
		
		function login(pannel){
			var url = homeUrl+'login.html';
			
			if('https' != document.location.protocol){
				var url = url.replace('http://', 'https://')
			} 
			
			if(pannel != undefined){
				url = url+'?pannel='+pannel;
			}
			window.location.href=url;
		};
		
		function submitLoginPannel(form){
			var method = $(form).attr('method').toLowerCase();
			method = method == 'post' ? 'post' : 'get';
			var com = $(form).attr('com');
			var task = $(form).attr('task');
			var data = 'com='+com+'&t='+task;
			var validate = true;
			//Validate repeat submit
			if($(form).find('input:submit').eq(0).parent().hasClass('gray')){
				return false;	
			}
			//add_email_tips
			if($(form).find('.add_email_tips li').length>0)
			{
				var val = $(form).find('.add_email_tips li.active').text();
				$(form).find('li input.username').val(val).focus();
				var val = $(form).find('.add_email_tips').empty().removeClass('add_email_tips_active');
				
				return false;
			}
			
			//validate
			$(form).find('.validate').each(function(){
				if(!validateInput(this)){
					validate = false;
				}
			});
			
			if(!validate){
				return false;
			}
			data += '&'+$(form).serialize();
			
			$(form).find('input:submit').eq(0).parent().addClass('gray');
			/*$.ajax({
				url:homeUrl+'index.php',
				timeout : 10000,
				type : method,
				data :data,
				dataType:'json',
				success:function(res){
					$(form).find('input:submit').eq(0).parent().removeClass('gray');
					if(res.success && loginRefresh){
						modal_remove();
						window.location.href=res.msg;
					}else if(res.success){
						modal_remove();
						validateLogin();
					}else{
						if(res.target){
							inputNotice($(form).find('input[name="'+res.target+'"]').eq(0), res.msg);
						}else{
							inputNotice($(form).find('input').eq(0), res.msg);
						}	
					}
				}   
			});*/
			return false;
		};
		
		function validateInput(input){
			var validate = true;
			var val = $(input).val();
			var dvalue = $(input).attr('dvalue');
			var type = $(input).attr('type');
			var rule = $(input).attr('rule');
			delInputNotice($(input));
			if(val==dvalue || val.length == 0){
				validate = false;
				var empty_msg = $(input).attr('empty_msg');
				if(typeof(empty_msg) == 'undefined'){
					empty_msg = $(input).attr('msg');
				}
				inputNotice($(input), empty_msg);
			}else{
				if(rule == 'email'){
					if(!zValidate.email(val)){
						validate = false;
						inputNotice($(input), $(input).attr('msg'));
					}
				}else if(rule == 'password'){
					if(!zValidate.password(val) || val.length<6){
						validate = false;
						inputNotice($(input), $(input).attr('msg'));
					}
				}else if(rule == 'name'){
						if(!zValidate.password(val) || val.length<5){
							validate = false;
							inputNotice($(input), $(input).attr('msg'));
						}
				}else if(rule == 'firstname'){
						if(!zValidate.password(val) || val.length < 3 || val.length > 33){
							validate = false;
							inputNotice($(input), $(input).attr('msg'));
						}
				}else if(rule == 'lastname'){
						if(!zValidate.password(val) || val.length < 2 || val.length > 33){
							validate = false;
							inputNotice($(input), $(input).attr('msg'));
						}
				}
				
				
				else{
					if(type == 'checkbox'){
						if(!$(input).is(':checked')){
							validate = false;
						}
					}else if(val.length == 0){
						validate = false;
					}
					if(!validate){
						inputNotice($(input), $(input).attr('msg'));
					}
				}
			}
			var equal = $(input).attr('equal');
			if(typeof(equal) != 'undefined' && equal.length > 0){
				if($('#'+equal).val() != val){
					validate = false;
					inputNotice($(input), $(input).attr('equal_msg'));
				}	
			}			
			return validate;
		}
		
		
		
		
		
		
		
function scroll_play(id,num){
	
	var oPlay=$(id);
	var oUl=oPlay.find('.scroll_box ul');
	var aLi2=oUl.find('li');
	var oOl=oPlay.find('ol');
	var aLi2_length = Math.ceil(aLi2.length/num);
	var aLi1;
	var oOl_='';
	for(var i=0; i<aLi2_length; i++)
	{
		oOl_=oOl_ + '<li><i></i></li>'
	}
	oOl.html(oOl_);
	aLi1=oOl.find('li');
	aLi1.eq(0).addClass('active');
	
	var i=iNum=0;
	var times=null;
	var div_width = aLi2.outerWidth(true);
	
	oUl.css({width: div_width * aLi2.length + 'px'});

	if(!IsPC()){
		oPlay.addClass("touchmove").find('.scroll_box').addClass("touchmove_box").css("height","auto");
		return false;
	}
	
	if(aLi2_length>1)
	{
		aLi1.click(function(){
			aLi1=oOl.find('li');
			if(aLi1.length>1)
			{
				iNum = $(this).index();
				if(iNum==aLi1.length-1)
				{
					oPlay.find('.btn_right').addClass("btn_off");
					oPlay.find('.btn_left').removeClass("btn_off");
				}
				else if(iNum==0)
				{
					
					oPlay.find('.btn_left').addClass("btn_off");
					oPlay.find('.btn_right').removeClass("btn_off");
				}
				else
				{
					oPlay.find('.btn_left').removeClass("btn_off");
					oPlay.find('.btn_right').removeClass("btn_off");
				}
				show();
			}
		});
		
	}
	else
	{
		oPlay.find('.btn_left').addClass("btn_off");
		oPlay.find('.btn_right').addClass("btn_off");
	}

	function show()
	{
		for(i=0;i<aLi1.length;i++)
		{
			aLi1[i].className='';
		}
		aLi1[iNum].className='active';
		doMove(-(iNum*div_width*num));
	}
	oPlay.find('.btn_right').click(function(){
		if($(this).hasClass("btn_off")){return false;}
		iNum = $(this).parent().find('ol').find('.active').index();
		iNum++;
		
		aLi1=oOl.find('li');

		if(iNum==aLi1.length-1)
		{
			oPlay.find('.btn_right').addClass("btn_off");
		}
		oPlay.find('.btn_left').removeClass("btn_off");
		show();
		
	});
	oPlay.find('.btn_left').click(function(){
		if($(this).hasClass("btn_off")){return false;}
		iNum = $(this).parent().find('ol').find('.active').index();
		iNum--;	
		
		if(iNum==0)
		{
			oPlay.find('.btn_left').addClass("btn_off");
			oPlay.find('.btn_right').removeClass("btn_off");
		}
		else
		{
			oPlay.find('.btn_left').removeClass("btn_off");
			oPlay.find('.btn_right').removeClass("btn_off");
		}
		show();
		
	});
	function doMove(iTarget)
	{
		oUl.stop();
		oUl.animate({marginLeft:iTarget+'px'},500,function(){												   
			$(window).scrollTop($(window).scrollTop()+1);	
			$(window).scrollTop($(window).scrollTop()-1);
		});
	}
}

function CycleScroll(id,num){
	var oPlay=$(id);
	var oUl=oPlay.find('.scroll_box ul');
	var oLilen=oUl.find("li").length;
	var oLiwidth=oUl.find("li").eq(0).outerWidth(true);
	if(!IsPC()){
		oPlay.addClass("touchmove").find('.scroll_box').addClass("touchmove_box").css("height","auto");
		oUl.width(oUl.find("li").eq(0).outerWidth(true) * oUl.find("li").length);
		return false;
	}
	oUl.width(oLiwidth*(oLilen+num));
	if(oLilen > parseInt($(oUl).parent().width()/oLiwidth))
	{
		oPlay.find('.btn_left').removeClass("btn_off");
		oPlay.find('.btn_right').click(function(){
			if(!oUl.is(":animated")){
				oUl.append(oUl.find("li:lt("+ num +")").clone());
				oUl.animate({marginLeft : -(oLiwidth * num) +"px"},500,function(){
					oUl.find("li:lt("+ num +")").remove();
					oUl.css({marginLeft:0});
					$(window).scrollTop($(window).scrollTop()+1);
					$(window).scrollTop($(window).scrollTop()-1);
				});
			}
		});
		oPlay.find('.btn_left').click(function(){
			if(!oUl.is(":animated")){
				var liarr = oUl.find("li:lt("+ (oLilen) +"):gt("+ (oLilen-num-1) +")");
				oUl.prepend(liarr.clone()).css("margin-left",-oLiwidth*num +"px");
				oUl.animate({marginLeft : 0},500,function(){
					liarr.remove();
					$(window).scrollTop($(window).scrollTop()+1);
					$(window).scrollTop($(window).scrollTop()-1);
				});
			}
		});
	}
	else
	{
		oPlay.find('.btn_left').addClass("btn_off");
		oPlay.find('.btn_right').addClass("btn_off");
	}
}

function IsPC()  
{  
           var userAgentInfo = navigator.userAgent;  
           var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
           var flag = true;
           for (var v = 0; v < Agents.length; v++) {  
               if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
           }  
           return flag;  
}




//page limit
$(document).on("keyup",".page_input",function(){
	var quantity = $(this).val();
	
	if(quantity.length == 1){
		this.value=this.value.replace(/[^1-9]/g,'');
		$(this).val($(this).val().replace(/[^1-9]/g,''));
	}else{
		this.value=this.value.replace(/\D/g,'');
		$(this).val($(this).val().replace(/\D/g,''));
	}
});

//price limit
function check_pfrom_pto(e)
{
	var val = $(e).val();	
	if(val.indexOf('.') > 0){
		if(val.substr(val.length-1, 1) == '.' && (val.length-1) != val.indexOf('.')){
			$(e).val(val.substr(0, val.length-1));
		}else{
			$(e).val(val.replace(/[^0-9\.]/g,''));
		}
	}else{
		$(e).val(val.replace(/[^0-9]/g,''));
	}	
}
$(document).on("keyup","input[name='pfrom'], input[name='pto']",function(){
	var val = $(this).val();
	$(this).css("color","#000000");
	if(val.length == 1){
		$(this).val(val.replace(/[^0-9]/g,''));
	}else{			
		var first_str = val.substring(0,1);
		var second_str = val.substring(1,2);
		if(first_str == 0)
		{
			if(second_str >= 0)
			{
				$(this).val(first_str);	
			}
			else
			{
				check_pfrom_pto(this);
			}
		}
		else
		{
			check_pfrom_pto(this);
		}
	}
});

$(document).on("click", ".intimatetips a", function(){
	if(!($.cookie('intimate') == 'ok'))
	{
		Intimate($(this).attr('href'));
		return false;
	}
});



/*
if(!IsPC()){
	$("body").addClass("all_no_pc");
}
*/



/* ===========================================================
	Hover延时处理
	hoverDuring      鼠标经过的延时时间
	outDuring        鼠标移出的延时时间
	hoverEvent       鼠标经过执行的方法
	outEvent         鼠标移出执行的方法
 * =========================================================== */
 
    
$.fn.hoverDelay = function(options){
	var defaults = {
		hoverDuring: 200,
		outDuring: 200,
		hoverEvent: function(){
		},
		outEvent: function(){
		}
	};
	var sets = $.extend(defaults,options || {});
	var hoverTimer, outTimer;
	return $(this).each(function(){
		var el = this;
		$(this).hover(function(){
			clearTimeout(outTimer);
			hoverTimer = setTimeout(function(){
				sets.hoverEvent.apply(el);
			}, sets.hoverDuring);
		},function(){
			clearTimeout(hoverTimer);
			outTimer = setTimeout(function(){
				sets.outEvent.apply(el);
			}, sets.outDuring);
		});
	});
}

