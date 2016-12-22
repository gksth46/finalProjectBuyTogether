function userInfoDao() {
	
	var address;
	
	//다음 우편주소 dao
	this.DaumPostDao = function() {

		 new daum.Postcode({
			 oncomplete: function(data) {
				 
				 address = {
				 		sido: data.sido,
				 		sigungu: data.sigungu
				 };		

                $("#sido").val(address.sido);
                $("#sigungu").val(address.sigungu);

			 }
		 }).open();
		 
	};
	
	//닉네임 중복 확인 dao
	this.NicknameCheckDao = function(nickname) {

		var result;
		//서버에 닉네임 중복 확인 결과 요청
		$.ajax({
			type: 'post',
			url: '/restUser/nicknameCheck',	
			dataType: 'text',
			data: { "nickname" : nickname },
			async : false,	
			success:function(data){
				if(data == "") { //사용 가능한 닉네임이라면,
					result = "success";
				} else { //사용 불가한 닉네임이라면,
					result = "fail";
				}
			}
		});
		
		return result;
		
	};
	
	//필수 정보 등록 dao
	this.registDao = function(userDTO) {
	
		var result;
		
		if(address != null) { //관심 주소를 설정한다면,
			
			userDTO.user_sido = address.sido;
			userDTO.user_sigungu = address.sigungu;
			userDTO.user_dong = address.dong;
			
		}
		
		jQuery.ajaxSettings.traditional = true; //jquery 1.3 version 사용 시
		
		userDTO.user_number = sessionStorage.getItem("number");
		
		//서버에 필수 정보 등록 결과 요청
		$.ajax({
			type: 'post',
			url: '/restUser/registBasicInfo',	
			headers: { 
				"Content-Type": "application/json",
				"X-HTTP-Method-Override": "POST" },
			data: JSON.stringify(userDTO),
			dataType: 'text',
			async : false,	
			success:function(data){	
				result = data;
			}
		});
		
		return result;
		
	};
	
	//회원 탈퇴 dao
	this.removeDao = function(user) {
		
		var result;

		//서버에 회원 탈퇴 결과 요청
		$.ajax({
			type: 'post',
			url: '/restUser/remove',	
			headers: { 
				"Content-Type": "application/json",
				"X-HTTP-Method-Override": "POST" },
			data: JSON.stringify(user),
			dataType: 'text',
			async : false,	
			success:function(data){	
				result = data;
			}
		});
		
		return result;
		 
	};
	
}