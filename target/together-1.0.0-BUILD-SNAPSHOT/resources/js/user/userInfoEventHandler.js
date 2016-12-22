$('head').append('<script type="text/javascript" src="../../../resources/js/user/userInfoController.js"></script>')

$(document).ready(function() {
	
	var controller = new uesrInfoController();

	var nicknameCheck;
	var message = [];
	var userDTO = {};
	var categoryList = [];	
	
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
		
		$(".modal-body").children("p").removeClass();
		$(".modal-body").children("p").addClass(message[0]);
		$("#msg").children("span").text(message[1]);
		$('#modal').modal({'show' : true});
		
	}
	
});