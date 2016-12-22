$('head').append('<script src=\'/resources/js/faq/faqDao.js\'><\/script>');

function faqController(){

	var dao = new faqDao();

	//FAQ [전체보기] 리스트
	this.requestListAll = function(){

		var data = dao.listAllDao();

		return data;

	}

	//FAQ [회원관련] 리스트
	this.requestListUser = function(){

		var data = dao.listUserDao();

		return data;

	}

	//FAQ [사냥관련] 리스트
	this.requestListBuy = function(){

		var data = dao.listBuyDao();

		return data;

	}

	//FAQ [정보관련] 리스트
	this.requestListInfo = function(){

		var data = dao.listInfoDao();

		return data;

	}


	//FAQ [고객센터] 리스트
	this.requestListCenter = function(){

		var data = dao.listCenterDao();

		return data;

	}

}