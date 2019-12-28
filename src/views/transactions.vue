<template>
  <v-container fluid grid-list-xs class="pa-0 white">
    <v-row no-gutters class="white">
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
          text: "DEBIT TRANSACTIONS",
          icon: "mdi-database-minus",
          to: "debit_transactions"

        },
        {
          text: "CREDIT TRANSACTIONS",
          icon: "mdi-database-plus",
          to: "credit_transactions"
        },
      ]
    };
  }
};
</script>
<style scoped>

</style>