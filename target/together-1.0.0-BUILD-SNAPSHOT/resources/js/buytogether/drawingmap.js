var map;

function map_initialize(myLat, myLng) {
	
	// 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
	var infowindow = new daum.maps.InfoWindow({zIndex:1});

	var mapContainer = document.getElementById('map');
	var mapOption = {
		center: new daum.maps.LatLng(myLat, myLng),
		level: 3
	};

	var map = new daum.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

	// 마커가 표시될 위치입니다 
	var markerPosition  = new daum.maps.LatLng(myLat, myLng); 

	// 마커를 생성합니다
	var marker = new daum.maps.Marker({
	    position: markerPosition
	});

	// 마커가 지도 위에 표시되도록 설정합니다
	marker.setMap(map);
	
	// 마커에 커서가 오버됐을 때 마커 위에 표시할 인포윈도우를 생성합니다
	var iwContent = '<label class="control-label">현재위치</label>'; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다

	// 인포윈도우를 생성합니다
	var infowindow = new daum.maps.InfoWindow({
	    content : iwContent
	});

	// 마커에 마우스오버 이벤트를 등록합니다
	daum.maps.event.addListener(marker, 'mouseover', function() {
	  // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
	    infowindow.open(map, marker);
	});

	// 마커에 마우스아웃 이벤트를 등록합니다
	daum.maps.event.addListener(marker, 'mouseout', function() {
	    // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
	    infowindow.close();
	});
	
	// 아래 코드는 지도 위의 마커를 제거하는 코드입니다
	// marker.setMap(null);    
}