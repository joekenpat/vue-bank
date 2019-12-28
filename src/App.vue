<template>
  <v-app>
    <v-app-bar v-if="!authPage" color="indigo" dark app class="elevation-0">
      <v-btn @click="$router.go(-1)" icon>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title class="font-weight-bold">VUETRIFY</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="log_out()" icon>
        <v-icon>mdi-account-off</v-icon>
      </v-btn>
    </v-app-bar>
    <v-bottom-navigation
      v-if="!authPage"
      v-model="bottomNav"
      shift
      app
      grow
      dark
      background-color="indigo"
      class="pt-2"
      color="ingido"
      style="border-top-left-radius:60px 50px;border-top-right-radius:60px 50px;"
    >
      <v-btn to="dashboard">
        <v-icon x-large>mdi-view-dashboard</v-icon>
      </v-btn>
      <v-btn to="finance_list_view">
        <v-icon x-large>mdi-currency-ngn</v-icon>
      </v-btn>
      <v-btn to="account_view">
        <v-icon x-large>mdi-account</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <v-overlay :value="loader" z-index="99999">
      <v-progress-circular width="15" size="120" indeterminate color="indigo"></v-progress-circular>
    </v-overlay>
    <v-snackbar
      v-model="snackbar"
      :color="
                response.status == 'success'
                  ? 'green accent-4'
                  : 'error'
              "
      :timeout="5000"
      top
    >
      <v-icon color="white">mdi-shape-circle-plus</v-icon>
      {{ response.message }}
      <v-btn color="white" text icon @click="snackbar = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
    <v-content class="white">
      <router-view class="white"></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      bottomNav: 3,
      snackbar: false,
      loader: false,
      response: {
        status: "",
        message: ""
      },
      splash: true
    };
  },
  computed: {
    authPage() {
      return this.$route.path == "/auth" || this.$route.path == "/register";
    }
  },
  methods: {
    log_out() {
      this.$store.dispatch("log_out");
    }
  }
};
</script>
