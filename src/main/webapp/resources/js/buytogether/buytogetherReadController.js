$('head').append('<script src=\'/resources/js/buytogether/buytogetherReadDao.js\'><\/script>');


function buytogetherReadController() {

	var dao = new buytogetherReadDao();

	// 같이사냥 조회
	this.requestRead = function(buytogether_number) {
		
		dao.ReadDao(buytogether_number);
	
	}

	// 같이사냥 게시판 삭제
	this.requestBuytogetherDelete = function(buytogether_number, user_number){

		dao.buytogetherDeleteDao(buytogether_number, user_number);

	}

	// 같이사냥 게시판 수정
	this.requestBuytogetherUpdate = function(buytogether_number, user_number){

		dao.buytogetherUpdateDao(buytogether_number, user_number);

	}

	// 같이사냥 댓글, 답글 입력
	this.requestCommentInsert = function(buytogether_number, comment_type_number, user_number, comment_content){

		dao.commentInsertDao(buytogether_number, comment_type_number, user_number, comment_content);

	}

	// 같이사냥 댓글 리스트 부분
	this.requestCommentList = function(buytogether_number, comment_type_number){

		dao.commentListDao(buytogether_number, comment_type_number);

	}

	// 같이사냥 삭제 부분
	this.requestCommentDelete = function(comment_number){

		dao.commentDeleteDao(comment_number);

	}

	// 같이사냥 댓글,답글 수정 부분
	this.requestCommentUpdate = function(buytogether_number, comment_number, comment_content, comment_type_number){

		dao.commentUpdateDao(buytogether_number, comment_number, comment_content, comment_type_number);

	}

	// 같이사냥 답글 쓰기 부분
	this.requestRecommentInsert = function(buytogether_number, comment_type_number, comment_parent_number, comment_content, user_number){


		dao.recommentInsertDao(buytogether_number, comment_type_number, comment_parent_number, comment_content, user_number);

	}

	// 같이사냥 권한 답글 리스트 부분
	this.requestRecommentList = function(comment_number, comment_type_number){

		var data = dao.recommentListDao(comment_number, comment_type_number);

		return data;
	}


	// 같이사냥 전체 답글 리스트 부분
	this.requestAllRecommentList = function(comment_number, comment_type_number){

		var data = dao.recommentListDao(comment_number, comment_type_number);

		return data;

	}

	// 같이사냥 버튼
	this.requestRegistBuytogether = function(buytogether_number, matching_status_number, user_number){

		dao.registBuytogetherDao(buytogether_number, matching_status_number, user_number);

	}

	// 같이사냥 찜하기 버튼
	this.requestDipBtn = function(buytogether_number, user_number){

		dao.dipBtnDao(buytogether_number, user_number);

	}

	// 같이사냥 찜하기 취소 버튼
	this.requestCancleDip = function(buytogether_number, user_number){

		dao.cancleDipDao(buytogether_number, user_number);

	}

	// 같이사냥 찜 확인
	this.requestCheckDip = function(buytogether_number, user_number){

		return dao.checkDipDao(buytogether_number, user_number);
	}

	// 같이사냥 댓글 신고버튼
	this.requestCommentReport = function(buytogether_number, comment_number){

		var data = dao.commentReportDao(buytogether_number, comment_number);
		
		return data;
	}
	
	// 신고페이지 신고버튼 클릭
	this.requestSendReport = function(reportData){
		
		dao.sendReportDao(reportData);
			
	}
	
	// 같이사냥 참여자 확인
	this.requestBuytoegetherCheck = function(buytogether_number, user_number){
		
		return dao.buytoegetherCheckDao(buytogether_number, user_number);
		
	}

}