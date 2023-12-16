import { WeatherForcast } from './WFInterface';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';
import './background.css';
//import './style.css';

/**
 * Ez a function kéri le az adatokat, az API-tól az oldal betöltésekor 
 */
export async function load(){
    let result = await fetch("http://api.weatherapi.com/v1/forecast.json?key=638048ba6a1345db95d145029232011&q=Budapest&days=3&aqi=no&alerts=no");
    console.log("Status: " + result.status);
    console.log("Success?: " + result.ok);
    
    let content = await result.json() as WeatherForcast;
    (document.getElementById("cwCity")! as HTMLElement).textContent = content.location.name;
    (document.getElementById("cwCond")! as HTMLElement).textContent = content.current.condition.text;
    (document.getElementById("cwTemp")! as HTMLElement).textContent = content.current.temp_c.toString() + "°C";
    (document.getElementById("cwIcon")! as HTMLImageElement).setAttribute("src", content.current.condition.icon);    
}

document.addEventListener("DOMContentLoaded", load);
