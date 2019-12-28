<template>
  <v-container fluid grid-list-xs class="pa-0">
    <v-row no-gutters class="justify-space-around">
      <v-col align-self="center" class="py-1 px-0 text-center">
        <v-card class="elevation-0">
          <v-snackbar
            v-model="snackbar"
            :color="
                response.status == 'success'
                  ? 'green accent-4'
                  : 'error'
              "
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
          <v-stepper class="elevation-0" v-model="e1">
            <v-stepper-items class="px-0">
              <v-stepper-content step="1">
                <v-avatar size="150" color="indigo" class="mb-10 elevation-1">
                  <v-icon size="80" color="white">mdi-briefcase-account</v-icon>
                </v-avatar>
                <v-container grid-list-xs>
                  <v-row no-gutters class="justify-space-around">
                    <v-col cols="6" class="py-1 px-0 text-center mr-1">
                      <v-text-field
                        v-model.trim="new_user.acct_no"
                        solo
                        dense
                        type="number"
                        label="Accont #No"
                        class="pa-0 mb-5"
                      ></v-text-field>
                      <v-btn class="white indigo--text mb-12" @click="e1 = 2" icon fab>
                        <v-icon large>mdi-chevron-right</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-btn to="auth" block text class="white indigo--text mx-1 mt-12">LOGIN INSTEAD</v-btn>
                </v-container>
              </v-stepper-content>
              <v-stepper-content step="2">
                <v-avatar size="150" color="indigo" class="mb-10 elevation-1">
                  <v-icon size="80" color="white">mdi-account</v-icon>
                </v-avatar>
                <v-container grid-list-xs>
                  <v-row no-gutters class="justify-space-around">
                    <v-col cols="10" class="py-1 px-0 text-center mr-1">
                      <v-text-field
                        v-model.trim="new_user.last_name"
                        solo
                        dense
                        label="Last Name"
                        class="pa-0 mb-5"
                      ></v-text-field>
                      <v-text-field
                        v-model.trim="new_user.first_name"
                        solo
                        dense
                        label="First Name"
                        class="pa-0 mb-5"
                      ></v-text-field>
                      <v-text-field
                        v-model.trim="new_user.middle_name"
                        solo
                        dense
                        label="Middle Name"
                        class="pa-0 mb-5"
                      ></v-text-field>
                      <v-btn class="white indigo--text mb-12" @click="e1 = 1" icon fab>
                        <v-icon large>mdi-chevron-left</v-icon>
                      </v-btn>
                      <v-btn class="white indigo--text mb-12" @click="e1 = 3" icon fab>
                        <v-icon large>mdi-chevron-right</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-stepper-content>
              <v-stepper-content step="3">
                <v-avatar size="150" color="indigo" class="mb-10 elevation-1">
                  <v-icon size="80" color="white">mdi-phone</v-icon>
                </v-avatar>
                <v-container grid-list-xs>
                  <v-row no-gutters class="justify-space-around">
                    <v-col cols="10" class="py-1 px-0 text-center mr-1">
                      <v-text-field
                        v-model.trim="new_user.mobile"
                        solo
                        dense
                        type="number"
                        label="Mobile Number"
                        class="pa-0 mb-5"
                      ></v-text-field>
                      <v-btn class="white indigo--text mb-12" @click="e1 = 2" icon fab>
                        <v-icon large>mdi-chevron-left</v-icon>
                      </v-btn>
                      <v-btn class="white indigo--text mb-12" @click="e1 = 4" icon fab>
                        <v-icon large>mdi-chevron-right</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-stepper-content>
              <v-stepper-content step="4">
                <v-avatar size="150" color="indigo" class="mb-10 elevation-1">
                  <v-icon size="80" color="white">mdi-gender-male-female</v-icon>
                </v-avatar>
                <v-container grid-list-xs>
                  <v-row no-gutters class="justify-space-around">
                    <v-col cols="10" class="py-1 px-0 text-center">
                      <v-select
                        v-model.trim="new_user.gender"
                        dense
                        solo
                        :items="gender_items"
                        name="user_gender"
                        label="Gender"
                      ></v-select>
                      <v-btn class="white indigo--text mb-12" @click="e1 = 3" icon fab>
                        <v-icon large>mdi-chevron-left</v-icon>
                      </v-btn>
                      <v-btn class="white indigo--text mb-12" @click="e1 = 5" icon fab>
                        <v-icon large>mdi-chevron-right</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-stepper-content>
              <v-stepper-content step="5">
                <v-avatar size="150" color="indigo" class="mb-10 elevation-1">
                  <v-icon size="80" class="white--text" dark>mdi-lock</v-icon>
                </v-avatar>
                <v-container grid-list-xs>
                  <v-row no-gutters class="justify-space-around">
                    <v-col cols="4" class="py-1 px-0 text-center mr-1">
                      <v-text-field
                        v-model.trim="new_user.pin"
                        solo
                        dense
                        label="PIN"
                        type="password"
                        class="pa-0 mb-5"
                      ></v-text-field>
                      <v-text-field
                        v-model.trim="re_pin"
                        solo
                        dense
                        type="password"
                        label="RE-TYPE PIN"
                        class="pa-0 mb-5"
                      ></v-text-field>
                      <v-btn @click="register()" class="white indigo--text mx-1" icon fab>
                        <v-icon large>mdi-key</v-icon>
                      </v-btn>
                      <v-btn class="white indigo--text mb-12" @click="e1 = 4" icon fab>
                        <v-icon large>mdi-chevron-left</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
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
      by: "",
      e1: 1,
      snackbar: false,
      form_action: false,
      form_directive: true,
      response: {
        status: null,
        message: ""
      },
      re_pin: "",
      gender_items: ["Male", "Female"],
      new_user: {
        acct_no: "",
        first_name: "",
        last_name: "",
        middle_name: "",
        mobile: "",
        gender: "",
        pin: "",
        balance: 5000
      },
      new_banking_details: {
        credit: [
          {
            name: "Kenneth",
            amount: 3323,
            time: "2019/04/14",
          },
          {
            name: "James Brown",
            amount: 1133,
            time: "2019/01/12",
          },
          {
            name: "John Doe",
            amount: 345,
            time: "2018/05/31",
          },
          {
            name: "Michael Angelo",
            amount: 3844,
            time: "2019/06/23",
          },
          {
            name: "Lucifer Morning Star",
            amount: 20001,
            time: "2019/02/24",
          },
          {
            name: "Scott McCall",
            amount: 234,
            time: "2019/08/01",
          },
          {
            name: "Allison Argent",
            amount: 232,
            time: "2019/01/12",
          },
          {
            name: "Tyler Pose",
            amount: 45,
            time: "2019/05/31",
          },
          {
            name: "Lydia Martin",
            amount: 2334,
            time: "2019/06/23",
          },
          {
            name: "Stiles Stilinski",
            amount: 243,
            time: "2019/02/24",
          },
          {
            name: "Derek Hale",
            amount: 24,
            time: "2019/08/01",
          },
          {
            name: "Kate Argent",
            amount: 43,
            time: "2019/08/01",
          },
          {
            name: "Kira Yukimura",
            amount: 2,
            time: "2019/08/01",
          },
          {
            name: "Hayden Romero",
            amount: 3349,
            time: "2019/08/01",
          }
        ],
        debit: [
          {
            name: "Kenneth",
            acct_no: "1234567890",
            amount: 3323,
            time: "2019/04/14",
          },
          {
            name: "James Brown",
            acct_no: "1234566390",
            amount: 1133,
            time: "2019/01/12",
          },
          {
            name: "John Doe",
            acct_no: "1232367890",
            amount: 345,
            time: "2018/05/31",
          },
          {
            name: "Michael Angelo",
            amount: 3844,
            acct_no: "1234567824",
            time: "2019/06/23",
          },
          {
            name: "Lucifer Morning Star",
            amount: 20001,
            acct_no: "5234567890",
            time: "2019/02/24",
          },
          {
            name: "Scott McCall",
            amount: 234,
            acct_no: "1324567890",
            time: "2019/08/01",
          },
          {
            name: "Allison Argent",
            amount: 232,
            acct_no: "3210987890",
            time: "2019/01/12",
          },
          {
            name: "Tyler Pose",
            amount: 45,
            acct_no: "3210987123",
            time: "2019/05/31",
          },
          {
            name: "Lydia Martin",
            amount: 2334,
            acct_no: "3935987890",
            time: "2019/06/23",
          },
          {
            name: "Stiles Stilinski",
            amount: 243,
            acct_no: "3210976123",
            time: "2019/02/24",
          },
          {
            name: "Derek Hale",
            amount: 24,
            acct_no: "321023890",
            time: "2019/08/01",
          },
          {
            name: "Kate Argent",
            amount: 43,
            acct_no: "8946987890",
            time: "2019/08/01",
          },
          {
            name: "Kira Yukimura",
            amount: 2,
            acct_no: "3210983578",
            time: "2019/08/01",
          },
        ]
      }
    };
  },
  methods: {
    register() {
      this.loader = true;
      if (
        this.new_user.acct_no == "" &&
        this.new_user.pin == "" &&
        this.new_user.first_name == "" &&
        this.new_user.last_name == "" &&
        this.new_user.mobile == "" &&
        this.new_user.gender == ""
      ) {this.response.status = 'error'
        this.response.message = 'One or more empty fields.'
        this.e1 = 1
        this.loader = false
        this.snackbar = true
        return
        }else if(this.re_pin != this.new_user.pin){
        this.response.status = 'error'
        this.response.message = 'Pin does not match.'
        this.e1 = 5
        this.loader = false
        this.snackbar = true
        return
        }else{

        setTimeout(() => {
          this.$store.dispatch("update_current_user", this.new_user.acct_no);
          localStorage.setItem("login", "true");
          localStorage.setItem("logged_acct_no", String(this.new_user.acct_no));
          localStorage.setItem(String(this.new_user.acct_no), String(this.new_user.pin));
          this.$store.dispatch("update_user_profile", this.new_user);
          localStorage.setItem("user_profile", JSON.stringify(this.new_user));
          this.$store.dispatch("update_user_bank_details", this.new_banking_details);
          localStorage.setItem("user_bank_details", JSON.stringify(this.new_banking_details));
          this.pin = "";
          this.acct_no = "";
          this.loader = false;
          this.$router.push("finance_list_view");
        }, 2000);
      }
    }
  }
};
</script>
