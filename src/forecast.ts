import { WeatherForcast } from './WFInterface';

const base_url:string = "http://api.weatherapi.com/v1/forecast.json?key=638048ba6a1345db95d145029232011";
let error = document.getElementById('error') as HTMLElement;
let city = document.getElementById('city') as HTMLInputElement;
let valid = true;
let day_value = 3;
document.getElementById('btn_forecast')!.addEventListener('click',Forcast);
let content:WeatherForcast;
let hour = document.getElementById('input_hour') as HTMLInputElement;
hour.addEventListener('change',Forcast);

async function Forcast() {
    if(city.value.trim().length < 1){
    city.value = "Budapest";
  }
  
  await GetWeather(day_value);
  console.log(content.location.name);
  
  if(valid){
    (document.getElementById("cwTemp")! as HTMLElement).textContent = content.forecast.forecastday[day_value-1].hour[parseInt(hour.value)].temp_c.toString() + "°C  ";
    (document.getElementById("cwCond")! as HTMLElement).textContent = content.forecast.forecastday[day_value-1].hour[parseInt(hour.value)].condition.text;
    (document.getElementById("cwCloud")! as HTMLElement).textContent = content.forecast.forecastday[day_value-1].hour[parseInt(hour.value)].cloud.toString();
    (document.getElementById("cwHumid")! as HTMLElement).textContent = content.forecast.forecastday[day_value-1].hour[parseInt(hour.value)].humidity.toString();
    city.value = content.location.name;
    error.textContent = "";
  }
  
}

async function GetWeather(days:number){
  let result = await fetch(`${base_url}&q=${city.value}&days=${days}&aqi=no&alerts=no`);
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