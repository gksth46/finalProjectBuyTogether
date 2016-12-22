$('head').append('<script src=\'../../resources/js/faq/faqDao.js\'><\/script>');

function faqController(){

	var dao = new faqDao();

	//FAQ [전체보기] 리스트
	this.listAll = function(){

		dao.listAllDao();

	}

	//FAQ [회원관련] 리스트
	this.listUser = function(){

		dao.listUserDao();

	}

	//FAQ [사냥관련] 리스트
	this.listBuy = function(){

		dao.listBuyDao();

	}

	//FAQ [정보관련] 리스트
	this.listInfo = function(){

		dao.listInfoDao();

	}

	//FAQ [고객센터] 리스트
	this.listCenter = function(){

		dao.listCenterDao();

	}

}