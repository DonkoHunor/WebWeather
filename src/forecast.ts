import { WeatherForcast } from './WFInterface';
import './style.css'

const base_url:string = "http://api.weatherapi.com/v1/forecast.json?key=638048ba6a1345db95d145029232011";
let error = document.getElementById('error') as HTMLElement;
let city = document.getElementById('city') as HTMLInputElement;
let content:WeatherForcast;

async function Forcast() {
    if(city.value.trim().length < 1){
    city.value = "Budapest";
  }
  
  GetWeather();

  (document.getElementById("cwTemp")! as HTMLElement).textContent = content.current.temp_c.toString() + "°C";
  (document.getElementById("cwCond")! as HTMLElement).textContent = content.current.condition.text;
  (document.getElementById("cwCloud")! as HTMLElement).textContent = content.current.cloud.toString();
  (document.getElementById("cwHumid")! as HTMLElement).textContent = content.current.humidity.toString();
  
  error.textContent = "";
}

async function GetWeather(){
  let result = await fetch(`${base_url}&q=${city.value}&days=3&aqi=no&alerts=no`);
  console.log("Status: " + result.status);
  console.log("Success?: " + result.ok);

  if(!result.ok){
    error.textContent = "There is no such city(probably a spelling mistake)";
    throw Error("There is no such city(probably a spelling mistake)");
  }

  content = await result.json() as WeatherForcast;
}

document.getElementById('btn_forecast')!.addEventListener('click',Forcast);
