<template>
  <div>
    <v-row justify="center">
      <v-col
        cols="8"
        sm="4"
        md="3"
        lg="2"
        v-for="(weather, index) in this.$store.getters.getForecastWeatherOfCity"
        :key="index"
        style="margin-left: 30px"
      >
        <v-card
          @click="setInformationsForCity(index)"
          elevation="10"
          width="200px"
          max-height="200px"
          min-height="200px"
        >
          <v-card-title class="justify-center" style="padding: 10px">{{
            weather.city.name
          }}</v-card-title>
          <v-card-text
            class="text-center"
            style="color: whitesmoke; padding: 10px"
            >Current temperature is: {{ weather.list[0].main.temp }}°C
          </v-card-text>
          <v-card-text
            class="text-center"
            style="color: whitesmoke; padding: 10px"
            >Current humidity is: {{ weather.list[0].main.humidity }}%
          </v-card-text>
        </v-card>
      </v-col>
      <v-dialog width="300px" v-model="informationDialog">
        <v-card width="300px">
          <v-card-title class="justify-center">{{ name }}</v-card-title>
          <v-card-text>temp: {{ temp }}°C</v-card-text>
          <v-card-text>humidity: {{ humidity }}%</v-card-text>
          <v-card-text>pressure: {{ pressure }}hPa</v-card-text>
          <v-card-text>description: {{ description }}</v-card-text>
          <v-card-text>Wind speed: {{ windSpeed }}m/s</v-card-text>
        </v-card>
      </v-dialog>
      <v-col cols="8" sm="4" md="3" lg="2" style="margin-left: 30px">
        <v-card
          elevation="10"
          width="200px"
          max-height="200px"
          min-height="200px"
          class="d-flex justify-center align-center"
        >
          <v-btn @click.stop="selectCity = true">
            <v-icon large>mdi-plus</v-icon>
            <span>Add City</span>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog
      v-model="selectCity"
      width="400px"
      transition="dialog-bottom-transition"
    >
      <v-card width="400px">
        <v-autocomplete
          solo
          v-model="selected"
          label="Cities"
          :items="this.$store.getters.getCities"
          item-text="name"
          item-value="id"
          return-object
        ></v-autocomplete>
        <v-btn style="margin: 0 38%" color="primary" @click="addToFavourites">
          <v-icon>mdi-city</v-icon>
          Add
        </v-btn>
      </v-card>
    </v-dialog>
    <v-dialog v-model="toMuchCitiesDialog" transition="dialog-top-transition">
      <v-alert type="error">You can't choose more than 10 cities</v-alert>
    </v-dialog>
    <v-dialog v-model="cityAlreadyOnList">
      <v-alert type="error"
        >This city is already on your favorite list
      </v-alert>
    </v-dialog>
  </div>
</template>

<script>
import {
  getCurrentWeatherForCity,
  getFiveDaysForecastDataForCity,
} from "@/api/api";
import chart from "chart.js";
export default {
  name: "SelectedCities",
  data: () => ({
    datesList: [],
    temperatureList: [],
    humidityList: [],
    name: "",
    temp: "",
    humidity: "",
    windSpeed: "",
    pressure: "",
    description: "",
    weatherList: [],
    weatherData: {},
    weatherDataList: [],
    timeoutStart: true,
    informationDialog: false,
    selected: "",
    selectCity: false,
    favorites: [],
    weathers: [],
    weather: {},
    toMuchCitiesDialog: false,
    cityAlreadyOnList: false,
  }),
  computed: {
    cities() {
      return this.$store.getters.getCities;
    },
  },
  methods: {
    addToFavourites() {
      if (this.selected === "") return null;
      if (this.favorites.length < 10) {
        for (let favourite of this.favorites) {
          if (favourite.id === this.selected.id) {
            this.cityAlreadyOnList = true;
            return null;
          }
        }
        this.favorites.push(this.selected);
        getCurrentWeatherForCity(this.selected).then((response) =>
          this.weathers.push(response)
        );
        getFiveDaysForecastDataForCity(this.selected).then((response) =>
          this.weatherDataList.push(response)
        );
        this.selectCity = false;
        this.selected = "";
        this.$store.commit("setWeatherOfCities", this.weathers);
        this.$store.commit("setForecastWeatherOfCity", this.weatherDataList);
        if (this.timeoutStart) this.getDataFromApi();
      } else this.toMuchCitiesDialog = true;
    },
    getDataFromApi() {
      this.timeoutStart = false;
      console.log("Sprawdzam Listę");
      if (this.$store.getters.getWeatherOfCities.length !== 0) {
        console.log("Zapytanie Wysłano");
        this.weathers = [];
        for (const weather of this.$store.getters.getWeatherOfCities) {
          getCurrentWeatherForCity(weather).then((response) =>
            this.weathers.push(response)
          );
        }
        this.$store.commit("setWeatherOfCities", this.weathers);
      }
      setTimeout(this.getDataFromApi, 60000);
    },
    setInformationsForCity(index) {
      this.informationDialog = true;
      this.name = this.weatherDataList[index].city.name;
      this.weatherList = this.weatherDataList[index].list;
      this.description = this.weatherList[0].weather[0].description;
      this.pressure = this.weatherList[0].main.pressure;
      this.temp = this.weatherList[0].main.temp;
      this.humidity = this.weatherList[0].main.humidity;
      this.windSpeed = this.weatherList[0].wind.speed;
      this.fillTemperatureAndHumidityLists()
    },
    fillTemperatureAndHumidityLists() {
      this.weatherList.forEach((w) => {
        this.temperatureList.push(w.main.temp);
        this.humidityList.push(w.main.humidity);
        this.datesList.push(w.dt_txt);
      });
      console.log(this.datesList);
    },
  },
};
</script>

<style scoped>
.v-card {
  background-color: steelblue;
  background-size: 100%;
  color: whitesmoke;
  margin: 10px;
  border-radius: 15px;
}

.v-dialog .v-card {
  margin: 0;
}
.v-dialog .v-card__title {
  font-size: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.v-dialog .v-card__text {
  color: whitesmoke;
  text-align: center;
  margin-top: 10px;
}

.v-dialog .v-card__title:hover {
  font-size: 45px;
}

.v-card:hover {
  background-color: #185c83;
  color: white;
  transition: 1s;
}

.v-card .v-btn {
  background-color: #5895d2;
  color: white;
}

.v-card__title,
.v-card__text {
  font-size: 20px;
  font-family: "Agency FB", serif;
}
.v-card__title:hover,
.v-card__text:hover {
  transition: 0.3s;
  font-size: 22px;
}
</style>
