<template>
  <div>
    <v-row>
      <v-card
        elevation="10"
        width="200px"
        max-height="300px"
        min-height="300px"
        style="margin: 30px"
      >
        <v-btn style="margin: 70% 30px" @click.stop="selectCity = true">
          <v-icon large>mdi-plus</v-icon>
          <span>Add City</span>
        </v-btn>
      </v-card>
    </v-row>
    <v-dialog v-model="selectCity" width="400px">
      <v-card width="400px">
        <v-autocomplete
          solo
          label="Cities"
          :items="names"
        ></v-autocomplete>
        <v-btn style="margin: 0 38%" color="primary"><v-icon>mdi-city</v-icon>Add</v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "SelectedCities",
  props: ["city"],
  data:() => ({
    selectCity: false,
  }),
  computed: {
    cities() {
      return this.$store.getters.getCities;
    },
    names(){
      const names = [];
      for (const city of this.$store.getters.getCities) {
        names.push(city.name);
      }
      return names;
    },
  },
  methods: {},
};
</script>

<style scoped></style>
