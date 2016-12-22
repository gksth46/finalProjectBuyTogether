$('head').append('<script type="text/javascript" src="../../../resources/js/user/loginDao.js"></script>')

function loginController() {

	var dao = new loginDao();	
	var userInfo;
	var loginCheckStatus;
	var message = [];

	//로그인 요청
	this.requestLogin = function(user, loginCheck) {
		
		if(user.id == "" || user.pw == "") { //아이디 또는 비밀번호를 작성하지 않았다면,

			message[0] = "c-font-red glyphicon glyphicon-remove-sign";
			message[1] = "아이디 또는 비밀번호를 입력해주세요.";
			return message;
			
		} else { //아이디와 비밀번호를 작성했다면,
			
			loginCheckStatus = loginCheck;		
			userInfo = dao.LoginDao(user); //LoginDao 호출 후 결과 값 저장
			
			if(userInfo == null) { //로그인에 실패했다면,

				message[0] = "c-font-red glyphicon glyphicon-remove-sign";
				message[1] = "등록되지 않은 아이디이거나, 아이디 또는 비밀번호를 잘못 입력하셨습니다.";
				return message;

			} else { //로그인에 성공했다면,

				isNewUser(userInfo, loginCheckStatus); //세션 저장 및 신규 회원인지 검사

			}
			
		}

	};

	//네이버 로그인 요청
	this.requestNVLogin = function(loginCheck) {

		loginCheckStatus = loginCheck;		
		dao.NVLoginDao();

	};	

	//페이스북 로그인 요청
	this.requestFBLogin = function(loginCheck) {

		loginCheckStatus = loginCheck;	
		
		dao.FBLoginDao(function(FBuserInfo){
			
			user = FBuserInfo;
			isNewUser(user, loginCheckStatus);
			
		});

	};
	
	//로그인 상태 유지 요청
	this.requestCheckNVLogin = function() {	

		$.ajax({
			type: 'get',
			url: '/restLogin/naverUserInfo',	
			headers: { 
				"Content-Type": "application/json",
				"X-HTTP-Method-Override": "GET" },
				dataType: 'json',
				async : false,	
				success:function(data){
					userInfo = data;
				}
		});

		isNewUser(userInfo, loginCheckStatus);

	};

	//신규 회원 검사
	function isNewUser(userInfo, loginCheckStatus) {

		var result = dao.loginSession(userInfo, loginCheckStatus); //체크전 세션에 로그인정보 저장

		if(userInfo.nickname == null) { //첫 로그인이라면,

			document.location = "/login/basicUserInfo"; //필수 정보 입력 화면으로 이동

		} else { //기존 회훤이라면,

			document.location = "/"; //홈으로 이동

		}

	}

}
