function buytogetherDao() {

	//같이사냥 리스트 요청
	this.listAllDao = function() {

		$.getJSON("/restBuytogether/list", function(data) {

			var template = Handlebars.compile($('#listTemplate').html());

			var html1 = template(data);

			$(".buyTogetherLi").remove();
			$("#buyTogetherList").html(html1);
		});
	}

	//카테고리 리스트 요청
	this.listCategoryDao = function() {

		$.getJSON("/restBuytogether/listCategory", function(data) {

			var str = "<option value=''>선택해주세요.</option>";

			$(data).each(function() {

				str += "<option value='" + this.category_number + "'>";
				str += this.category_name+"</option>";

			});

			$("#category_number").html(str);
		});
	}

	//사냥방식 리스트 요청
	this.listHuntingTypeDao = function() {

		$.getJSON("/restBuytogether/listHuntingType", function(data) {

			var str = "<option value=''>선택해주세요.</option>";

			$(data).each(function() {

				str += "<option value='" + this.hunting_type_number + "'>";
				str += this.hunting_type+"</option>";
			});

			$("#hunting_type_number").html(str);
		});
	}
	
	//사냥상태 리스트 요청
	this.listHuntingStatusDao = function() {

		$.getJSON("/restBuytogether/listHuntingStatus", function(data) {

			var str = "<option value=''>선택해주세요.</option>";

			$(data).each(function() {

				str += "<option value='" + this.hunting_status_number + "'>";
				str += this.status_name+"</option>";
			});

			$("#hunting_status_number").html(str);
		});
	}

	//사진경로
	this.savePhotoPath = function(formData) {

		$.ajax({

			url:'/restBuytogether/uploadAjax',
			type: 'POST',
			data: formData,
			dataType: 'text',
			processData: false,
			contentType: false,
			success: function(data){

				var str="<div class='col-md-3'>";
				str = str + "<img src='/restBuytogether/displayFile?fileName=" + data +"'/>";
				str = str + "<div class='mailbox-attachment-info'>"+data.substr(data.indexOf("_",14)+1);
				str = str + " <small class='btn btn-default btn-xs delbtn' data-src=" + data + ">X</small></div></div>";

				$(".uploadedList").append(str);
			}
		});
	};

	//첨부사진 삭제
	this.deletePhotoDao = function(photo) {

		$.ajax({

			url:'/restBuytogether/deleteFile',
			type: 'POST',
			data: {fileName: photo.attr("data-src")},
			dataType: 'text',
			success: function(result){

				if(result == 'deleted') {
					photo.parent().parent("div").remove();
					photo.parent().parent("span").remove();
				}
			}
		});
	}

	//게시글 쓰기
	this.insertDao = function(buytogether, buyTogetherAddress) {

		$.ajax({
			type : "post",
			url : "/restBuytogether/write",
			header: {
				"Content-Type" : "application/json;charset=UTF-8",
				"X-HTTP-Method-Override" : "POST"
			},
			dataType: "text",	
			data: {
				title : buytogether.title,
				content : buytogether.content,
				path : buytogether.path,
				dueDate : buytogether.duedate,
				joinin_number : buytogether.joinin_number,
				price : buytogether.price,
				category_number : buytogether.category_number,
				user_number : buytogether.user_number,
				hunting_type_number : buytogether.hunting_type_number,
			},
			success : function(result) {

				if(result != null) {

					console.log(buyTogetherAddress);
					$.ajax({
						type : "post",
						url : "/restBuytogether/addressWrite",
						header: {
							"Content-Type" : "application/json;charset=UTF-8",
							"X-HTTP-Method-Override" : "POST"
						},
						dataType: "text",	
						data: {
							buyTogether_number : result,
							buyTogether_address_sido : buyTogetherAddress.buyTogether_address_sido,
							buyTogether_address_sigungu : buyTogetherAddress.buyTogether_address_sigungu,
							buyTogether_address_road_address : buyTogetherAddress.buyTogether_address_road_address,
							longitude : buyTogetherAddress.longitude,
							latitude : buyTogetherAddress.latitude,
							buyTogether_address_detail : buyTogetherAddress.buyTogether_address_detail,
						},
						success : function(data) {
							if(data == "success") {
								document.location.href='/buyTogether/list';
							}
						}
					});

				} else {
					alert("글쓰기 실패");
					document.location.href='/buyTogether/list';
				}

			}
		});
	}

	//같이사냥 리스트(지도)
	this.listBuyTogetherDao = function(scri){
		
		var parsedResult;
		
		$.ajax({
			type : 'post',
			url : '/restBuytogether/listBuyTogether',
			headers : {
				"Content-Type" : "application/json",
				"X-HTTP-Method-Override" : "POST"
			},
			async : false,
			dataType : 'text',
			data : JSON.stringify(scri),
			success : function(result) {

				//data가 map에 담겨 있는 json형식의 문자열이므로 list를 쓰려면 한 단계 추가로 거쳐줘야함.
				parsedResult = JSON.parse(result);

			}
		});
		
		return parsedResult;
	}
	
}