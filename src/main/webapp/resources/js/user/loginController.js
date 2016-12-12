$('head').append('<script type="text/javascript" src="../../../resources/js/user/loginDao.js"></script>')

function loginController() {
	
	var dao = new loginDao();
	//login controller
	this.requestLogin = function(user) {
		
		var result = dao.LoginDao(user);
		
		if(result=="success") { //로그인 성공 시
			
			dao.homeDao();
			
		} else { //로그인 실패 시
			
			dao.loginDao();
			
		}
		
	};
	//Naver login controller
	this.requestNVLogin = function() {
		
		dao.NVLoginDao();		
		
	};	
	//Facebook login controller
	this.requestFBLogin = function() {
		
		dao.FBLoginDao();

	};

}
