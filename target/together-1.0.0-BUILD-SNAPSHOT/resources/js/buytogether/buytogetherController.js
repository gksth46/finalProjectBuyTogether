$('head').append('<script src=\'/resources/js/buytogether/buytogetherDao.js\'><\/script>');

function buytogetherController() {
	
	var dao = new buytogetherDao();

	this.listAll = function(scri) {
		
		var parsedResult = dao.listBuyTogetherDao(scri);
		var searchBuyTogether = parsedResult.searchBuyTogether;
		console.log(searchBuyTogether.length);
		var str = "";
		
		for(var i=0; i<searchBuyTogether.length; i++){
			
			str = str + "<div class='cbp-item' id = 'buyTogetherLi'>";
			str = str + "<a href='/buytogether/read?buytogether_number=" + searchBuyTogether[i].buyTogether_number;
			str = str + "'class='cbp-caption'>";
			str = str + "<div class='cbp-caption-defaultWrap'>";
			str = str + "<img src='/resources/img/noImage.png' alt=''>";
			str = str + "</div> <div class='cbp-caption-activeWrap'>";
			str = str + "<div class='cbp-l-caption-alignLeft'>";
			str = str + "<div class='cbp-l-caption-body'>";
			str = str + "<div class='cbp-l-caption-title' id='title'>'" + searchBuyTogether[i].title;
			str = str + "</div><div class='cbp-l-caption-desc' id='nickname'>by " + searchBuyTogether[i].nickname;
			str = str + "(" + searchBuyTogether[i].reputation + ")";
			str = str + "</div></div></div></div></a></div>";
		}
			
		$("#buyTogetherLi").remove();
		$(".buyTogetherList").html(str);

		var pageMaker = parsedResult.pageMaker;
		console.log(pageMaker);
		printPaging(pageMaker, $("#pagination"));//페이징
		
	}
	
	//카테고리 리스트 조회
	this.requestCategoryList = function() {
		
		dao.listCategoryDao();
	}
	
	//사냥방식 리스트 조회
	this.requestHuntingTypeList = function() {
		
		dao.listHuntingTypeDao();
	}
	
	//사냥상태 리스트 조회
	this.requestHuntingStatusList = function() {
	
		dao.listHuntingStatusDao();
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
	
	//같이사냥 리스트(map)
	this.requestBuyTogetherList = function(scri) {

		dao.listBuyTogetherDao(scri);

	}
	
	var printPaging = function(pageMaker, target){

		var str = "<ul class='c-content-pagination c-theme' id='forRemove'>";

		if(pageMaker.prev){
			str += "<li><a href='"+(pageMaker.startPage-1)+"'> << </a></li>";
		}

		for(var i = pageMaker.startPage, len = pageMaker.endPage; i <= len; i++){
			var strClass = pageMaker.cri.page == i?'class = active':'';
			str += "<li "+strClass+" class='pageNumber'><a href = '"+i+"'>"+i+"</a></li>";
		}

		if(pageMaker.next){
			str += "<li><a href='"+(pageMaker.endPage+1)+"'> >> </a></li>";
		}
		
		str += "</ul>"
		target.html(str);
	};
}