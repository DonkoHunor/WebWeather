import { WeatherForcast } from './WFInterface';
import './style.css'

const base_url:string = "http://api.weatherapi.com/v1/forecast.json?key=638048ba6a1345db95d145029232011";
let city = document.getElementById('city') as HTMLInputElement;

async function load(){
    let result = await fetch("http://api.weatherapi.com/v1/forecast.json?key=638048ba6a1345db95d145029232011&q=Budapest&days=3&aqi=no&alerts=no");
    console.log("Status: " + result.status);
    console.log("Success?: " + result.ok);
    
    let content = await result.json() as WeatherForcast;
    (document.getElementById("cwTemp")! as HTMLElement).textContent = content.location.name;
    (document.getElementById("cwCond")! as HTMLElement).textContent = content.current.condition.text;
    (document.getElementById("cwCloud")! as HTMLElement).textContent = content.current.temp_c.toString() + "°C";
    (document.getElementById("cwHumid")! as HTMLImageElement).setAttribute("src", content.current.condition.icon);
    city.value = "Budapest";
    
}

document.addEventListener("DOMContentLoaded", load);
