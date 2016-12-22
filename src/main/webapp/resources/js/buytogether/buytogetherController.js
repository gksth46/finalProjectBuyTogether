$('head').append('<script src=\'/resources/js/buytogether/buytogetherDao.js\'><\/script>');


function buytogetherController() {
	
	var dao = new buytogetherDao();

	this.listAll = function() {
		
		dao.listAllDao();
		
	}
	
	//카테고리 리스트 조회
	this.requestCategoryList = function() {
		
		dao.listCategoryDao();
	}
	
	//사냥방식 리스트 조회
	this.requestHuntingTypeList = function() {
		
		dao.listHuntingTypeDao();
	}
	
	//첨부사진 경로 받아옴
	this.requestPhotoPath = function(formData) {
		
		dao.savePhotoPath(formData);
		
	}
	
	//첨부사진 삭제
	this.requestPhotoDelete = function(photo) {
		
		dao.deletePhotoDao(photo);
	}
	
	//같이사냥 게시글 저장
	this.requestSaveBuyTogether = function(buytogether, buytogetherAddress) {
		
		dao.insertDao(buytogether, buytogetherAddress);
	}
	
}