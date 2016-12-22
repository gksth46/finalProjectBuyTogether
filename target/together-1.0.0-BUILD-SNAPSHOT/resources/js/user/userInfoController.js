$('head').append('<script type="text/javascript" src="../../../resources/js/user/userInfoDao.js"></script>')

function uesrInfoController() {
	
	var dao = new userInfoDao();
	var message = [];
	
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
			
		var result = dao.registDao(userDTO);
		
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
	
}
