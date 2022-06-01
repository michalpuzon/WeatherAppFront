<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
      <div>
        <v-card class="px-4">
          <v-card-title class="justify-center">Login User</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Login"
                  v-model="loginInput"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="passwordInput"
                  :append-icon="showPassw ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassw ? 'text' : 'password'"
                  name="input-10-1"
                  label="Password"
                  @click:append="showPassw = !showPassw"
                ></v-text-field>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6" xsm="12"></v-col>
              <v-spacer></v-spacer>
              <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                <v-btn x-large block color="success" @click="loginUser">
                  Login
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </div>
    </v-dialog>
    <v-dialog v-model="errorAlert" max-width="600px" min-width="360px">
      <v-alert type="error">Podano nie poprawne dane</v-alert>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "loginDialog",
  data: () => ({
    dialog: true,
    loginInput: "",
    passwordInput: "",
    correctLogin: "admin",
    correctPassword: "admin",
    showPassw: false,
    errorAlert: false,
  }),
  methods: {
    loginUser() {
      if (
        this.$data.loginInput === this.$data.correctLogin &&
        this.$data.correctPassword === this.$data.correctPassword
      )
        this.$data.dialog = false;
      else this.errorAlert = true;
    },
  },
};
</script>

<style scoped></style>
