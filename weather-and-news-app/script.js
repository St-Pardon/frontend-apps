 import { conditionCode,  svg, weiodData, category } from './data.js';
// import { conditionCode, weatherData, svg, weiodData, category } from './data.js';

var weatherData, newsData;
let loc = "woeid=1398823"
let loc2 = "lat:4.815, long:7.059, re:8403m"
let selectCategory = "category=World_Africa"
// var woeidNum = 1398823;

// fetch("https://yahoo-weather5.p.rapidapi.com/weather?woeid="+ woeidNum +"&format=json&u=c", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "yahoo-weather5.p.rapidapi.com",
// 		"x-rapidapi-key": "47c3e55b61msh853f2b8deb9964ap17c226jsn189c8c30756b"
// 	}
// })
// .then(response => {
// 	return  response.json();
// })
// .then(data => {
// 	weatherData = data;
// 	initValue();
// })
// .catch(err => {
// 	console.error(err);
// });
const fetchNews = async (cat, loc2) =>{
	const res = await fetch("https://bing-news-search1.p.rapidapi.com/news?"+cat+"&mkt=en-US&safeSearch=Off&textFormat=Raw", {
		"method": "GET",
		"headers": {
			"x-bingapis-sdk": "true",
			"x-search-location": loc2,
			"x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
			"x-rapidapi-key": "47c3e55b61msh853f2b8deb9964ap17c226jsn189c8c30756b"
		}
	});
	const data = await res.json();
	newsData = data;
	initNews();
}



const fetchData = async (loc) => {
	const res = await fetch("https://yahoo-weather5.p.rapidapi.com/weather?"+loc+"&format=json&u=c", {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "yahoo-weather5.p.rapidapi.com",
			"x-rapidapi-key": "47c3e55b61msh853f2b8deb9964ap17c226jsn189c8c30756b"
		}
	});
	const data = await res.json()
	weatherData = data;
	initValue();
}

const getCurrentPosition = async () => {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			(position) => resolve(position),
			(error) => reject(error)
		);
	});
};
getCurrentPosition()
	.then(data => {
		loc = `lat=${Number.parseFloat(data.coords.latitude).toFixed(3)}&long=${Number.parseFloat(data.coords.longitude).toFixed(3)}`;
		loc2 = `lat:${Number.parseFloat(data.coords.latitude).toFixed(3)}, long:${Number.parseFloat(data.coords.longitude).toFixed(3)}, re:${Math.round(data.coords.accuracy)}m`;
		fetchData(loc);
		fetchNews(selectCategory, loc2);
	})
	.catch(err=>{
		fetchData(loc);
		fetchNews(selectCategory, loc2);
		console.log("this is the error " + err.message);
	});


const city = document.querySelector(".city");
const date = document.querySelector(".date");
const weatherIcon = document.querySelector("#icon");
const weatherName = document.querySelector("#weather");
const temprature = document.querySelector("#temp");
const cityWoied = document.querySelector("#city-woied");
const newsCategory = document.querySelector("#news-category");
const chill = document.querySelector("#chill");
const direction = document.querySelector("#direction");
const speed = document.querySelector("#speed");
const humidity = document.querySelector("#humidity");
const visibility = document.querySelector("#visibility");
const pressure = document.querySelector("#pressure");
const forcasts = document.querySelector("#forcasts");
const newsHeading = document.querySelector("#news-heading");


// location selection 
const woiedDataArr = Object.keys(weiodData).sort();
woiedDataArr.map(val => {
	var option = document.createElement('option');
	option.innerText = val;
	option.setAttribute('value', val);
	cityWoied.append(option);
});


cityWoied.addEventListener('change', e => {
	loc = `woeid=${weiodData[e.target.value]}`;
	fetchData(loc);
});


// category selection 
const categoryArr = Object.keys(category).sort();
categoryArr.map(val => {
	var categoryOption = document.createElement('option');
	categoryOption.innerText = val;
	categoryOption.setAttribute('value', val);
	newsCategory.append(categoryOption);
});


newsCategory.addEventListener('change', e => {
	selectCategory = `category=${category[e.target.value]}`;
	fetchNews(selectCategory, loc2);
});



