<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-form @submit.prevent="login" :errorMessages="errors.detail">
          <v-card class="elevation-10">
            <v-card-title class="headline" primary-title>Login</v-card-title>
            <v-card-text>
              <v-alert dense outlined type="error" v-if="errors.detail" v-html="errors.detail">
              </v-alert>
              <v-text-field
                v-model="username"
                prepend-icon="mdi-account"
                name="email"
                label="Email"
                type="text"
                :errorMessages="errors.username"
              ></v-text-field>
              <v-text-field
                v-model="password"
                id="password"
                prepend-icon="mdi-lock"
                name="password"
                label="Password"
                type="password"
                :errorMessages="errors.password"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" text color="primary" :disabled="submitted">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      submitted: false,
      errors: {},
    };
  },
  computed: {},
  activated() {},
  methods: {
    ...mapActions("auth", ["authenticate", "getUserProfile"]),
    login() {
      this.authenticate({
        username: this.username,
        password: this.password,
      })
      .then(() => {
        this.getUserProfile()
        .then(() => {
          this.$router.push("/");
        })
        .catch(err => {
          console.log(err)
        })
      })
      .catch((err) => {
        console.log(err)
        this.errors = err.response.data
      })
    },
  },
};
</script>

<style></style>
