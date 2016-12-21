$('head').append('<script src=\'/resources/js/buytogether/buytogetherDao.js\'><\/script>');

function buytogetherController() {
	
	var dao = new buytogetherDao();
<<<<<<< HEAD
	
	//글쓰기 버튼 클릭시 글쓰기 뷰로 이동
	this.requestWrite = function() {
		
		document.location = '/buyTogether/write';
	}

	//유저의 관심카테고리 존재 여부 확인
	this.requestUserInterest = function(user_number) {
		
		return dao.listUserInterest(user_number);
	}
	
	//같이사냥 목록 요청
	this.requestListAll = function(scri) {
		
		var cube = new cubphoto();
		cube.destory();
		$('.buyTogetherList').children().remove();
		
		var parsedResult = dao.listBuyTogetherDao(scri);
		var searchBuyTogether = parsedResult.searchBuyTogether;
		cube.init();
		
		
		if(searchBuyTogether.length == 0) {
			
			$("#noItem").show();
			$('.buyTogetherList').hide();
			$("#pagination").hide();

			return;
		}
		
		$('.buyTogetherList').show();
=======
    
	this.requestListAll = function(scri) {
		
		var parsedResult = dao.listBuyTogetherDao(scri);
		var searchBuyTogether = parsedResult.searchBuyTogether;
		var str = "";
>>>>>>> refs/remotes/origin/master
		
		if(searchBuyTogether.length == 0) {
			
			str += "해당 같이사냥 글이 없어요!! 새로 등록해 보세요<br>";
			str += "<a href='buytogether/write>같이사냥 하러 가기</a>"

			$("#noItem").html(str);
			$(".buyTogetherLi").remove();
			$("#pagination").remove();

			return;
		}

		for(var i=0; i<searchBuyTogether.length; i++){
			
<<<<<<< HEAD
			var str = "";
			
=======
>>>>>>> refs/remotes/origin/master
			if(searchBuyTogether[i].title.length > 14){
				searchBuyTogether[i].title = searchBuyTogether[i].title.substring(0,14);
				searchBuyTogether[i].title += "...";
			}
<<<<<<< HEAD
			if(searchBuyTogether[i].photo_path[0] == null){
				searchBuyTogether[i].photo_path[0] = '/resources/img/noImage.png';
			} else {
				searchBuyTogether[i].photo_path[0] = "/restBuytogether/displayFile?fileName=" + searchBuyTogether[i].photo_path[0].path;
			}
			str = str + "<div class='cbp-item'>";
=======
			
			if(searchBuyTogether[i].photo_path[0] == null){
				searchBuyTogether[i].photo_path[0] = '/resources/img/noImage.png';
			}
			
			str = str + "<div class='cbp-item buyTogetherLi'>";
>>>>>>> refs/remotes/origin/master
			str = str + "<a href='/buytogether/read?buytogether_number=" + searchBuyTogether[i].buyTogether_number;
			str = str + "'class='cbp-caption'>";
			str = str + "<div class='cbp-caption-defaultWrap'>";
			str = str + "<img src='"+searchBuyTogether[i].photo_path[0]+"' alt=''>";
			str = str + "</div> <div class='cbp-caption-activeWrap'>";
			str = str + "<div class='cbp-l-caption-alignLeft'>";
			str = str + "<div class='cbp-l-caption-body'>";
			str = str + "<div class='cbp-l-caption-title' id='title'>" + searchBuyTogether[i].title;
			str = str + "</div><div class='cbp-l-caption-desc' id='nickname'>by " + searchBuyTogether[i].nickname;
			str = str + "(" + searchBuyTogether[i].reputation + ")";
			str = str + "</div></div></div></div></a></div>";
<<<<<<< HEAD
			
			cube.addItem(str);
		}
		$("#noItem").hide();
		
		$("#pagination").show();
=======
		}
		
		$("#noItem").remove();
		$(".buyTogetherLi").remove();
		$(".buyTogetherList").html(str);

>>>>>>> refs/remotes/origin/master
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
	this.requestBuyTogetherMap = function(scri) {
		
		var parsedResult = dao.listBuyTogetherDao(scri);
		var searchBuyTogether = parsedResult.searchBuyTogether;
		new geoLocation(searchBuyTogether);

	}
	
	//페이징
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