<template>
  <v-container fluid grid-list-xs class="pa-0 white">
    <v-row no-gutters class="d-flex justify-center">
      <v-col cols="12" align-self="center" class="py-1 px-0 text-center">
        <CardForm
          :form-data="formData"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import CardForm from "../components/CardForm";
export default {
  data() {
    return {
      snackbar: false,
      formData: {
        cardName: "",
        cardNumber: "",
        cardMonth: "",
        cardYear: "",
        cardCvv: "",
      },
    };
  },
  components: {
    CardForm
  },
  methods: {
  },
};
</script>
<style lang="scss">
@import "@/assets/style.scss";
</style>