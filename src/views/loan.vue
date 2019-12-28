<template>
  <v-container fluid grid-list-xs class="pa-0 white">
    <v-overlay :value="loader" z-index="99999">
        <v-progress-circular width="15" size="120" indeterminate color="indigo"></v-progress-circular>
      </v-overlay>
    <v-row no-gutters class="d-flex justify-center mb-5">
      <v-col cols="12" class="pa-0">
        <v-alert v-show="form_directive && e1 == 1" prominent text class="text-center mb-0" type="info">
          Enter the Amount your need
        </v-alert>
        <v-alert v-show="form_directive && e1 == 2" prominent text class="text-center mb-0" type="info">
          Select the time length to repay your loan of N{{ loan_amount }}
        </v-alert>
        <v-alert v-show="form_directive  && e1 == 3" prominent text class="text-center mb-0" type="info">
          Enter your 4 Digit Security Pin, and click on the KEY
        </v-alert>
        <v-card class="mx-auto elevation-0" light style="border-radius:0;">
           <v-snackbar
            v-model="snackbar"
            :color="
                response.status == 'success'
                  ? 'green accent-4'
                  : 'error'
              "
            :timeout="5000"
            top>
            <v-icon color="white">mdi-shape-circle-plus</v-icon>
            {{ response.message }}
            <v-btn color="white" text icon @click="snackbar = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-snackbar>
          <v-stepper class="elevation-0" v-model="e1">
            <v-stepper-items class="px-0">
              <v-stepper-content step="1" class="text-center">
                <v-avatar size="80" color="green lighten-2" class="mb-10 mx-auto elevation-1">
                  <v-icon size="70" class="white--text" dark>mdi-currency-ngn</v-icon>
                </v-avatar>
                <v-container grid-list-xs>
                  <v-row no-gutters class="justify-center">
                    <v-col cols="5"  class="py-1 px-0 text-center mr-1">
                      <v-text-field
                        outlined
                        dense
                        type="number"
                        label="Amount"
                        class="pa-0"
                        v-model="loan_amount"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
                <v-btn class="white indigo--text" @click="e1 = 2" text>
                  LOAN PERIOD<v-icon large>mdi-chevron-right</v-icon>
                </v-btn>
              </v-stepper-content>
              <v-stepper-content step="2" class="text-center">
                <v-avatar size="80" color="green lighten-2" class="mb-10 mx-auto elevation-1">
                  <v-icon size="60" class="white--text" dark>mdi-timer</v-icon>
                </v-avatar>
                <v-container grid-list-xs>
                  <v-row no-gutters class="justify-center">
                    <v-col cols="6"  class="py-1 px-0 text-center mr-1">
                      <v-select
                        :items="loan_period"
                        :item-text="text"
                        :item-value="value"
                        v-model="selected_loan_period"
                        label="LOAN PERIOD"
                        chips
                      >
                      </v-select>
                    </v-col>
                  </v-row>
                </v-container>
                <v-btn class="white indigo--text" @click="e1 = 3" text>
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
                        outlined
                        dense
                        type="number"
                        label="PIN"
                        hide-details
                        class="pa-0"
                        id="id"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
                <v-btn @click="loader = true" class="white green--text mx-1" icon fab>
                  <v-icon large>mdi-key</v-icon>
                </v-btn>
                <v-btn block class="white indigo--text" @click="e1 = 2" text>
                        <v-icon large>mdi-chevron-left</v-icon> BACK
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
export default {
  data() {
    return {
      e1: 1,
      snackbar: false,
      form_action: false,
      form_directive: true,
      response: {
        status: null,
        message: ""
      },
      loan_period: [
        {
          text: "1 WEEK",
          value: 1
        },
        {
          text: "2 WEEKS",
          value: 2
        },
        {
          text: "3 WEEKS",
          value: 3
        },
        {
          text: "4 WEEKS",
          value: 4
        },
        {
          text: "5 WEEKS",
          value: 5
        },
        {
          text: "6 WEEKS",
          value: 6
        },
        {
          text: "7 WEEKS",
          value: 7
        },
        {
          text: "8 WEEKS",
          value: 8
        },
        {
          text: "9 WEEKS",
          value: 9
        },
        {
          text: "10 WEEKS",
          value: 10
        },
        {
          text: "11 WEEKS",
          value: 11
        },
        {
          text: "12 WEEKS",
          value: 12
        }
      ],
      selected_loan_period: null,
      loan_amount: null,
      loader: false,
    };
  },
  watch: {
    loader (val) {
        if (!val) return
        setTimeout(() => (
          this.loader = false,
          this.response.status = 'success',
          this.response.message = 'Request For Loan Sent.',
          this.snackbar = true), 1000)
      },
  }
};
</script>
