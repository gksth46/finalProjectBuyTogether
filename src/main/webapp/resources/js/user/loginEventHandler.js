$('head').append('<script type="text/javascript" src="../../../resources/js/user/loginController.js"></script>')

$(document).ready(function() {

	var controller = new loginController();
	//var remember = false;
	
/*	$('#useCookie').is(":checked", function() { //login button click

		remember = "true";

	});
	*/
	$('#login').on("click", function() { //login button click

		var user = { id : $('#id').val(),
				pw : $('#pw').val()
		};

		controller.requestLogin(user);

	});

	$('#NVlogin').on("click", function() { //Naver button click

		controller.requestNVLogin(remember);
				
	});

	$('#FBlogin').on("click", function(event) { //Facebook button click
		
		controller.requestFBLogin();

	});

});
