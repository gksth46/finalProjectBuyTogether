function faqDao() {

	//FAQ [전체보기] 리스트
	this.listAllDao = function(){

		$.getJSON("/restCustomerCenter/faqAllList", function(data) {

			var template1 = Handlebars.compile($('#faqListTemplate').html());

			var html1 = template1(data);

			console.log(data);

			$(".faqLi").remove();

			$(".faqAllList").html(html1);
		});

	}

	//FAQ [회원관련] 리스트
	this.listUserDao = function(){

		$.getJSON("/restCustomerCenter/faqUserList", function(data){

			var template2 = Handlebars.compile($('#faqListUserTemplate').html());

			var html2 = template2(data);

			console.log(data);

			$(".faqLiUser").remove();

			$(".faqUserList").html(html2);

		});

	}

	//FAQ [사냥관련] 리스트
	this.listBuyDao = function(){

		$.getJSON("/restCustomerCenter/faqBuyList", function(data){

			var template3 = Handlebars.compile($('#faqListBuyTemplate').html());

			var html3 = template3(data);

			console.log(data);

			$(".faqLiBuy").remove();

			$(".faqBuyList").html(html3);

		});

	}

	//FAQ [정보관련] 리스트
	this.listInfoDao = function(){

		$.getJSON("/restCustomerCenter/faqInfoList", function(data){

			var template4 = Handlebars.compile($('#faqListInfoTemplate').html());

			var html4 = template4(data);

			console.log(data);

			$(".faqLiInfo").remove();

			$(".faqInfoList").html(html4);

		});

	}

	//FAQ [고객관련] 리스트
	this.listCenterDao = function(){

		$.getJSON("/restCustomerCenter/faqCenterList", function(data){

			var template5 = Handlebars.compile($('#faqListCenterTemplate').html());

			var html5 = template5(data);

			console.log(data);

			$(".faqLiCenter").remove();

			$(".faqCenterList").html(html5);

		});

	}
}