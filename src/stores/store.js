import Vue from "vue"
import Vuex from "vuex"
import { serviceStore } from './modules/service-store';

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
      serviceStore,
    },
  })