$('head').append('<script src=\'/resources/js/faq/faqController.js\'><\/script>');

$(document).ready(function(){

	var controller = new faqController();

	<!-- HEADER / FOOTER -->
	$("#buytogetherHeader").load("/views/include/header.html");
	$("#buytogetherFooter").load("/views/include/footer.html");


	//FAQ [전체보기] 리스트
	$(document).on("click", "#userTab .allTab",  function(){

		var ul_userTab = $(this).parent();
		var div_clearfix = ul_userTab.parent();
		var tab_content = div_clearfix.next();
		var div_all = tab_content.children().eq(0);
		var faqAllList = div_all.children();

		var data = controller.requestListAll();

		var allTemplate = Handlebars.compile($('#faqListAllTemplate').html());

		var allHtml = allTemplate(data);

		faqAllList.children(".faqLiAll").remove();

		$(".faqAllList").html(allHtml);

	});

	//FAQ [회원관련] 리스트
	$(document).on("click","#userTab .userTab", function(){

		var ul_userTab = $(this).parent();
		var div_clearfix = ul_userTab.parent();
		var tab_content = div_clearfix.next();
		var div_user = tab_content.children().eq(1);
		var faqUserList = div_user.children();

		var data = controller.requestListUser();

		var usertTemplate = Handlebars.compile($("#faqListUserTemplate").html());

		var userHtml = usertTemplate(data);

		faqUserList.children("#faqLiUser").remove();

		faqUserList.html(userHtml);

	});

	//FAQ [사냥관련] 리스트
	$(document).on("click","#userTab .buyTab", function(){

		var ul_userTab = $(this).parent();
		var div_clearfix = ul_userTab.parent();
		var tab_content = div_clearfix.next();
		var div_buy = tab_content.children().eq(2);
		var faqBuyList = div_buy.children();

		var data = controller.requestListBuy();

		var buytTemplate = Handlebars.compile($("#faqListBuyTemplate").html());

		var buyHtml = buytTemplate(data);

		faqBuyList.children("#faqLiBuy").remove();

		faqBuyList.html(buyHtml);

	});


	//FAQ [정보관련] 리스트
	$(document).on("click","#userTab .infoTab", function(){

		var ul_userTab = $(this).parent();
		var div_clearfix = ul_userTab.parent();
		var tab_content = div_clearfix.next();
		var div_info = tab_content.children().eq(3);
		var faqInfoList = div_info.children();

		var data = controller.requestListInfo();

		var infoTemplate = Handlebars.compile($('#faqListInfoTemplate').html());

		var infoHtml = infoTemplate(data);

		faqInfoList.children("#faqLiInfo").remove();

		faqInfoList.html(infoHtml);

	});

	//FAQ [고객센터] 리스트
	$(document).on("click", "#userTab .customerTab", function(){

		var ul_userTab = $(this).parent();
		var div_clearfix = ul_userTab.parent();
		var tab_content = div_clearfix.next();
		var div_customer = tab_content.children().eq(4);
		var faqCustomerList = div_customer.children();

		var data = controller.requestListCenter();

		var customerCenterTemplate = Handlebars.compile($('#faqListCenterTemplate').html());

		var customerCenterHtml = customerCenterTemplate(data);

		faqCustomerList.children("#faqLiCustomer").remove();

		faqCustomerList.html(customerCenterHtml);

	});
});