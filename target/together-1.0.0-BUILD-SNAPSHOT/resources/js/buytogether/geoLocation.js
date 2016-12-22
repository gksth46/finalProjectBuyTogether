function geoLocation()
{
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition,showError);
	} else {
		alert("Geolocation is not supported by this browser");
	}
}

var nLat;
var nLng;

function showPosition(position) {
	
	nLat = position.coords.latitude;
	nLng = position.coords.longitude;
	
	console.log("nLat : " + nLat);
	console.log("nLng : " + nLng);
	
	map_initialize(nLat,nLng);
	
}

function showError(error) {
	
	console.log(error);
	alert("에러발생!");
}