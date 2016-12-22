$('head').append('<script src=\'/resources/js/buytogether/buytogetherController.js\'><\/script>');

$(document).ready(function (){

	var controller = new buytogetherController();
	
	controller.listAll();
	
	
	
});

