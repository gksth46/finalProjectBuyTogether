//facebook API
window.fbAsyncInit = function() {
	FB.init({
		appId      : '1427292463948846',
		cookie     : true,  // enable cookies to allow the server to access 
		// the session
		xfbml      : true,  // parse social plugins on this page
		version    : 'v2.8' // use graph api version 2.8
	});

	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});

};

(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function checkLoginState() {
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});
}

function statusChangeCallback(response) {
	console.log('statusChangeCallback');
	console.log(response);
}

//페이스북 API
function facebookAPI(callback) {

	var user;
	//페이스북 로그인 회원의 이메일, 이름, 아이디 정보 요청
	FB.api('/me?fields=email, first_name, last_name, id', function(response) {	

		var FBuser = {
				id : response.id,
				name : response.last_name + response.first_name,
				email : response.email
		};
		//서버에 페이스북 로그인 회원 정보 전달
		$.ajax({
			type: 'post',
			url: '/restLogin/facebookLogin',	
			headers: { 
				"Content-Type": "application/json",
				"X-HTTP-Method-Override": "POST" },
			data: JSON.stringify(FBuser),
			dataType: 'json',
			async : false,	
			success:function(data){				
				user = data;
				callback(user);
			}
		});
		
		return user;
		
	});

}

//로그인 dao
function loginDao() {
	
	var userInfo;
	
	//같이사냥 로그인 dao 
	this.LoginDao = function(user) {

		$.ajax({
			type: 'post',
			url: '/restLogin/buyTogetherLogin',	
			headers: { 
				"Content-Type": "application/json",
				"X-HTTP-Method-Override": "POST" },
			data: JSON.stringify(user),
			dataType: 'json',
			async : false,
			success:function(data){
				userInfo = data;
			}
		});

		return userInfo;
		
	};

	//네이버 로그인 ㅇao
	this.NVLoginDao = function() {

		var state;
		//서버에 토큰 요청
		$.ajax({
			type: 'get',
			url: '/restLogin/state',	
			headers: {
				"Content-Type": "application/json",
				"X-HTTP-Method-Override": "GET" },
			dataType: 'text',
			async : false,	
			success:function(data){
				state = data;
			}
		});
		
		var clientId = "by6_tJPL7JlGEEddntmk";	
		var url = "https://nid.naver.com/oauth2.0/authorize?client_id=";
		var redirect_uri = "http%3A%2F%2Flocalhost%3A8098%2Flogin%2FnaverCallback1";	
		var requestUrl = url + clientId + "&response_type=code&redirect_uri=" + redirect_uri + "&state=" + state;
		
		document.location = requestUrl; //네이버 로그인 인증 요청 후 redirect_uri 로 이동
		
	};

	//페이스북 로그인 dao
	this.FBLoginDao = function(callback) {
		//페이스북 로그인 권한 및 연결 확인 요청
		FB.login(function(response){
			console.log('statusChangeCallback');
			console.log(response);

			if (response.status === 'connected') { //권한 승인이 됐다면,
				
				facebookAPI(callback); //페이스북 로그인 회원 정보 요청
				
			} else if (response.status === 'not_authorized') {
				
			} else {
				
			}
		}, {scope: 'public_profile,email'});

	};
	
	//로그인 회원 정보 세션에 저장 및 로그인 상태 유지 회원 정보 로컬 저장소에 저장
	this.loginSession = function(user, loginCheckStatus) {

		if(loginCheckStatus == "true") { //로그인 상태 유지하기를 체크했다면,
			
			localStorage.clear(); //로컬 저장소 초기화
			localStorage.setItem("id", user.id);
			localStorage.setItem("pw", user.pw);
			localStorage.setItem("number", user.number);
			
		}
		
		sessionStorage.clear(); //세션 초기화
		sessionStorage.setItem("id", user.id);
		sessionStorage.setItem("pw", user.pw);
		sessionStorage.setItem("number", user.number);

	};

}
