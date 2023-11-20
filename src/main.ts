import { CurrentWeather } from './CWInterface';
import { WeatherForcast } from './WFInterface';
import './style.css'

async function load(){
    let result = await fetch("https://api.weatherapi.com/v1/current.json?key=638048ba6a1345db95d145029232011&q=Budapest&aqi=no");
    console.log("Status: " + result.status);
    console.log("Success?: " + result.ok);
    
    let content = await result.json() as CurrentWeather;
    console.log(content.location.name);
    console.log(content.current.condition.text);
    console.log(content.current.temp_c);
    console.log(content.current.condition.icon);
    
    (document.getElementById("varos")! as HTMLInputElement).value = content.location.name;
    (document.getElementById("homerseklet")! as HTMLInputElement).value = content.current.temp_c.toString();
    (document.getElementById("felhozet")! as HTMLInputElement).value = content.current.condition.text;
    document.getElementById("icon")!.setAttribute("src", "//cdn.weatherapi.com/weather/64x64/night/113.png");
    forcast();
}

async function forcast() {
  let result = await fetch("http://api.weatherapi.com/v1/forecast.json?key=638048ba6a1345db95d145029232011&q=Budapest&days=3&aqi=no&alerts=no")
  console.log("Status: " + result.status);
  console.log("Success?: " + result.ok);
  let content = await result.json() as WeatherForcast;

  //content.forecast.forecastday[x].hour[y]
  //x = hanyadik napi előrejelzés
  //y = nap hanyadik órája
  console.log(content.forecast.forecastday[1].hour[0].condition.text);
  
}

document.addEventListener("DOMContentLoaded", load);
