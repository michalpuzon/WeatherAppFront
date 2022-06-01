<template>
  <v-app>
    <header>
      <v-row class="justify-center">
      <span style="font-size: 40px;color: white;margin: 15px 0">Weather <b style="color: black">Forecast</b></span>
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
#app{
  background: rgb(103, 111, 205);
  background: radial-gradient(
    circle,
    rgba(103, 111, 205, 1) 41%,
    rgba(50, 58, 164, 1) 81%
  );
}
</style>
