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
          @click.stop="autoDraw = true"
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
      <v-dialog width="600px" v-model="informationDialog">
        <v-card width="600px">
          <v-card-title class="justify-center">{{ name }}</v-card-title>
          <v-card-text>temp: {{ temp }}°C</v-card-text>
          <v-card-text>humidity: {{ humidity }}%</v-card-text>
          <v-card-text>pressure: {{ pressure }}hPa</v-card-text>
          <v-card-text>description: {{ description }}</v-card-text>
          <v-card-text>Wind speed: {{ windSpeed }}m/s</v-card-text>
          <v-sheet class="stackSheet" color="transparent">
            <v-sparkline
              :value="temperatureList"
              color="green"
              :labels="datesList"
              :auto-draw="autoDraw"
              :show-labels="showLabels"
              line-width="3"
              padding="10"
            ></v-sparkline>
            <v-sparkline
              :auto-draw="autoDraw"
              class="stackSpark"
              :value="humidityList"
              color="red"
              line-width="3"
              padding="10"
            ></v-sparkline>
          </v-sheet>
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
export default {
  name: "SelectedCities",
  data: () => ({
    autoDraw: false,
    showLabels: true,
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
        getFiveDaysForecastDataForCity(this.selected).then((response) => {
          this.weatherDataList.push(response);
        });
        this.selectCity = false;
        this.selected = "";
        this.$store.commit("setFavoritesCities", this.favorites);
        this.$store.commit("setWeatherOfCities", this.weathers);
        this.$store.commit("setForecastWeatherOfCity", this.weatherDataList);
        if (this.timeoutStart) {
          this.getDataFromApi();
        }
      } else this.toMuchCitiesDialog = true;
    },
    getDataFromApi() {
      const newWeatherList = [];
      this.timeoutStart = false;
      if (this.$store.getters.getFavoritesCities.length !== 0) {
        for (const city of this.$store.getters.getFavoritesCities) {
          getFiveDaysForecastDataForCity(city).then((response) => {
            newWeatherList.push(response);
          });
        }
        this.$store.commit("setForecastWeatherOfCity", newWeatherList);
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
      this.fillTemperatureAndHumidityLists();
    },
    fillTemperatureAndHumidityLists() {
      this.temperatureList = [];
      this.humidityList = [];
      this.datesList = [];
      for (let i = 0; i < 8; i++) {
        this.temperatureList.push(this.weatherList[i].main.temp);
        this.humidityList.push(this.weatherList[i].main.humidity);
        this.datesList.push(this.weatherList[i].dt_txt.slice(11, -3));
      }
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
  transition: 1s;
}

.v-dialog .v-card {
  margin: 0;
}
.v-dialog .v-card__text {
  color: whitesmoke;
  text-align: center;
  margin-top: 10px;
}
.v-dialog .v-card__title {
  font-size: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
  transition: 1s;
}

.v-dialog .v-card__title:hover {
  transition: 1s;
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
  transition: 0.5s;
}
.v-card__title:hover,
.v-card__text:hover {
  transition: 0.5s;
  font-size: 22px;
}
.chart_div {
  border: 3px black;
}
.stackSheet {
  position: relative;
}
.stackSpark {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
