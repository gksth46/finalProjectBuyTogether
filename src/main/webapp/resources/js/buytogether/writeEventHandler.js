$('head').append('<script src=\'/resources/js/buytogether/buytogetherController.js\'><\/script>');
var buytogetherAddress = {};

function execDaumPostcode() {
	
	new daum.Postcode({
		oncomplete: function(data) {

			var coords;
			// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

			// 각 주소의 노출 규칙에 따라 주소를 조합한다.
			// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
			var fullAddr = ''; // 최종 주소 변수
			var extraAddr = ''; // 조합형 주소 변수

			// 사용자가 선택한 주소 타입에 관계없이 도로명주소 값을 가져온다.
			fullAddr = data.roadAddress;

			// 사용자가 선택한 주소가 도로명 타입일때 조합한다.
			if(data.userSelectedType === 'R'){
				//법정동명이 있을 경우 추가한다.
				if(data.bname !== ''){
					extraAddr += data.bname;
				}
				// 건물명이 있을 경우 추가한다.
				if(data.buildingName !== ''){
					extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
				}
				// 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
				fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
			}

			//주소 정보를 해당 필드에 넣는다.
			document.getElementById('address').value = fullAddr;

			// 커서를 상세주소 필드로 이동한다.
			document.getElementById('address_detail').focus();

			var geocoder = new daum.maps.services.Geocoder();
			var longitude;
			var latitude;
			// 주소로 좌표를 검색	
			geocoder.addr2coord(data.roadAddress, function(status, result) {

				// 정상적으로 검색이 완료됐으면 
				if (status === daum.maps.services.Status.OK) {

					latitude = result.addr[0].lat;
					longitude = result.addr[0].lng;
					
				}
				
				buytogetherAddress.buyTogether_address_sido = data.sido;
				buytogetherAddress.buyTogether_address_sigungu = data.sigungu;
				buytogetherAddress.buyTogether_address_road_address = data.roadAddress;
				buytogetherAddress.longitude = longitude;
				buytogetherAddress.latitude = latitude;
			});
		
		}
	}).open();
}

function saveFunction() {
	
	var str = "";
	$(".uploadedList .delbtn").each(function(index) {
		
		str = str + "<input type='hidden' name='files["+index+"]'";
		str = str + "value='" + $(this).attr("data-src") + "'>";
		
	});
	
	$('#tx_editor_form').append(str);
	
	var data = $('#tx_editor_form').serializeJSON();
	
	var buytogether = {
			title : data.title,
			content : data.content,
			duedate : data.duedate,
			joinin_number : data.joinin_number,
			price : data.price,
			category_number : data.category_number,
			user_number : 1,
			hunting_type_number : data.hunting_type_number,
			path : data.files
	};
	
	buytogetherAddress.buyTogether_address_detail = data.address_detail;
	
	var controller = new buytogetherController();
	controller.requestSaveBuyTogether(buytogether, buytogetherAddress);
}

$(document).ready(function (){

	var count = 0;
	var controller = new buytogetherController();

	controller.requestCategoryList();
	controller.requestHuntingTypeList();
	
	//같이사냥 글쓰기
	$("#duedate").datepicker({
		dateFormat : 'yy-mm-dd',
		prevText : '이전 달',
		nextText : '다음 달',
		monthNames : [ '1월', '2월', '3월', '4월',
		               '5월', '6월', '7월', '8월', '9월',
		               '10월', '11월', '12월' ],
	    monthNamesShort : [ '1월', '2월', '3월', '4월',
	                        '5월', '6월', '7월', '8월', '9월',
	                        '10월', '11월', '12월' ],
		dayNames : [ '일', '월', '화', '수', '목', '금',
		             '토' ],
		dayNamesShort : [ '일', '월', '화', '수', '목',
		                  '금', '토' ],
		dayNamesMin : [ '일', '월', '화', '수', '목',
		                '금', '토' ],
	    showMonthAfterYear : true,
	    changeMonth : true,
	    changeYear : true,
	    yearSuffix : '년',
	    minDate : 0
	});

	//사진첨부 이벤트
	$(".fileDrop").on("dragenter dragover", function(event) {
		event.preventDefault();
	});

	$(".fileDrop").on("drop", function(event) {
		event.preventDefault();


		var files = event.originalEvent.dataTransfer.files;
		var file;

		for(var i = 0; i < files.length; i++ ){

			var formatName = files[i].name.substring(files[i].name.lastIndexOf(".")+1).toUpperCase();

			//이미지파일만 서버에 전송
			if((formatName == "JPG" || formatName == "GIF" || formatName == "PNG") && count<= 4 ){
				
				file = files[i];
				var formData = new FormData();
				formData.append("file", file);

				controller.requestPhotoPath(formData);
				count++;
			} else if(count > 4){

				alert("사진은 4장까지만 첨부할 수 있어요");
				
			} else {

				alert("사진파일만 첨부 가능합니다!!");
			}
		}

	});
	
	$(".uploadedList").on("click", "small", function(event) {
		
		var that = $(this);
		
		controller.requestPhotoDelete(that);
		count--;
		
	});
});

