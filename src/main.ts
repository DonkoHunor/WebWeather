import { WeatherForcast } from './WFInterface';
import './style.css'

async function load(){
    let result = await fetch("http://api.weatherapi.com/v1/forecast.json?key=638048ba6a1345db95d145029232011&q=Budapest&days=3&aqi=no&alerts=no");
    console.log("Status: " + result.status);
    console.log("Success?: " + result.ok);
    
    let content = await result.json() as WeatherForcast;
    (document.getElementById("cwTemp")! as HTMLElement).textContent = "Current Temperature: " + content.current.temp_c.toString();
    (document.getElementById("cwCond")! as HTMLElement).textContent = "Current Condition: " + content.current.condition.text;
    (document.getElementById("cwCloud")! as HTMLElement).textContent = "Cloud Coverage: " + content.current.cloud.toString();
    (document.getElementById("cwHumid")! as HTMLElement).textContent = "Air Humidity: " + content.current.humidity.toString();
    
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
