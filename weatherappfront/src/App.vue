<template>
  <v-app>
    <login-dialog />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import LoginDialog from "@/components/loginDialog.vue";

export default Vue.extend({
  name: "App",
  components: { LoginDialog },
  data: () => ({
    //
  }),
});
</script>
