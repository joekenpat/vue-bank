<template>
  <v-container fluid grid-list-xs class="pa-0 white">
    <v-overlay :value="loader" z-index="99999">
      <v-progress-circular
        width="15"
        size="120"
        indeterminate
        color="indigo"
      ></v-progress-circular>
    </v-overlay>
    <v-snackbar
      v-model="snackbar"
      :color="response.status == 'success' ? 'green accent-4' : 'error'"
      :timeout="5000"
      top
      right
    >
      <v-icon color="white">mdi-shape-circle-plus</v-icon>
      {{ response.message }}
      <v-btn color="white" text icon @click="snackbar = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
    <v-row no-gutters class="d-flex justify-center mb-5">
      <v-col cols="12" class="pa-0">
        <v-alert
          v-show="form_directive && e1 == 1"
          prominent
          text
          class="text-center mb-0"
          type="info"
        >
          Enter the Account Number your want to send the funds to.
        </v-alert>
        <v-alert
          v-show="form_directive && e1 == 2"
          prominent
          text
          class="text-center mb-0"
          type="info"
        >
          Enter the Amount your want.
        </v-alert>
        <v-alert
          v-show="form_directive && e1 == 3"
          prominent
          text
          class="text-center mb-0"
          type="info"
        >
          Enter your 4 Digit Security Pin, and click on the KEY
        </v-alert>
        <v-card class="mx-auto elevation-0" light style="border-radius:0;">
          <v-snackbar
            v-model="snackbar"
            :color="response.status == 'success' ? 'green accent-4' : 'error'"
            :timeout="5000"
            top
          >
            <v-icon color="white">mdi-shape-circle-plus</v-icon>
            {{ response.message }}
            <v-btn color="white" text icon @click="snackbar = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-snackbar>
          <v-stepper class="elevation-0" v-model="e1">
            <v-stepper-items class="px-0">
              <v-stepper-content step="1" class="text-center">
                <v-avatar
                  size="80"
                  color="green lighten-2"
                  class="mb-10 mx-auto elevation-1"
                >
                  <v-icon size="70" class="white--text" dark
                    >mdi-account</v-icon
                  >
                </v-avatar>
                <v-container grid-list-xs>
                  <v-row no-gutters class="justify-center">
                    <v-col cols="5" class="py-1 px-0 text-center mr-1">
                      <v-text-field
                        v-model="trans_data.acct_no"
                        outlined
                        dense
                        type="number"
                        label="Account #NO"
                        class="pa-0"
                      ></v-text-field>
                      <v-text-field
                        v-model="trans_data.name"
                        outlined
                        dense
                        label="Account Name"
                        class="pa-0"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
                <v-btn block class="white indigo--text" @click="e1 = 2" text>
                  CHOOSE AMOUNT<v-icon large>mdi-chevron-right</v-icon>
                </v-btn>
              </v-stepper-content>
              <v-stepper-content step="2" class="text-center">
                <v-avatar
                  size="80"
                  color="green lighten-2"
                  class="mb-10 mx-auto elevation-1"
                >
                  <v-icon size="70" class="white--text" dark
                    >mdi-currency-ngn</v-icon
                  >
                </v-avatar>
                <v-container grid-list-xs>
                  <v-row no-gutters class="justify-center">
                    <v-col cols="5" class="py-1 px-0 text-center mr-1">
                      <v-text-field
                        v-model="trans_data.amount"
                        outlined
                        dense
                        type="number"
                        label="Amount"
                        class="pa-0"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
                <v-btn class="white indigo--text" @click="pin = '',e1 = 3" text>
                  AUTHENTICATE<v-icon large>mdi-chevron-right</v-icon>
                </v-btn>
                <v-btn block class="white indigo--text" @click="e1 = 1" text>
                  <v-icon large>mdi-chevron-left</v-icon> BACK
                </v-btn>
              </v-stepper-content>
              <v-stepper-content step="3" class="text-center">
                <v-avatar size="80" color="green" class="mb-10 elevation-1">
                  <v-icon size="60" class="white--text" dark>mdi-lock</v-icon>
                </v-avatar>
                <v-container grid-list-xs class="">
                  <v-row no-gutters class="d-flex justify-center">
                    <v-col cols="3" class="py-1 px-0 text-center">
                      <v-text-field
                        v-model="pin"
                        outlined
                        dense
                        type="password"
                        label="PIN"
                        hide-details
                        class="pa-0"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>

                <v-btn
                  @click="transfer()"
                  class="white green--text mx-1"
                  icon
                  fab
                >
                  <v-icon large>mdi-key</v-icon>
                </v-btn>
                <v-btn block class="white indigo--text" @click="e1 = 2" text>
                  <v-icon large>mdi-chevron-left</v-icon>BACK
                </v-btn>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      e1: 1,
      pin: null,
      snackbar: false,
      form_action: false,
      form_directive: true,
      response: {
        status: null,
        message: ""
      },
      update_user: {
        acct_no: "",
        first_name: "",
        last_name: "",
        middle_name: "",
        mobile: "",
        gender: "",
        pin: "",
        balance: 0
      },
      loader: false,
      trans_data: {
        name: "",
        acct_no: "",
        amount: "",
        time: ""
      },
      update_user_amount: 0,
      new_banking_details: {},
      credit: [],
      debit: []
    };
  },
  created() {
    this.load_data();
  },
  computed: {
    ...mapState(["current_user", "user_profile", "user_bank_details"])
  },
  methods: {
    load_data() {
      this.$store.dispatch("fetch_user_profile");
      this.$store.dispatch("fetch_user_profile");
      this.$store.dispatch("fetch_user_bank_details");
      return;
    },
    transfer() {
      this.loader = true;
      if (
        this.trans_data.acct_no == "" &&
        this.trans_data.name == "" &&
        this.trans_data.amount == ""
      ) {
        this.response.status = "error";
        this.response.message = "One or more empty fields.";
        this.e1 = 1;
        this.loader = false;
        this.snackbar = true;
        return;
      } else if (
        this.pin !=
        String(localStorage.getItem(String(this.user_profile.acct_no)))
      ) {
        this.response.status = "error";
        this.response.message = "Incorrect Pin.";
        this.loader = false;
        this.snackbar = true;
        return;
      } else if (this.user_profile.balance < this.trans_data.amount) {
        this.response.status = "error";
        this.response.message = "Insufficient Funds!.";
        this.loader = false;
        this.snackbar = true;
        return;
      } else {
        setTimeout(() => {
          this.credit = this.user_bank_details.credit;
          this.debit = this.user_bank_details.debit;
          var m = new Date();
          var dateString =
            m.getUTCFullYear() +
            "/" +
            ("0" + (m.getUTCMonth() + 1)).slice(-2) +
            "/" +
            ("0" + m.getUTCDate()).slice(-2) +
            " " +
            ("0" + m.getUTCHours()).slice(-2) +
            ":" +
            ("0" + m.getUTCMinutes()).slice(-2) +
            ":" +
            ("0" + m.getUTCSeconds()).slice(-2);
          this.trans_data.time = dateString;
          this.update_user_amount =
            this.user_profile.balance - this.trans_data.amount;
          var new_debit = this.$store.state.user_bank_details.debit;
          new_debit.push(this.trans_data);
          this.new_banking_details = {
            credit: this.credit,
            debit: new_debit
          };
          this.update_user = {
            acct_no: this.user_profile.acct_no,
            first_name: this.user_profile.first_name,
            last_name: this.user_profile.last_name,
            middle_name: this.user_profile.middle_name,
            mobile: this.user_profile.mobile,
            gender: this.user_profile.gender,
            pin: this.user_profile.pin,
            balance: this.update_user_amount
          };
          this.$store.dispatch("update_user_profile", this.update_user);
          localStorage.setItem(
            "user_profile",
            JSON.stringify(this.update_user)
          );
          this.$store.dispatch(
            "update_user_bank_details",
            this.new_banking_details
          );
          localStorage.setItem(
            "user_bank_details",
            JSON.stringify(this.new_banking_details)
          );
          this.response.status = "success";
          this.response.message = "Transfer Successful.";
          this.load_data();
          this.loader = false;
          this.snackbar = true;
          return;
        }, 3000);
      }
    }
  }
};
</script>
