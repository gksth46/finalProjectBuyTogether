$('head').append('<script type="text/javascript" src="/resources/js/user/userInfoController.js"></script>')

$(document).ready(function() {
	
	var controller = new uesrInfoController();

	var nicknameCheck;
	var message = [];
	var userDTO = {};
	var categoryList = [];	
	var okBtn;
	
	//같이사냥 회원 아이디
	$('#BUserId').val(sessionStorage.getItem("id"));	
	
	//페이스북/네이버 회원 아이디
	$('#EUserId').val(sessionStorage.getItem("id"));
	
	//페이스북/네이버 회원 회원탈퇴 버튼 클릭 시
	$('#EUserSignOut').on("click", function() {
		
		var email = $('#email').val();	
		var emailChk = $('#emailChk').val();
		var valChk;
		
		if(email == emailChk && email != "") {
			
			okBtn = 2;
			valChk = 4;
			
		} else if(email != emailChk){
			
			valChk = 5;
			
		} else {
			
			valChk = 6;
			
		}
		
		message = controller.requestAlertMsgForSignout(valChk);
		modal(message);
		
	});
	
	//같이사냥 회원탈퇴 버튼 클릭 시
	$('#BUserSignOut').on("click", function() {
		
		var pw = $('#pw').val();	
		var pwChk = $('#pwChk').val();
		var valChk;
		
		if(pw == pwChk && pw != "") {
			
			valChk = 1;
			okBtn = 1;
			
		} else if(pw != pwChk){
			
			valChk = 2;
			
		} else {
			
			valChk = 3;
			
		}
		
		message = controller.requestAlertMsgForSignout(valChk);
		modal(message);
		
	});
	
	//같이사냥 회원 탈퇴 버튼 클릭 시
	$('#BUserOkBtn').on("click", function() {
		
		message = controller.requestBUserSignout($('#pw').val());
		okBtn = 0;
		modalForResult(message);
		
		if(message[2] == "success") {

			controller.requestHome();
			
		}
		
	});
	
	//페이스북/네이버 회원 탈퇴 버튼 클릭 시
	$('#EUserOkBtn').on("click", function() {

		message = controller.requestEUserSignout($('#email').val());
		okBtn = 0;
		modalForResult(message);
		
		if(message[2] == "success") {
			
			controller.requestHome();
			
		}
		
	});
	
	//다음 우편주소 버튼 클릭 시
	$('#DaumPostcode').on("click", function() {
		
		controller.requestDaumPost(); //다음 우편주소 API 컨트롤러 요청 
				
	});
	
	//닉네임 중복확인 버튼 클릭 시
	$('#nicknameCheck').on("click", function () {
	
		userDTO.nickname = $('#nickname').val();
		
		if(userDTO.nickname != "") { //닉네임을 입력했다면,
			
			nicknameCheck = controller.requestNicknameCheck(userDTO.nickname);
			message = controller.requestNicknameCheckMsg(nicknameCheck);
		
		} else {
			
			message = controller.requestNicknameCheckMsg(2);

		}
		
		modal(message);
		
	});
	
	//등록하기 버튼 클릭 시
	$('#submit').on("click", function() {	
		
		$('.check').each(function () { //모든 관심 카테고리 체크
			
			if ($(this).is(":checked")) { //관심 카테고리로 설정했다면,
				
				categoryList.push($(this).val());

			}
			
		});
		
		userDTO.category = categoryList;
		userDTO.nickname = $('#nickname').val();
		
		if(nicknameCheck == 1) { //닉네임 중복 확인을 했다면,
			
			message = controller.requestRegist(userDTO);
			
		} else { //닉네임 중복 확인을 안했다면,
			
			message = controller.requestAlertMsg();
			
		}
		
		modal(message);
		
	});	
	
	//모달 실행
	function modal(message) {

		if(okBtn == 1) {
		
			$("#BUserOkBtn").css({display:'inline-block'});
			
		} else if(okBtn == 2) {
			
			$("#EUserOkBtn").css({display:'inline-block'});
			
		}
		
		$(".modal-body").children("p").removeClass();
		$(".modal-body").children("p").addClass(message[0]);
		$("#msg").children("span").text(message[1]);
		$('#modal').modal({'show' : true});
		
	}
	
	//결과 모달 실행
	function modalForResult(message) {

		$("#modal-result").children("p").removeClass();
		$("#modal-result").children("p").addClass(message[0]);
		$("#resultMsg").children("span").text(message[1]);
		$('#resultModal').modal({'show' : true});
		
	}
	
});