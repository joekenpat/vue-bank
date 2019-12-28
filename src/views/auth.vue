<template>
  <v-container fluid grid-list-xs class="pa-0">
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
            right
          >
            <v-icon color="white">mdi-shape-circle-plus</v-icon>
            {{ response.message }}
            <v-btn color="white" text icon @click="snackbar = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-snackbar>
    <v-row no-gutters class="justify-space-around">
      <v-col align-self="center" class="py-1 px-0 text-center">
        <v-card class="elevation-0">
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
                      v-model.trim="acct_no"
                        solo
                        dense
                        label="Account #No"
                        placeholder="Account #No"
                        hide-details
                        class="pa-0 mb-5"
                      ></v-text-field>
                <v-btn class="white indigo--text mb-12" @click="e1 = 2" icon fab>
                  <v-icon large>mdi-chevron-right</v-icon>
                </v-btn>
                    </v-col>
                  </v-row>
                  <v-btn to="register" block text class="white indigo--text mx-1 mt-12">REGISTER INSTEAD</v-btn>
                </v-container>

              </v-stepper-content>

              <v-stepper-content step="2">
                <v-avatar size="150" color="indigo" class="mb-10 elevation-1">
                  <v-icon size="80" class="white--text" dark>mdi-lock</v-icon>
                </v-avatar>
                <v-container grid-list-xs class="">
                  <v-row no-gutters class="d-flex">
                    <v-col cols="4" class="py-1 px-0 text-center mx-auto">
                      <v-text-field
                      v-model="pin"
                        solo
                        dense
                        label="ACCOUNT PIN"
                        type="password"
                        placeholder="PIN"
                        hide-details
                        class="pa-0"
                        id="id"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
                <v-spacer></v-spacer>
                <v-btn @click="login()" class="white indigo--text mx-1" icon fab>
                  <v-icon large>mdi-key</v-icon>
                </v-btn>
                <v-btn block class="white indigo--text" @click="e1 = 1" text>
                        <v-icon large>mdi-chevron-left</v-icon>
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
      by: "",
      e1: 0,
      snackbar: false,
      form_action: false,
      form_directive: true,
      response: {
        status: null,
        message: ""
      },
      loader: false,
      acct_no: "",
      pin: '',
    };
  },
  methods: {
    login(){
      this.loader = true
      if(this.acct_no == '' && this.pin == ''){
        this.response.status = 'error'
        this.response.message = 'One or more empty fields.'
        this.loader = false
        this.snackbar = true
        return
      }else if(this.pin != String(localStorage.getItem(String(this.acct_no)))){
        this.response.status = 'error'
        this.response.message = 'Wrong Account/Pin Combination.'
        this.loader = false
        this.snackbar = true
        return
      }else{
        setTimeout(()=>{
          this.$store.dispatch('update_current_user', this.acct_no)
          this.$store.dispatch('fetch_user_profile')
          this.$store.dispatch('fetch_user_bank_details')
          localStorage.setItem('login', 'true');
          localStorage.setItem("logged_acct_no", String(this.acct_no));
          this.pin = ''
          this.acct_no = ''
          this.loader = false
          this.$router.push('finance_list_view')
        }, 2000)
      }
    }
  }
}
</script>
