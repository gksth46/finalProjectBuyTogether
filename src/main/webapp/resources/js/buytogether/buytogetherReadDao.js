
function buytogetherReadDao() {

	// 같이사냥 글 조회
	this.ReadDao = function(buytogether_number) {

		$.ajax({
			type : 'get',
			url : '/restBuytogetherRead/read/'  + buytogether_number ,
			async : false,
			headers : {
				"Content-type" : "application/json",
				"X-HTTP-Method-Override": "GET"
			},
			dataType : 'json',
			success : function(data){

				var listOneTemplate = Handlebars.compile($('#listOneTemplate').html());

				var listOneHtml = listOneTemplate(data);

				$("#buyTogetherListOne").html(listOneHtml);

			}

		});
	}

	// 같이사냥 게시글 삭제
	this.buytogetherDeleteDao = function(buytogether_number, user_number){

		$.ajax({
			type: 'delete',
			url: '/restBuytogetherRead/delete/' + buytogether_number + "/" + user_number,
			async : false,
			headers: {
				"Content-type" : "application/json",
				"X-HTTP-Method-Override": "DELETE"
			},
			dataType: 'text',
			success: function(data){
				console.log("success" + data);
				if(data == "success"){

					alert("게시글이 삭제 되었습니다.");

				} else {

					alert("게시글이 삭제가 실패함");

				}
			}

		});

	}

	// 같이 사냥 게시글 수정
	this.buytogetherUpdateDao = function(buytogether_number, user_number){

		/*$.ajax({
			type: 'put',
			url: '/restBuytogetherRead/',
			headers: {
				"Content-type" : "application/json",
				"X-HTTP-Method-Override": "PUT"
			},
			data : JSON.stringify({
				comment_content : comment_content,
				comment_number : comment_number,
				buytogether_number : buytogether_number
			}),
			dataType: 'text',
			success: function(data){

				if(data == "success"){

						alert("전체 댓글이 수정 되었습니다.");
						getPageTap1("/restBuytogetherRead/commentList/" + buytogether_number + "/" + comment_type_number);

				} else {

					alert("댓글 수정이 실패 하였습니다.");

				}
			}

		});
		 */
	}

	// 같이 사냥 댓글 입력(댓글 내용, 유저 번호(아이디), 게시판 번호, 댓글 타입번호)
	this.commentInsertDao = function(buytogether_number, comment_type_number, user_number, comment_content){

		$.ajax({
			type : "post",
			url : "/restBuytogetherRead/",
			async : false,
			headers : {
				"Content-type" : "application/json",
				"X-HTTP-Method-Override": "POST"
			},
			dataType: 'text',
			data: JSON.stringify({
				comment_type_number : comment_type_number,
				comment_content : comment_content,
				buytogether_number : buytogether_number,
				user_number : user_number
			}),
			success: function(data){

				if(data == "success"){

					if(comment_type_number == 1){
						getPageTap1("/restBuytogetherRead/commentList/" + buytogether_number + "/" + comment_type_number);
						alert("댓글이 입력 되었습니다.");
					} else if(comment_type_number == 2){
						getPageTap2("/restBuytogetherRead/commentList/" + buytogether_number + "/" + comment_type_number);
						alert("댓글이 입력 되었습니다.");
					}

				} else {

					alert("등록되지 않았습니다.");
				}

			}

		});		

	}

	// 같이사냥 답글 리스트 부분
	this.recommentListDao = function(comment_number, comment_type_number){

		var re;

		$.ajax({
			type : 'get',
			url : '/restBuytogetherRead/recommentList/' + comment_number + "/" + comment_type_number,
			async : false,
			headers : {
				"Content-type" : "application/json",
				"X-HTTP-Method-Override": "GET"
			},
			dataType : 'json',
			success : function(data){

				re = data;

			}

		});

		return re;

	}

	// 같이사냥 답글 쓰기 부분
	this.recommentInsertDao = function(buytogether_number, comment_type_number, comment_parent_number, comment_content, user_number){

		$.ajax({
			type : "post",
			url : "/restBuytogetherRead/recommentInsert/",
			async : false,
			headers : {
				"Content-type" : "application/json",
				"X-HTTP-Method-Override": "POST"
			},
			dataType: 'text',
			data: JSON.stringify({
				comment_type_number : comment_type_number,
				comment_content : comment_content,
				buytogether_number : buytogether_number,
				user_number : user_number,
				comment_parent_number : comment_parent_number
			}),
			success: function(data){

				if(comment_type_number == 1){

					getPageTap1("/restBuytogetherRead/commentList/" + buytogether_number + "/" + comment_type_number);

				} else if(comment_type_number == 2){

					getPageTap2("/restBuytogetherRead/commentList/" + buytogether_number + "/" + comment_type_number);

				} else {

					alert("답글쓰기 실패하였습니다.");
				}

			}
		});
	}

	// 같이 사냥 댓글 리스트
	this.commentListDao = function(buytogether_number, comment_type_number){

		if(comment_type_number == 1){

			$.getJSON("/restBuytogetherRead/commentList/" + buytogether_number + "/" + comment_type_number, function(data) {

				var template3 = Handlebars.compile($('.commentTemplate').html());

				var html3 = template3(data);

				$(".commentLi").remove();

				$("#comment_List").html(html3);

			});

		} else if(comment_type_number == 2){

			$.getJSON("/restBuytogetherRead/commentList/" + buytogether_number + "/" + comment_type_number, function(data) {

				var template4 = Handlebars.compile($('.commentTemplate2').html());

				var html4 = template4(data);

				$(".commentLi2").remove();

				$("#comment_List2").html(html4);

			});
		}

	}

	//	같이 사냥 댓글 삭제(댓글 번호, 부모 댓글 번호)
	this.commentDeleteDao = function(comment_number){

		$.ajax({
			type: 'delete',
			url: '/restBuytogetherRead/' + comment_number,
			async : false,
			headers: {

				"Content-type" : "application/json",
				"X-HTTP-Method-Override": "DELETE"
			},
			dataType: 'text',
			success: function(data){
				console.log("success" + data);
				if(data == "success"){

					alert("댓글이 삭제 되었습니다.");

				} else {

					alert("댓글 삭제가 실패함");

				}
			}

		});

	}

	// 같이 사냥 댓글 수정(댓글 번호, 유저번호, 내용)
	this.commentUpdateDao = function(buytogether_number, comment_number, comment_content, comment_type_number){

		$.ajax({
			type: 'put',
			url: '/restBuytogetherRead/' + comment_number,
			headers: {
				"Content-type" : "application/json",
				"X-HTTP-Method-Override": "PUT"
			},
			data : JSON.stringify({
				comment_content : comment_content,
				comment_number : comment_number,
				buytogether_number : buytogether_number
			}),
			dataType: 'text',
			success: function(data){

				if(data == "success"){

					if(comment_type_number == 1){

						alert("전체 댓글이 수정 되었습니다.");
						getPageTap1("/restBuytogetherRead/commentList/" + buytogether_number + "/" + comment_type_number);

					} else if(comment_type_number == 2){

						alert("권한 댓글이 수정 되었습니다.");
						getPageTap2("/restBuytogetherRead/commentList/" + buytogether_number + "/" + comment_type_number);

					}

				} else {

					alert("댓글 수정이 실패 하였습니다.");

				}
			}

		});

	}

	// 같이사냥 버튼
	this.registBuytogetherDao = function(buytogether_number, matching_status_number, user_number){

		$.ajax({
			type : "post",
			url : "/restBuytogetherRead/buytogetherBtn/" + buytogether_number + "/" + matching_status_number + "/" + user_number,
			async : false,
			headers : {
				"Content-type" : "application/json",
				"X-HTTP-Method-Override": "POST"
			},
			dataType: 'text',
			success: function(data){


			}
		});
	}

	// 같이사냥 찜하기 버튼
	this.dipBtnDao = function(buytogether_number, user_number){


		$.ajax({
			type : "post",
			url : "/restBuytogetherRead/dipBtn/" + buytogether_number + "/" + user_number,
			async : false,
			headers : {
				"Content-type" : "application/json",
				"X-HTTP-Method-Override": "POST"
			},
			dataType: 'text',
			success: function(data){


			}
		});


	}

	// 같이사냥 찜하기 취소 버튼
	this.cancleDipDao = function(buytogether_number, user_number){

		$.ajax({
			type: 'delete',
			url: '/restBuytogetherRead/cancleDip/' + buytogether_number + "/" + user_number,
			async : false,
			headers: {

				"Content-type" : "application/json",
				"X-HTTP-Method-Override": "DELETE"
			},
			dataType: 'text',
			success: function(data){


			}

		});

	}

	// 해당글이 찜 되어있는지 확인
	this.checkDipDao = function(buytogether_number, user_number) {

		var result = false;

		$.ajax({
			type: 'post',
			url: '/restBuytogetherRead/checkDip/' + buytogether_number + "/" + user_number,
			async : false,
			headers: {

				"Content-type" : "application/json",
				"X-HTTP-Method-Override": "post"
			},
			dataType: 'text',
			success: function(data){
				if(data == "success") {
					result = true;
				}
			}

		});

		return result;
	}

	// 댓글 신고 작성자  / 내용 가지고오기
	this.commentReportDao = function(buytogether_number, comment_number){

		var data;

		$.ajax({
			type : 'get',
			url : '/restBuytogetherRead/commentReport/' + buytogether_number + "/" + comment_number,
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

	// 신고페이지 신고하기버튼 이벤트
	this.sendReportDao = function(reportData){

		$.ajax({
			type : "post",
			url : "/restBuytogetherRead/sendReport/",
			async : false,
			headers : {
				"Content-type" : "application/json",
				"X-HTTP-Method-Override": "POST"
			},
			dataType: 'text',
			data: JSON.stringify(reportData),
			success: function(data){

				alert("성공");

			}
		});

	}

	// 같이사냥 참여자 확인
	this.buytoegetherCheckDao = function(buytogether_number, user_number){

		var result = false;

		$.ajax({
			type: 'post',
			url: '/restBuytogetherRead/buytoegetherCheck/' + buytogether_number + "/" + user_number,
			async : false,
			headers: {

				"Content-type" : "application/json",
				"X-HTTP-Method-Override": "post"
			},
			dataType: 'text',
			success: function(data){
				if(data == "success") {
					
					result = true;
					
				} else if(data == "fail"){
					
					result = false;
					
				}
			}

		});

		return result;

	}

}

//전체 댓글 페이지 전환 부분
function getPageTap1(pageInfo){

	$.getJSON(pageInfo, function(data){

		var template3 = Handlebars.compile($('.commentTemplate').html());

		var html3 = template3(data);

		$(".commentLi").remove();

		$("#comment_List").html(html3);
	});

}

//권한 댓글 페이지 전환 부분
function getPageTap2(pageInfo){

	$.getJSON(pageInfo, function(data){

		var template4 = Handlebars.compile($('.commentTemplate2').html());

		var html4 = template4(data);

		$(".commentLi2").remove();

		$("#comment_List2").html(html4);

	});

}
