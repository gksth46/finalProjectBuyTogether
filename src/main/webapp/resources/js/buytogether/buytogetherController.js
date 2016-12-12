$('head').append('<script src=\'/resources/js/buytogether/buytogetherDao.js\'><\/script>');


function buytogetherController() {
	
	var dao = new buytogetherDao();

	this.listAll = function() {
		
		dao.listAllDao();
		
	}
}