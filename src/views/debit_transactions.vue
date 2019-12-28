<template>
  <v-card class="elevation-0">
    <v-card-title>
      DEBIT TRANSACTIONS
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="trans"
      :search="search"
      dense
      :loading="trans.length == 0"
      :items-per-page="10"
      loading-text="Loading Data..."
      no-data-text="No Data to Display!"
      no-results-text="No Data Matching Your Search Query!"
    >
    </v-data-table>
  </v-card>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "RECEPIENT",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "ACCOUNT", value: "acct_no" },
        { text: "AMOUNT", value: "amount" },
        { text: "TIME", value: "time" }
      ],
      trans: []
    };
  },
  created() {
    this.load_data();
    this.load_debit_data();
  },
  computed: {
    ...mapState(["current_user", "user_profile", "user_bank_details"])
  },
  methods: {
    load_data() {
      this.$store.dispatch("fetch_user_profile");
      return;
    },
    load_debit_data(){
      this.trans =this.user_bank_details.debit
      var tranv = this.trans
      tranv.reverse()
      this.trans = tranv
      return;
    }
  }
};
</script>
