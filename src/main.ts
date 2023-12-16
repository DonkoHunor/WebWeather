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
 * Az előrejelzés adatait tároló változó
 */
let content : WeatherForcast;

document.getElementById('btn_current')!.addEventListener('click',Forcast);

function BackgroundChange(){
  const time = (content.location.localtime.split(' ')[1]);
  let num = parseInt(time.split(':')[0].toString() + time.split(':')[1].toString());
  console.log(num)
  if (num < 550 || num > 1900){
    document.body.style.backgroundImage = "url('night.png')";
  }else if (num < 1000 || num > 1500){
    document.body.style.backgroundImage = "url('mid.png')";
  }else{
    document.body.style.backgroundImage = "url('day.png')";
  }
}

/**
 * Ellenörzi, hogy a {@link city} változónak van-e értéke és frissíti a megjelenített adatokat, valamint a meghívja a {@link Value} function-t
 */
export async function Forcast() {

  if(city.value.trim().length < 1){
  city.value = "Budapest";
  }

  await GetWeather();
  console.log(content.location.name);
  if(valid){
    BackgroundChange();
    (document.getElementById("displayCountry")! as HTMLElement).textContent = "Country: " + content.location.country;
    (document.getElementById("displayTime")! as HTMLElement).textContent = "Local Time: " + content.location.localtime;
    (document.getElementById("tempActual")! as HTMLElement).textContent = "Temperature: " + content.current.temp_c + "°C  ";
    (document.getElementById("tempFeels")! as HTMLElement).textContent = "Feels Like: " + content.current.temp_c + "°C  ";
    (document.getElementById("icon")! as HTMLImageElement).src = content.current.condition.icon;
    (document.getElementById("condition")! as HTMLElement).textContent = content.current.condition.text;
    (document.getElementById("cloud")! as HTMLElement).textContent = "Cloud Coverage: " + content.current.cloud + "%";
    (document.getElementById("humidity")! as HTMLElement).textContent = "Humidity: " + content.current.humidity + "%";
    (document.getElementById("wind")! as HTMLElement).textContent = "Wind Speed: " + content.current.wind_kph + " km/h";
    city.value = content.location.name;
    (document.getElementById('error') as HTMLElement).textContent = "";
  }  
}


/**
 * Lekéri a napnak megfelelő időjárás előrejelzést és megnézi, hogy sikeres-e
 * Ha igen, akkor a {@link valid} változó értékét igazra állítja és a {@link content} változó értékét beállítja az új adatokkal
 * @param days - Megadja, hogy hány nappal kell előre jelezni az időjárást
 */
export async function GetWeather(){
  let result = await fetch(`${base_url}&q=${city.value}&aqi=no&alerts=no`);
  console.log("Status: " + result.status);
  console.log("Success?: " + result.ok);

  let error = document.getElementById('error') as HTMLElement;
  let country = document.getElementById('displayCountry') as HTMLElement;

  if(!result.ok){
    error.textContent = "There is no such city(probably a spelling mistake)";
    country.textContent = "";
    valid = false;
    throw Error("There is no such city(probably a spelling mistake)");
  }
  content = await result.json() as WeatherForcast;
  valid = true;
}

document.addEventListener('DOMContentLoaded',Forcast);