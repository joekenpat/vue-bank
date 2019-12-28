<template>
  <v-container fluid grid-list-xs class="pa-0 white">
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
    <v-row no-gutters class="d-flex justify-center mb-5">
      <v-col cols="12" class="pa-0">
        <v-card class="mx-auto elevation-0" light style="border-radius:0;">
          <v-form>
          <v-container grid-list-xs>
            <v-row no-gutters>
              <v-col cols="12" sm="12">
                <v-text-field
                :disabled="form_status == 'VIEW'"
                  v-model.trim="update_user_data.first_name"
                  name="user_first_name"
                  label="First Name"
                  type="text"
                  :outlined="form_status == 'EDIT'"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12">
                <v-text-field
                :disabled="form_status == 'VIEW'"
                  v-model.trim="update_user_data.last_name"
                  name="user_last_name"
                  label="Last Name"
                  type="text"
                  :outlined="form_status == 'EDIT'"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12">
                <v-text-field
                :disabled="form_status == 'VIEW'"
                  v-model.trim="update_user_data.middle_name"
                  name="user_middle_name"
                  label="Middle Name"
                  type="text"
                  :outlined="form_status == 'EDIT'"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12">
                <v-text-field
                :disabled="form_status == 'VIEW'"
                  v-model.trim="update_user_data.mobile"
                  name="user_mobile"
                  label="Mobile"
                  type="text"
                  :outlined="form_status == 'EDIT'"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12">
                <v-select
                :disabled="form_status == 'VIEW'"
                  v-model.trim="update_user_data.gender"
                  :items="gender_items"
                  name="user_gender"
                  label="Gender"
                  :outlined="form_status == 'EDIT'"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="12">
                <v-text-field
                v-model.trim="update_user_data.pin"
                :disabled="form_status == 'VIEW'"
                  name="user_pin"
                  label="Transfer Pin"
                  type="text"
                  :outlined="form_status == 'EDIT'"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-card-actions>
        <v-btn v-if="form_status === 'EDIT'" text color="dark-grey" @click="form_status = 'VIEW'">
          <v-icon right dark>mdi-chevron-left</v-icon>Cancel
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          v-if="form_status === 'VIEW'"
          color="orange"
          text
          class="white--text"
          @click="form_status = 'EDIT'"
        >
          <v-icon right dark>mdi-brush</v-icon>Edit
        </v-btn>
        <v-btn
          v-if="form_status === 'EDIT'"
          color="green"
          text
          @click="update()"
          class="white--text"
        >
          Update
          <v-icon right dark>mdi-check-circle</v-icon>
        </v-btn>
      </v-card-actions>
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
      form_status: 'VIEW',
      gender_items: ['Male', 'Female'],
      update_user_data: {
        first_name: '',
        last_name: '',
        middle_name: '',
        mobile: '',
        gender: '',
        pin: ''
      },
      loader: false,
      snackbar: false,
      response: {
        status: '',
        message: ''
      }

    };
  },
  created(){
    this.load_data()
  },
  methods: {
    load_data(){
      this.$store.dispatch('fetch_user_profile')
      this.update_user_data = this.user_profile
      return
    },
    update() {
      this.loader = true;
      if (
        this.update_user_data.acct_no == "" &&
        this.update_user_data.pin == "" &&
        this.update_user_data.first_name == "" &&
        this.update_user_data.last_name == "" &&
        this.update_user_data.mobile == "" &&
        this.update_user_data.gender == ""
      ) {this.response.status = 'error'
        this.response.message = 'One or more empty fields.'
        this.loader = false
        this.snackbar = true
        return
        }else{
        setTimeout(() => {
          this.$store.dispatch("update_user_profile", this.update_user_data);
          localStorage.setItem("user_profile", JSON.stringify(this.update_user_data));
          this.response.status = 'success'
        this.response.message = 'Profile Updated.'
        this.load_data()
        this.loader = false
        this.snackbar = true
        return
        }, 2000);
      }
    }
  },
  computed: {
    ...mapState(['current_user', 'user_profile', 'user_bank_details'])
  }

};
</script>
