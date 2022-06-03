import Vue from "vue";
import Vuex from "vuex";
import jsonCities from "../../smallerCityList.json";
import { City, WeatherOfCity } from "@/store/types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    forecastWeatherOfCity: [],
    selectedCities: [],
    weatherOfCities: [],
    cities: jsonCities,
  },
  mutations: {
    setForecastWeatherOfCity(state, weather) {
      state.forecastWeatherOfCity = weather;
    },
    setSelectedCities(state, cities) {
      state.selectedCities = cities;
    },
    setWeatherOfCities(state, weathers) {
      state.weatherOfCities = weathers;
    },
  },
  actions: {},
  getters: {
    getForecastWeatherOfCity(state){
      return state.forecastWeatherOfCity
    },
    getCities(state) {
      return state.cities;
    },
    getSelectedCities(state) {
      return state.selectedCities;
    },
    getWeatherOfCities(state) {
      return state.weatherOfCities;
    },
  },
});
