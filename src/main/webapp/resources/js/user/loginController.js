$('head').append('<script type="text/javascript" src="../../../resources/js/user/loginDao.js"></script>')

function loginController() {
	
	var dao = new loginDao();
	//login controller
	this.requestLogin = function(user) {
		
		dao.LoginDao(user);
		
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
