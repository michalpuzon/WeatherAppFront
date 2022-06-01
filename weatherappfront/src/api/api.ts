import axios from "axios";
import { City } from "@/store";

const backendAddress = "https://api.openweathermap.org/data/2.5/weather";
const myKey = "59d6e527ee1e236f0a015b122f730223";

export async function getAllCitiesWithWeather(cities: City[]) {
  const citiesWithWeather = [];
  for (const city of cities) {
    await axios
      .get(
        backendAddress +
          "?lat=" +
          city.coord.lat +
          "&lon=" +
          city.coord.lon +
          "&appid=" +
          myKey
      )
      .then((response) => citiesWithWeather.push(response));
  }
  return cities;
}
