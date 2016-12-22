$('head').append('<script type="text/javascript" src="../../../resources/js/user/loginController.js"></script>')

$(document).ready(function() {
	
	var controller = new loginController();
	var loginCheck;
	var message = [];
	
	//로그인 버튼 클릭 시
	$('#login').on("click", function() {
		
		var user = { 
				id : $('#id').val(),
				pw : $('#pw').val()
		};
		
		loginCheck = isLoginCheckCheked(); //로그인 상태 유지 체크 시
		
		message = controller.requestLogin(user, loginCheck); //로그인 컨트롤러 요청
		modal(message);

	});

	//네이버로 로그인 클릭 시
	$('#NVlogin').on("click", function() {

		loginCheck = isLoginCheckCheked(); //로그인 상태 유지 체크 시
		controller.requestNVLogin(loginCheck);
				
	});

	$('#FBlogin').on("click", function(event) {
		
		loginCheck = isLoginCheckCheked(); //로그인 상태 유지 체크 시
		controller.requestFBLogin(loginCheck);

	});
	
	//모달 실행
	function modal(message) {
		
		$(".modal-body").children("p").removeClass();
		$(".modal-body").children("p").addClass(message[0]);
		$("#msg").children("span").text(message[1]);
		$('#modal').modal({'show' : true});
		
	}
	
	//로그인 상태 유지 체크
	function isLoginCheckCheked() {
		
		if($('#loginCheck').is(":checked")) {
			
			loginCheck = "true";
			
		}
		
		return loginCheck;
	}

});
