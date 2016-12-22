var map;

function geoLocation(searchBuyTogether) {
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition,showError);
	} else {
		alert("Geolocation is not supported by this browser");
	}
}

function showPosition(position, searchBuyTogether) {
	
	var nLat = position.coords.latitude;
	var nLng = position.coords.longitude;
	
	console.log("nLat : " + nLat);
	console.log("nLng : " + nLng);
	
	map_initialize(nLat,nLng, searchBuyTogether);
	
}

function showError(error) {
	
	console.log(error);
	alert("에러발생!");
}

function map_initialize(myLat, myLng, searchBuyTogether) {
	
	var mapContainer = document.getElementById('map');
	var mapOption = {
		center: new daum.maps.LatLng(myLat, myLng),
		level: 3
	};

	map = new daum.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
	
	// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
	var zoomControl = new daum.maps.ZoomControl();
	map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT);  
	
	var str = "";
	
	// 여러개의 마커
	var positions = [
		{ content: '<div>제목</div>', latlng: new daum.maps.LatLng(myLat+1.0, myLng+1.0) },
		{ content: '<div>내 위치</div>', latlng: new daum.maps.LatLng(myLat, myLng) }
		
		];

	// 지도가 확대 또는 축소되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
	daum.maps.event.addListener(map, 'zoom_changed', function() {        
/*		//처음 설정했던 지도 레벨과 현재 지도 레벨이 다르다면,
		if(map.getLevel() != mapOption.level) {
			
			//리스트 다시 불러오기
			
		}*/
		
	});
	
	for (var i = 0; i < positions.length; i ++) {
	    // 마커를 생성합니다
	    var marker = new daum.maps.Marker({
	        map: map, // 마커를 표시할 지도
	        position: positions[i].latlng // 마커의 위치
	    });

	    // 마커에 표시할 인포윈도우를 생성합니다 
	    var infowindow = new daum.maps.InfoWindow({
	        content: positions[i].content // 인포윈도우에 표시할 내용
	    });

	    // 마커에 이벤트를 등록하는 함수 만들고 즉시 호출하여 클로저를 만듭니다
	    // 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
	    (function(marker, infowindow) {
	        // 마커에 mouseover 이벤트를 등록하고 마우스 오버 시 인포윈도우를 표시합니다 
	        daum.maps.event.addListener(marker, 'mouseover', function() {
	            infowindow.open(map, marker);
	        });

	        // 마커에 mouseout 이벤트를 등록하고 마우스 아웃 시 인포윈도우를 닫습니다
	        daum.maps.event.addListener(marker, 'mouseout', function() {
	            infowindow.close();
	        });
	    })(marker, infowindow);
	}
	
	// 아래 코드는 지도 위의 마커를 제거하는 코드입니다
	// marker.setMap(null);    
}