function initValue(){
	const day = new Date(weatherData.forecasts[0].date * 1000);
	weatherName.innerText = conditionCode[weatherData.current_observation.condition.code]
	city.innerHTML = weatherData.location.city;
	date.innerHTML = day.toDateString();
	weatherIcon.src = `./svg/${svg[9]}`;
	temprature.innerText = weatherData.current_observation.condition.temperature;
	chill.innerText = `${weatherData.current_observation.wind.chill} `;
	direction.innerText = `${weatherData.current_observation.wind.direction} `;
	speed.innerText = `${weatherData.current_observation.wind.speed} `;
	humidity.innerText = `${weatherData.current_observation.atmosphere.humidity} `;
	visibility.innerText = `${weatherData.current_observation.atmosphere.visibility} `;
	pressure.innerText = `${weatherData.current_observation.atmosphere.pressure} `;
	forcasts.innerHTML= "";
	weatherData.forecasts.map((val, i)=>{
		if(i >= 1 && i < 8){
			let forcastDate = new Date(val.date * 1000);
			var div = document.createElement('div');
			div.innerHTML= `<div class="forcast-items">
                <p class="forcast-day">${forcastDate.toDateString()}</p>
                <div class="forcast-info-container">
                    <img class="forcast-icon icon" src="./svg/${svg[val.code]}" alt="">
                    <div class="forcast-info-div">
                        <p class="forcast-weather weather-name">${conditionCode[val.code]}</p>
                        <div class="forcast-info">
                            <div title="temprature">
								<img class="forcast-temp-icon" src="./png/temp.png">
                                <p class="forcast-temp temp-style">Avg <span>${Math.round((val.high + val.low)/2)}</span></p>
                            </div>
                            <div>
                                <p class="high temp-style">High <span>${val.high}</span></p>
                                <p class="low temp-style">Low <span>${val.low}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
			forcasts.appendChild(div)
		}
	})
	if(weatherData.current_observation.condition.temperature >= 25){
		temprature.style.color = "#f00";
	} else {
		temprature.style.color = "#00f";
	}
} 
function initNews(){
	newsHeading.innerHTML = "";
	newsData.value.map((val, i)=>{
		const sourceUrl = val.url;
		const newLink = sourceUrl.slice(0, sourceUrl.indexOf('.', 12)+4);
		var div = document.createElement('div');
		let dateString = new Date(val.datePublished).toUTCString();
		dateString = dateString.split(' ').slice(0, 4).join(' ');
		if(i === 0 || i === 5 || i === 10){
			div.innerHTML= `<div class="first-news">
								<div class="first-img-div">
									<a href="${val.url}"><img class="first-img" src="${val.image.thumbnail.contentUrl}" alt="" srcset=""></a>
								</div>
								<a class="news-title" href="${val.url}"><h4>${val.name}</h4></a>
								<div>
									<div class="source-container">
										<a class="news-source" href="${newLink}"><p>${val.provider[0].name}</p></a>
										<p class="news-pub-date">Published: ${dateString}</p>
									</div>
									<p class="news-detail">${val.description}... <a href="${val.url}">see more</a></span></p>
								</div>
								<a href="${val.url}">
									<p class="news-link">${val.url}</p>
								</a>
							</div>`
			newsHeading.append(div);
		} else {
			div.innerHTML= `<div class="other-news">
								<div class="other-news2">
									<div class="other-img-div">
										<a href="${val.url}"><img class="other-img" src="${val.image.thumbnail.contentUrl}" alt="" srcset=""></a>
									</div>
									<div>
										<a class="news-title"href="${val.url}"><h4 class="news-title1">${val.name}<h4></a>
										<div class="detail-container">
											<div class="source-container">
												<a class="news-source"href="${newLink}"><p>${val.provider[0].name}</p></a>
												<p class="news-pub-date">Published: ${dateString}</p>
											</div>
											<p class="news-detail">${val.description}... <a href="${val.url}">see more</a></span></p>
										</div>
									</div>
								</div>
								<a href="${val.url}">
									<p class="news-link">${val.url}</p>
								</a>
							</div>`
			newsHeading.appendChild(div);
		}
	})
} 

// initValue();