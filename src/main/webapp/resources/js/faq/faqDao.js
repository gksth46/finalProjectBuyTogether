function faqDao() {

	//FAQ [전체보기] 리스트
	this.listAllDao = function(){
		
		var data;

		$.ajax({
			type : 'get',
			url : '/restCustomerCenter/faqAllList/',
			async : false,
			headers : {

				"Content-type" : "application/json",
				"X-HTTP-Method-Override": "GET"

			},
			dataType : 'json',
			success : function(result){

				data = result;

			}

		});

		return data;

	}

	//FAQ [회원관련] 리스트
	this.listUserDao = function(){

		var data;

		$.ajax({
			type : 'get',
			url : '/restCustomerCenter/faqUserList/',
			async : false,
			headers : {

				"Content-type" : "application/json",
				"X-HTTP-Method-Override": "GET"

			},
			dataType : 'json',
			success : function(result){

				data = result;

			}

		});

		return data;

	}

	//FAQ [사냥관련] 리스트
	this.listBuyDao = function(){

		var data;

		$.ajax({
			type : 'get',
			url : '/restCustomerCenter/faqBuyList/',
			async : false,
			headers : {

				"Content-type" : "application/json",
				"X-HTTP-Method-Override": "GET"

			},
			dataType : 'json',
			success : function(result){

				data = result;

			}

		});

		return data;

	}

	//FAQ [정보관련] 리스트
	this.listInfoDao = function(){

		var data;

		$.ajax({
			type : 'get',
			url : '/restCustomerCenter/faqInfoList/',
			async : false,
			headers : {

				"Content-type" : "application/json",
				"X-HTTP-Method-Override": "GET"

			},
			dataType : 'json',
			success : function(result){

				data = result;

			}

		});

		return data;

	}

	//FAQ [고객관련] 리스트
	this.listCenterDao = function(){

		var data;

		$.ajax({
			type : 'get',
			url : '/restCustomerCenter/faqCenterList/',
			async : false,
			headers : {

				"Content-type" : "application/json",
				"X-HTTP-Method-Override": "GET"

			},
			dataType : 'json',
			success : function(result){

				data = result;

			}

		});

		return data;

	}
}