TweenMax.from("form", 1, {ease:Expo.easeOut, right:1600});
TweenMax.from("#suitable", 1, {ease:Expo.easeOut, top:800, opacity:0, scale:0, delay:0.3});
TweenMax.from("#temperature", 1, {ease:Expo.easeOut, top:800, opacity:0, scale:0, delay:0.6});
TweenMax.from("#wind", 1, {ease:Expo.easeOut, top:800, opacity:0, scale:0, delay:0.9});


function getData() {
	
	var url = "https://api.openweathermap.org/data/2.5/weather"; //url van de api openweathermap
	var apiKey ="b0c8dafa512a0134e90df6ece3c2b7a2"; //apikey
	var city = document.getElementById("city").value; //leest wat er wordt getypt bij id city
	var request = url + "?" + "appid=" + apiKey + "&" + "q=" + city; //vormt de request

	// fetch huidig weer
	fetch(request).then(function(response) {
		return response.json();
	})

	// laat bij succes het weer zien
	.then(function(response) {
		onSuccess(response);
	})

	// laat bij fout error zien
	.catch(function (error) {
		onError(error);
	});
}


function onSuccess(response) {

	var celsius = Math.floor(response.main.temp - 273.15); //zorgt voor temp in celsius
	var wind = Math.round(response.wind.speed * 3.6); //haalt windkracht op
	var weatherDOM = document.getElementById('degrees'); //plaatst de temperatuur in id degrees
	var windDOM = document.getElementById('kmperh'); //plaatst de windkracht in id kmperh
	weatherDOM.innerHTML = celsius + "&#176;C"; //zorgt voor 'graden celsius' achter de temperatuur
	windDOM.innerHTML = wind + " Km/h"; //zorgt voor km/h achter de windsnelheid

	if (celsius <= 5 || wind >= 20) {
	document.getElementById("logo").src='nee.svg';
	}
	else {
	document.getElementById("logo").src='ja.svg';
	}

	TweenMax.from("#suitable", 1, {ease:Expo.easeOut, left:800, opacity:0, scale:0});
	TweenMax.from("#temperature", 1, {ease:Expo.easeOut, right:800, opacity:0, scale:0, delay:0.3});
	TweenMax.from("#wind", 1, {ease:Expo.easeOut, left:800, opacity:0, scale:0, delay:0.6});
}

function onError(error) {
	console.error('Fetch request failed', error); //zet error in console
	alert('No data available... Did you enter a valid city?'); //geef alert weer
}

document.getElementById("search").onclick = function(){ //geeft temperatuur bij klik op id search
	getData();
};







