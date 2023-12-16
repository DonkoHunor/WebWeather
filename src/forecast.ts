import { WeatherForcast } from './WFInterface';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';
import './background.css';

/**
 * Az API elérési link-je a kulcsal együtt
 */
const base_url:string = "http://api.weatherapi.com/v1/forecast.json?key=638048ba6a1345db95d145029232011";

/**
 * A city input elemet tároló változó
 */
let city = document.getElementById('city') as HTMLInputElement;

/**
 * A beírt helyszín hitelességét jelző bool változó
 */
let valid : boolean = true;

/**
 * Megadja, hogy hány nappal kell előre jelezni az időjárást
 */
let day_value : number = 1;

/**
 * Az előrejelzés adatait tároló változó
 */
let content : WeatherForcast;

/**
 * A range input elemet tároló változó
 */
let hour = document.getElementById('input_hour') as HTMLInputElement;

/**
 * A mai napot mgejelenítő gombot tároló változó
 */
let btn_today = document.getElementById('btn_today') as HTMLElement;

/**
 * A holnapi napot mgejelenítő gombot tároló változó
 */
let btn_tomorrow = document.getElementById('btn_tomorrow') as HTMLElement;

/**
 * A két nappal késöbbi napot mgejelenítő gombot tároló változó
 */
let btn_twoDays = document.getElementById('btn_twoDays') as HTMLElement;

document.getElementById('btn_forecast')!.addEventListener('click',Forcast);
document.getElementById('input_hour')!.addEventListener('input',Forcast);

btn_today?.addEventListener('click',async () => {
  day_value = 1
  await Forcast();
})

btn_tomorrow?.addEventListener('click',async () => {
  day_value = 2
  await Forcast();
})

btn_twoDays?.addEventListener('click',async () => {
  day_value = 3  
  await Forcast();
})

/**
 * Ellenörzi, hogy a {@link city} változónak van-e értéke és frissíti a megjelenített adatokat, valamint a meghívja a {@link Value} function-t
 */
export async function Forcast() {

  Value();

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
    (document.getElementById('error') as HTMLElement).textContent = "";
  }  
}

/**
 * Lekéri a napnak megfelelő időjárás előrejelzést és megnézi, hogy sikeres-e
 * Ha igen, akkor a {@link valid} változó értékét igazra állítja és a {@link content} változó értékét beállítja az új adatokkal
 * @param days - Megadja, hogy hány nappal kell előre jelezni az időjárást
 */
export async function GetWeather(days:number){
  let result = await fetch(`${base_url}&q=${city.value}&days=${days}&aqi=no&alerts=no`);
  console.log("Status: " + result.status);
  console.log("Success?: " + result.ok);

  let error = document.getElementById('error') as HTMLElement;

  if(!result.ok){
    error.textContent = "There is no such city(probably a spelling mistake)";
    valid = false;
    throw Error("There is no such city(probably a spelling mistake)");
  }
  content = await result.json() as WeatherForcast;
  valid = true;
}

/**
 * Kiírja a range input érékét
 */
function Value():void{
  let label = document.getElementById('hour_value');
  label!.innerText = hour.value + ':00';
}

document.addEventListener('DOMContentLoaded',Forcast)