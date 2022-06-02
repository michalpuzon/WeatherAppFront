import axios from "axios";
import { City, WeatherOfCity } from "@/store/types";

const backendAddress = "https://api.openweathermap.org/data/2.5/weather";
const myKey = "59d6e527ee1e236f0a015b122f730223";

export async function getAllCitiesWithWeather(city: City) {
  let weather: Record<string, never>;
  weather = {};
  await axios
    .get(
      backendAddress +
        "?lat=" +
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
