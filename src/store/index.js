import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index";
// import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    current_user: null,
    user_profile: {},
    user_bank_details: {}
  },
  mutations: {
    set_current_user(state, val) {
      state.current_user = val;
    },
    set_user_profile(state, val) {
      state.user_profile = val;
    },
    set_user_bank_details(state, val) {
      state.user_bank_details = val;
    }
  },
  actions: {
    log_out({ commit }) {
      commit("set_current_user", null);
      commit("set_user_profile", {});
      commit("set_user_bank_details", {});
      localStorage.removeItem("login");
      localStorage.removeItem("logged_acct_no");
      router.push("/auth");
    },
    update_current_user(store, val) {
      store.commit("set_current_user", val);
    },
    update_user_profile(store, val) {
      store.commit("set_user_profile", val);
    },
    update_user_bank_details(store, val) {
      store.commit("set_user_bank_details", val);
    },
    fetch_user_profile({ commit }) {
      var val = localStorage.getItem("user_profile");
      if (!val) {
        commit("set_user_profile", {});
      }
      commit("set_user_profile", JSON.parse(val));
    },
    fetch_user_bank_details({ commit }) {
      var val = localStorage.getItem("user_bank_details");
      if (!val) {
        commit("set_user_bank_details", {});
      }
      commit("set_user_bank_details", JSON.parse(val));
    },
    fetch_current_user({ commit }) {
      var val = localStorage.getItem("logged_acct_no");

      if (!localStorage.getItem("login") || !val) {
        commit("set_user_bank_details", null);
      }
      commit("set_user_bank_details", JSON.parse(val));
    }
  },
  modules: {}
});
