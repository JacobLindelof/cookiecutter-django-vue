<template>
  <v-menu bottom offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-avatar color="grey lighten-2" v-bind="attrs" v-on="on">
        <v-icon size="50">mdi-account</v-icon>
      </v-avatar>
    </template>
    <v-list>
      <v-list-item @click="logoutUser">
        <v-list-item-title>Logout</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => {
    return {};
  },
  computed: {
    
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    logoutUser() {
      this.logout()
      .then(() => {
        this.$router.push("/login");
      });
    },
  },
};
</script>
