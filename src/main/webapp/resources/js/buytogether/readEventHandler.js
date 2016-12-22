$('head').append('<script src=\'/resources/js/buytogether/buytogetherReadController.js\'><\/script>');

$(document).ready(function() {

	// 로그인한 유저번호 
	var numberuser = sessionStorage.getItem("number");
	// 게시판 넘버
	var buytogether_number =  $(location).attr('search');
	var searchKeyword = buytogether_number.split("?buytogether_number=");
	buytogether_number = searchKeyword[1];
	
	
	var controller = new buytogetherReadController();

	controller.requestRead(buytogether_number);

	// HEADER FOOTER
	$("#buytogetherHeader").load("/views/include/header.html");
	$("#buytogetherFooter").load("/views/include/footer.html");

	// 찜확인 후 하트 색 변경
	var dip = controller.requestCheckDip(buytogether_number,7);

	if(dip == true) {

		$("#heart").attr("class", "glyphicon glyphicon-heart c-font-22 c-font-red-3 c-border-red");

	}

	// 게시판 삭제 
	$(".delete_update_btn").on("click", ".row #buytogether_delete_btn", function() {

		//임시값 유저 번호
		var user_number = 5;

		controller.requestBuytogetherDelete(buytogether_number, user_number);

	});

	// 게시판 수정
	$(".delete_update_btn").on("click", ".row #buytogether_update_btn", function() {

		//임시값 유저 번호
		var user_number = 4;

		if ($(this).val() == "UPDATE") {

			$(this).attr("value", "UPDATING");

			// 수정페이지로 전환
			/*var url = "/buyTogether/updateBuytogether/";
			$(location).attr('href',url);*/

		} else {

			$(this).attr("value", "UPDATE");

			/*controller.requestBuytogetherUpdate(buytogether_number, user_number);*/
		}

	});

	// 전체권한 댓글 Tap
	$("#tapAllList").on("click", function() {

		//전체참여 번호
		var comment_type_number = 1;

		//유저아이디(번호)
		var user_number = 7;

		// 전체 댓글 쓰기 부분
		$('#comment_List').on("click", "#comment_content_Btn1", function() {

			var textarea = $(this).prev();

			//글내용 불러오기
			var comment_content = textarea.val();

			controller.requestCommentInsert(comment_content, comment_type_number, buytogether_number, user_number);

		});

		// 전체 댓글 수정 버튼
		$('#comment_List').on("click", ".updateBtn", function() {

			var div = $(this).parent();
			var div2 = div.prev();
			var textarea = div2.children().eq(1);
			var comment_number = div.attr("data-comment-number");
			var comment_content = textarea.val();


			if ($(this).val() == "수정") {

				textarea.attr("readonly", false);
				$(this).attr("value", "수정완료");

			} else {

				$(this).attr("value", "수정");
				textarea.attr("readonly", true);

				controller.requestCommentUpdate(comment_number, comment_content, comment_type_number);

			}

		});

		// 전체 답글 쓰기 버튼
		$("#comment_List").on("click", ".recommentInsertBtn_A", function() {

			var reply = $(this).parent();
			var comment_parent_number = reply.attr("data-recomment-number");

			var textarea = $(this).prev();
			var comment_content = textarea.val();

			//테스트 용  값
			var user_number = 3;

			controller.requestRecommentInsert(buytogether_number, comment_type_number, comment_parent_number, comment_content, user_number);

		});

		// 전체 답글 수정 부분
		$("#comment_List").on("click", ".recomment_updateBtn_A", function() {

			var div = $(this).parent();
			var div2 = div.prev();
			var textarea = div2.children().eq(1);
			var comment_number = div.attr("data-comment-number");
			var comment_content = textarea.val();

			if ($(this).val() == "수정") {

				textarea.attr("readonly", false);
				$(this).attr("value", "수정완료");

			} else {

				$(this).attr("value", "수정");
				textarea.attr("readonly", true);

				controller.requestCommentUpdate(comment_number, comment_content, comment_type_number);

			}

		});

		//전체 답글 리스트 부분
		$("#comment_List").on("click", ".recommentList_Btn_A", function() {

			var reply = $(this).parent();
			var comment_number = reply.attr("data-comment-number");

			var data = controller.requestAllRecommentList(comment_number, comment_type_number);

			var div = $(this).next();
			var div1 = div.children().eq(0);

			if (comment_number == data[0].comment_parent_number) {

				var template_recomment = Handlebars.compile($('#recommentTemplate_A').html());

				var html_recomment = template_recomment(data);

				div1.children("#recommentLi_a").remove();

				div1.html(html_recomment);

			} else if (comment_number !== data[0].comment_parent_number) {

				alert("답글이 존재하지 없습니다.");

			}
		});

		controller.requestCommentList(buytogether_number, comment_type_number);

	});

	// 참여자 댓글 Tap
	$("#tapChatList").on("click", function() {

		// 참여자 Tap 번호
		var comment_type_number = 2;
		// 유저번호
		var user_number = 6;

		// 같이사냥 참여자 확인(게시판번호, 유저번호)
		var buytoegetherCheck = controller.requestBuytoegetherCheck(buytogether_number, 10);

		if(buytoegetherCheck == true){

			// 참여자 댓글 쓰기 부분
			$('#comment_List2').on("click", "#comment_content_Btn2", function() {

				var textarea = $(this).prev();

				//글내용 불러오기
				var comment_content = textarea.val();

				controller.requestCommentInsert(buytogether_number, comment_type_number, user_number, comment_content);

			});

			// 참여자 댓글 수정 버튼(댓글 번호, 내용)
			$("#comment_List2").on("click", ".updateBtn_B", function() {

				var div = $(this).parent();
				var div2 = div.prev();
				var textarea = div2.children().eq(1);
				var comment_number = div.attr("data-comment-number");
				var comment_content = textarea.val();

				if ($(this).val() == "수정") {

					textarea.attr("readonly", false);
					$(this).attr("value", "수정완료");

				} else {

					$(this).attr("value", "수정");
					textarea.attr("readonly", true);

					controller.requestCommentUpdate(buytogether_number, comment_number, comment_content, comment_type_number);

				}

			});

			// 참여자 답글 쓰기 버튼
			$("#comment_List2").on("click", "#recommentInsertBtn", function() {

				var reply = $(this).parent();
				var comment_parent_number = reply.attr("data-recomment-number");

				var textarea = $(this).prev();
				var comment_content = textarea.val();

				controller.requestRecommentInsert(buytogether_number, comment_type_number, comment_parent_number, comment_content, user_number);

			});

			// 참여자 답글 수정 부분
			$("#comment_List2").on("click", ".recomment_updateBtn_B", function() {

				var div = $(this).parent();
				var div2 = div.prev();
				var textarea = div2.children().eq(1);
				var comment_number = div.attr("data-comment-number");
				var comment_content = textarea.val();

				if ($(this).val() == "수정") {

					textarea.attr("readonly", false);
					$(this).attr("value", "수정완료");

				} else {

					$(this).attr("value", "수정");
					textarea.attr("readonly", true);

					controller.requestCommentUpdate(buytogether_number, comment_number, comment_content, comment_type_number);

				}

			});

			// 참여자 답글 리스트 출력
			$("#comment_List2").on("click", ".recommentList_Btn_B", function() {

				var reply = $(this).parent();
				var comment_number = reply.attr("data-comment-number");

				var data = controller.requestRecommentList(comment_number, comment_type_number);

				var div = $(this).next();
				var recommentList = div.children().eq(0);

				if (comment_number == data[0].comment_parent_number) {

					var template_recomment = Handlebars.compile($('.recommentTemplate_B').html());

					var html_recomment = template_recomment(data);

					recommentList.children("#recommentLi_b").remove();

					recommentList.html(html_recomment);

				} else {

					alert("답글이 존재하지 않습니다.");
				}

			});


			controller.requestCommentList(buytogether_number, comment_type_number);


		} else if(buytoegetherCheck == false){

			alert("같이사냥 참여한 유저만 사용 가능합니다.");

		}

	});

	//	전체 댓글 and 답글 삭제 버튼
	$("#comment_List").on("click", ".deleteBtn", function() {

		var reply = $(this).parent();
		var comment_number = reply.attr("data-comment-number");
		controller.requestCommentDelete(comment_number);

	});

	//	참여자 댓글 and 답글 삭제 버튼
	$("#comment_List2").on("click", ".deleteBtn", function() {

		var reply = $(this).parent();
		var comment_number = reply.attr("data-comment-number");

		controller.requestCommentDelete(comment_number);

	});

	// 찜하기 버튼 클릭
	$(document).on("click", ".iconClass .dip_heratIcon", function() {

		// 유저넘버 임의값
		var user_number = 2;

		var heartIcon = $(this).children();
		var btnClass = heartIcon.attr("class");

		if (btnClass == "icon-heart c-font-22 c-font-red-3 c-border-red") {

			controller.requestDipBtn(buytogether_number, user_number);
			heartIcon.attr("class", "glyphicon glyphicon-heart c-font-22 c-font-red-3 c-border-red");

		} else if (btnClass == "glyphicon glyphicon-heart c-font-22 c-font-red-3 c-border-red") {

			controller.requestCancleDip(buytogether_number, user_number);
			heartIcon.attr("class", "icon-heart c-font-22 c-font-red-3 c-border-red");

		}

	});

	// 신고 버튼 팝업창
	$(document).on("click", ".report_btn", function() {

		// 댓글번호
		var span = $(this).parent();
		var label = span.parent();
		var div_comment = label.parent();
		var comment_number = div_comment.attr("data-comment-number");

		// template + data를 buytogetherPopup에 뿌려준다.
		var data = controller.requestCommentReport(buytogether_number, comment_number);

		/*sendMessage(data);

		var reportsTemplate = Handlebars.compile($(".reportsTemplate").html());

		var reportHtml = reportsTemplate(data);

		alert("중간 데이터 = " + reportHtml);

		var report1 = $("#reports").html(reportHtml);*/

		window.open("buytogetherPopup.html", "report", "width=600, height=670, left=100, top=50");

	});
	
	//같이 사냥 버튼 클릭
	$(document).on("click", ".buytogetherBtn .buy_together_btn", function() {

		//임시 값
		var matching_status_number = 1;
		var user_number = 5;

		controller.requestRegistBuytogether(buytogether_number, matching_status_number, user_number);

	});
	
	//같이사냥 신고페이지 신고버튼 이벤트
	$(document).on("click", "#report_btn", function() {

		//임의값 test 용
		var user_number = 5;

		// 고정값
		if ($(':radio[name="optradio"]:checked').is(":checked") == true) {

			var declare_category_number = $(':radio[name="optradio"]:checked').val();

		}

		var declare_reason = $("#text").val();
		var type_number = 1;
		var declare_status = "false";

		var reportData = {
				buytogether_number : buytogether_number,
				user_number : user_number,
				declare_category_number : declare_category_number,
				type_number : type_number,
				declare_reason : declare_reason,
				declare_status : declare_status
		};

		controller.requestSendReport(reportData);

	});

});

/*//데이터 전달
function sendMessage(data){

	window.postMessage(data, "buytogetherPopup.html");

}

//데이터 수신
window.onmessage = function(data){

	var reportsTemplate = Handlebars.compile($(".reportsTemplate").html());

	var reportHtml = reportsTemplate(data);

	alert("중간 데이터 = " + reportHtml);

	$("#reports").html(reportHtml);

}*/