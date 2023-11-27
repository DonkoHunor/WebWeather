import { WeatherForcast } from './WFInterface';

const base_url:string = "http://api.weatherapi.com/v1/forecast.json?key=638048ba6a1345db95d145029232011";
let error = document.getElementById('error') as HTMLElement;
let city = document.getElementById('city') as HTMLInputElement;
let valid = true;
document.getElementById('btn_forecast')!.addEventListener('click',Forcast);
let content:WeatherForcast;

async function Forcast() {
    if(city.value.trim().length < 1){
    city.value = "Budapest";
  }
  
  await GetWeather();
  console.log(content.location.name);
  
  if(valid){
    (document.getElementById("cwTemp")! as HTMLElement).textContent = content.current.temp_c.toString() + "°C";
    (document.getElementById("cwCond")! as HTMLElement).textContent = content.current.condition.text;
    (document.getElementById("cwCloud")! as HTMLElement).textContent = content.current.cloud.toString();
    (document.getElementById("cwHumid")! as HTMLElement).textContent = content.current.humidity.toString();
    city.value = content.location.name;
    error.textContent = "";
  }
  
}

async function GetWeather(){
  let result = await fetch(`${base_url}&q=${city.value}&days=3&aqi=no&alerts=no`);
  console.log("Status: " + result.status);
  console.log("Success?: " + result.ok);

  if(!result.ok){
    error.textContent = "There is no such city(probably a spelling mistake)";
    valid = false;
    throw Error("There is no such city(probably a spelling mistake)");
  }
  content = await result.json() as WeatherForcast;
  valid = true;
}

document.addEventListener('DOMContentLoaded',Forcast)