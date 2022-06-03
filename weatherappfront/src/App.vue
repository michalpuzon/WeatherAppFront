<template>
  <v-app>
    <header>
      <v-row class="justify-center">
        <span class="title-span"
          >Weather <b style="color: black">Forecast</b></span
        >
      </v-row>
      <v-row class="justify-center">
        <span class="description"
          >Choose cities and click one for more details</span
        >
      </v-row>
    </header>
    <login-dialog />
    <v-main>
      <selected-cities />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import LoginDialog from "@/components/LoginDialog.vue";
import SelectedCities from "@/components/SelectedCities.vue";

export default Vue.extend({
  name: "App",
  components: { SelectedCities, LoginDialog },
});
</script>
<style>
#app {
  background: rgb(103, 111, 205);
  background: radial-gradient(
    circle,
    rgba(103, 111, 205, 1) 41%,
    rgba(50, 58, 164, 1) 81%
  );
}

.v-main {
  border: 5px solid darkblue;
  background-color: lightsteelblue;
  background-size: 100%;
  margin: 20px;
  border-radius: 15px;
}

.title-span {
  font-size: 40px;
  color: white;
  margin: 15px 0 0 0;
}

.title-span:hover {
  transition: 1s;
  font-size: 45px;
  font-family: "Bell MT", serif;
}

.description {
  color: white;
  font-size: 20px;
  font-family: "Bell MT", serif;
}
</style>
