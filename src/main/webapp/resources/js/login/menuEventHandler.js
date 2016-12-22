$(document).ready(function() {
	
	var sessionId  = sessionStorage.getItem("id"); //세선에 저장된 아이디 조회
	var url = window.location.pathname;
	
	if(sessionId == null && localStorage.getItem("id") == null) { //로그인 기록이 없다면,

		showLoginBtn(); //로그인, 회원가입 버튼 표시
		
		if(url == "/login/basicUserInfo" || url == "/user/Esignout" || url == "/user/Bsignout"){

			document.location = "/login";
			
		}
		
	} else {
		
		showLogoutBtn(); //로그아웃 버튼 표시
		
	}
	
	//로그인 버튼을 클릭 시 로그인 화면으로 이동
	$('#loginBtn').on("click", function(event) {
		
		localStorage.clear();
		sessionStorage.clear();
		document.location = "/login";

	});
	
	//로그아웃 버튼 클릭 시 세션,로컬저장소 초기화 후 홈화면으로 이동
	$('#logoutBtn').on("click", function(event) {
		
		localStorage.clear();
		sessionStorage.clear();
		document.location = "/";
		
	});
	
	//회원가입 버튼 클릭 시 회원가입 화면으로 이동
	$('#joinBtn').on("click", function(event) {
		
		document.location = "/user/join";
		
	});
	
	//로그인,회원가입 버튼 출력
	function showLoginBtn () {
		
		$('#loginBtn').css({display:'block'});
		$('#joinBtn').css({display:'block'});
		$('#logoutBtn').css("display", 'none');
		$('#userId').text("");
		
	};
	
	//환영 멘트, 로그아웃 버튼 출력
	function showLogoutBtn () {
		
		$('#loginBtn').css({display:'none'});
		$('#joinBtn').css({display:'none'});
		$('#logoutBtn').css({display:'block'});
		$('#userId').text(sessionId +" 님 환영합니다");
		
	};
    
});
