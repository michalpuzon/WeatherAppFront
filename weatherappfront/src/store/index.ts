import Vue from "vue";
import Vuex from "vuex";
import jsonCities from "../../city.list.json";
import { City, WeatherOfCity } from "@/store/types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedCities: [],
    weatherOfCities: [],
    cities: jsonCities,
  },
  mutations: {},
  actions: {},
  getters: {
    getCities(state) {
      return state.cities;
    },
    getSelectedCities(state) {
      return state.selectedCities;
    },
  },
});
