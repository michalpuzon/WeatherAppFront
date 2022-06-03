import axios from "axios";
import { City, WeatherOfCity } from "@/store/types";

const backendAddress = "https://api.openweathermap.org/data/2.5/";
const myKey = "59d6e527ee1e236f0a015b122f730223";

export async function getCurrentWeatherForCity(city: City) {
  let weather: Record<string, never>;
  weather = {};
  await axios
    .get(
      backendAddress +
        "weather?lat=" +
        city.coord.lat +
        "&lon=" +
        city.coord.lon +
        "&appid=" +
        myKey +
        "&units=metric"
    )
    .then((response) => (weather = response.data))
    .catch((error) => console.log(error));
  return weather;
}

export async function getFiveDaysForecastDataForCity(city: City) {
  let data: Record<string, never>[];
  data = [];
  await axios
    .get(
      backendAddress +
        "forecast?lat=" +
        city.coord.lat +
        "&lon=" +
        city.coord.lon +
        "&appid=" +
        myKey +
        "&units=metric"
    )
    .then((response) => (data = response.data))
    .catch((error) => console.log(error));
  return data;
}
