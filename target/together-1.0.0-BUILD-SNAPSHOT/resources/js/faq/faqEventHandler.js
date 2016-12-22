$('head').append('<script src=\'../../resources/js/faq/faqController.js\'><\/script>');

$(document).ready(function(){

	var controller = new faqController();


	//FAQ [전체보기] 리스트
	controller.listAll();

	//FAQ [회원관련] 리스트
	controller.listUser();

	//FAQ [사냥관련] 리스트
	controller.listBuy();

	//FAQ [정보관련] 리스트
	controller.listInfo();

	//FAQ [고객센터] 리스트
	controller.listCenter();

});