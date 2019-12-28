<template>
  <v-container fluid grid-list-xs class="pa-0 white">
    <v-row no-gutters class="d-flex justify-center mb-5">
      <v-col cols="12" class="pa-0">
        <v-card class="indigo lighten-2 mx-auto elevation-0" light style="border-radius:0;">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="headline white--text">{{ this.user_profile.last_name + ' ' + this.user_profile.first_name}}</v-card-title>
              <v-card-subtitle class="white--text subtitle-1">
                <v-icon color="white">mdi-currency-ngn</v-icon>{{this.user_profile.balance}}
              </v-card-subtitle>
            </div>
            <v-avatar class="ma-3" size="60" color="white">
              <v-icon color="indigo lighten-2" size="55">mdi-account</v-icon>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters class="d-flex justify-space-around mb-5">
      <v-col cols="5" class="pa-0">
        <v-card to="loan" class="mx-auto text-center elevation-0 indigo lighten-2" light>
          <v-icon size="50" color="white">mdi-coins</v-icon>
          <v-card-subtitle class="white--text">LOAN</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import {mapState} from 'vuex';
export default {
  data() {
    return {
      chart_values: Array.from({ length: 10 }, () =>
        Math.floor(Math.random() * 1000)
      ),
      profile_list_item: [
        {
          text: "Newton Salary",
          icon: "mdi-database-plus",
          type: "credit",
          time: "2019/11/04 02:32:43",
          to: "transaction_detail"
        },
        {
          text: "Amazon",
          icon: "mdi-database-minus",
          type: "debit",
          time: "2019/11/04 22:29:11",
          to: "transaction_detail"
        },
        {
          text: "School Fee",
          icon: "mdi-database-minus",
          type: "debit",
          time: "2019/11/04 12:34:35",
          to: "transaction_detail"
        }
      ]
    };
  },
  created(){
    this.load_data()
  },
  methods: {
    load_data(){
      this.$store.dispatch('fetch_user_profile')
      return
    },
  },
  computed: {
    ...mapState(['current_user', 'user_profile', 'user_bank_details'])
  },
};
</script>
