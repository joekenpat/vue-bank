<template>
  <v-container fluid grid-list-xs class="pa-0 white">
    <v-row no-gutters class="white">
       <v-row no-gutters class="d-flex justify-center">
      <v-col cols="12" class="pa-0">
        <v-card class="indigo lighten-2 mx-auto elevation-0" light style="border-radius:0;">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="headline white--text">John Doe</v-card-title>
              <v-card-subtitle class="white--text subtitle-1">
                <v-icon color="white">mdi-currency-ngn</v-icon>2,232,23.23
              </v-card-subtitle>
            </div>

            <v-avatar class="ma-3" size="60" color="white">
              <v-icon color="indigo lighten-2" size="55">mdi-account</v-icon>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>
      <v-col cols="12" class="pa-0 white">
        <v-card class="mx-auto elevation-0">
          <v-list>
            <v-list-item  v-for="(item, i) in profile_list_item" :to="item.to" :key="i">
              <v-list-item-icon>
                <v-icon color="indigo" v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="indigo--text" v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      profile_list_item: [
        {
          text: "Account Details",
          icon: "mdi-account-details",
          to: "account_view"
        },
        {
          text: "Settings",
          icon: "mdi-settings",
          to: "app_settings"
        }
      ]
    };
  }
};
</script>
<style scoped>

</style>