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

function facebookAPI() {

	FB.api('/me?fields=email, first_name, last_name, id', function(response) {		

		var user = { 
				id : response.id,
				name : response.last_name + response.first_name,
				email : response.email
		};

		$.ajax({
			type: 'post',
			url: '/login/externalLogin',	
			headers: { 
				"Content-Type": "application/json",
				"X-HTTP-Method-Override": "POST" },
			data: JSON.stringify(user),
			dataType: 'json', //서버에서 보내오는 데이터 타입
			async : false,	
			success:function(data){
				if(data.nickName==null) { //신규 회원
					new loginDao().insertUserInfoDao(data);
				} else { //기존 회원
					new loginDao().homeDao();
				}
			}
		});

	});

}

function loginDao() {
	//Login Dao
	this.LoginDao = function(user) {
		var result;
		
		$.ajax({
			type: 'post',
			url: '/login/buyTogetherLogin',	
			headers: { 
				"Content-Type": "application/json",
				"X-HTTP-Method-Override": "POST" },
			data: JSON.stringify(user),
			dataType: 'json', //서버에서 보내오는 데이터 타입
			async : false,	
			success:function(data){
				if(data.nickName==null) { //신규 회원
					insertUserInfoDao(data);
				} else { //기존 회원
					homeDao(data);
				}
			}
		});
		
	};

	//Naver login Dao
	this.NVLoginDao = function() {
		//GET state
		var state;
		$.ajax({
			type: 'get',
			url: '/login/state',	
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
		var redirect_uri = "http%3A%2F%2Flocalhost%3A8098%2Fuser%2FnaverCallback";
		var requestUrl = url + clientId + "&response_type=code&redirect_uri=" + redirect_uri + "&state=" + state;
		
		document.location = requestUrl;
		/*var code;
		$.ajax({
			type: 'get',
			url: requestUrl,
			headers: { 
				"Content-Type": "application/json",
				"X-HTTP-Method-Override": "GET" },
			dataType: 'jsonp',
			async : false,	
			success:function(data){
				state = data[0];
				code = data[1];
			}
		});
		alert(state); alert(code);*/
	};

	//Facebook login dao
	this.FBLoginDao = function() {

		var user;
		//페이스북 로그인 API
		FB.login(function(response){
			console.log('statusChangeCallback');
			console.log(response);

			if (response.status === 'connected') {
				facebookAPI();
			} else if (response.status === 'not_authorized') {
			} else {
			}
		}, {scope: 'public_profile,email'});

	};

	//신규회원 등록
	this.regist = function(user) {

		$.ajax({
			type: 'post',
			url: '/login/regist',	
			headers: { 
				"Content-Type": "application/json",
				"X-HTTP-Method-Override": "POST" },
				data: JSON.stringify(user),
				dataType: 'text', //서버에서 보내오는 데이터 타입
				success:function(result){
					if(result==null) { //등록 성공시
						alert("성공");
					}
				}
		});

	}

	//신규회원 로그인 시 닉네임 및 기본정보 등록 화면으로 이동
	this.insertUserInfoDao = function(user) {

		document.location = "/user/info";

	};

	//로그인 성공 시 메인 화면으로 이동
	this.homeDao = function(user) {		
		//회원정보세션 저장
		document.location = "/home";

	};

	//로그인 실패 시 로그인 화면으로 이동
	this.loginDao = function() {		

		document.location = "/user/login";

	};

}
