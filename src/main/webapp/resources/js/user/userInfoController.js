$('head').append('<script type="text/javascript" src="../../../resources/js/user/userInfoDao.js"></script>')

function uesrInfoController() {
	
	var dao = new userInfoDao();
	var message = [];
	var result;
	var user;
	
	//다음 우편 주소 API 요청
	this.requestDaumPost = function() {
		
		dao.DaumPostDao();
		
	};

	//닉네임 중복 확인 요청
	this.requestNicknameCheck = function(nickname) {
		
		result = dao.NicknameCheckDao(nickname);
		
		var nicknameCheck;
		
		if(result == "success") { //사용 가능한 닉네임이라면,
			
			nicknameCheck = 1;
			
		} else { //사용 불가한 닉네임 이라면,
			
			nicknameCheck = 0;
			
		}
		
		return nicknameCheck;
		
	};
	
	//닉네임 중복 확인 결과 메세지 요청
	this.requestNicknameCheckMsg = function(loginCheck) {
		
		if(loginCheck == 1) { //사용 가능한 닉네임이라면,
			
			message[0] = "c-font-green-2 glyphicon glyphicon-ok-sign";
			message[1] = "사용가능한 닉네임입니다.";
			
		} else if(loginCheck == 0) { //사용 불가한 닉네임이라면,
			
			message[0] = "c-font-red glyphicon glyphicon-remove-sign"
			message[1] = "이미 사용중인 닉네임입니다.";
			
		} else { //닉네임을 입력하지 않고 중복 확인 버튼 클릭 시
			
			message[0] = "c-font-red glyphicon glyphicon-exclamation-sign";
			message[1] = "닉네임을 입력해주세요.";
			
		}
		
		return message;
		
	}
	
	//필수 정보 등록 요청
	this.requestRegist = function(userDTO) {
			
		result = dao.registDao(userDTO);
		
		if(result == "success") {
			
			document.location = "/";
			
		} else {
			
			message[0] = "c-font-red glyphicon glyphicon-exclamation-sign";
			message[1] = "등록에 오류가 발생하였습니다.";
			return message;
			
		}
		
	};
	
	//중복확인 경고 메세지 요청
	this.requestAlertMsg = function() {
		
		message[0] = "c-font-red glyphicon glyphicon-exclamation-sign";
		message[1] = "닉네임 중복확인을 해주세요.";
		return message;
	};
	
	//같이사냥 회원 탈퇴 요청
	this.requestBUserSignout = function(pw) {
		
		user = {
				pw: pw,
				user_number: sessionStorage.getItem("number")
		};
		
		return resultMsg(dao.removeDao(user));
		
	};
	
	//페이스북/네이버 회원 탈퇴 요청
	this.requestEUserSignout = function(email) {
		
		user = {
				email: email,
				user_number: sessionStorage.getItem("number")
		};

		return resultMsg(dao.removeDao(user));
		
	};
	
	//결과 모달 메시지 설정
	function resultMsg(result) {
		
		if(result == "success") {
			
			message[0] = "c-font-blue glyphicon glyphicon glyphicon-send";
			message[1] = "언제든 다시 돌아와주세요. 이용해주셔서 감사합니다.";
			message[2] = "success";
			
		} else {
			
			message[0] = "c-font-red glyphicon glyphicon-exclamation-sign";
			message[1] = "회원탈퇴 중 오류가 발생하였습니다.";
			message[2] = "fail";
			
		}
		
		return message;
		
	};
	
	//회원탈퇴 경고 메세지 요청
	this.requestAlertMsgForSignout = function(valChk) {
		
		if(valChk == 1 || valChk == 4) {
			
			message[0] = "c-font-blue glyphicon glyphicon-send";
			message[1] = "같이사냥을 떠나실거에요...?";
			
		} else if(valChk == 2){
			
			message[0] = "c-font-red glyphicon glyphicon-exclamation-sign";
			message[1] = "입력하신 비밀번호와 비밀번호 확인이 일치하지 않습니다.";
			
		} else if(valChk == 3){
			
			message[0] = "c-font-red glyphicon glyphicon-exclamation-sign";
			message[1] = "비밀번호 또는 비밀번호 확인을 입력해주세요.";
			
		} else if(valChk == 5){
			
			message[0] = "c-font-red glyphicon glyphicon-exclamation-sign";
			message[1] = "입력하신 이메일 또는 이메일 확인이 일치하지  않습니다.";
			
		} else {
			
			message[0] = "c-font-red glyphicon glyphicon-exclamation-sign";
			message[1] = "이메일 또는 이메일 확인을 입력해주세요.";
			
		}
		
		return message;
		
	};
	
	//홈화면 요청
	this.requestHome = function() {
		
		sessionStorage.clear();
		localStorage.clear();
		document.location = "/";
		
	};
	
}
