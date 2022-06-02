<template>
  <div>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="3"
        lg="2"
        v-for="city in weathers"
        :key="city.id"
      >
        <v-card
          elevation="10"
          width="200px"
          max-height="200px"
          min-height="200px"
          style="margin: 10px"
        >
          <v-card-title class="justify-center" style="padding: 10px">{{ city.name }}</v-card-title>
          <v-card-text class="text-center" style="color: whitesmoke;padding: 10px"
            >Current temperature is: {{ city.main.temp }}°C</v-card-text
          >
          <v-card-text class="text-center" style="color: whitesmoke;padding: 10px"
            >Current humidity is: {{ city.main.humidity }}%</v-card-text
          >
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3" lg="2">
        <v-card
          elevation="10"
          width="200px"
          max-height="200px"
          min-height="200px"
          style="margin: 10px"
        >
          <v-btn style="margin: 40% 30px" @click.stop="selectCity = true">
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
          :items="cities"
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
        >This city is already on your favorite list</v-alert
      >
    </v-dialog>
  </div>
</template>

<script>
import { getAllCitiesWithWeather } from "@/api/api";

export default {
  name: "SelectedCities",
  props: ["city"],
  data: () => ({
    selected: "",
    selectCity: false,
    favourites: [],
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
      if (this.favourites.length < 10) {
        for (let favourite of this.favourites) {
          if (favourite.id === this.selected.id) {
            this.cityAlreadyOnList = true;
            return null;
          }
        }
        this.favourites.push(this.selected);
        getAllCitiesWithWeather(this.selected).then((response) =>
          this.weathers.push(response)
        );
        this.selectCity = false;
        this.selected = "";
      } else this.toMuchCitiesDialog = true;
    },
  },
};
</script>

<style scoped>
.v-card {
  background-color: steelblue;
  background-size: 100%;
  color: whitesmoke;
}
</style>
