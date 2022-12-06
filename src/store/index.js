import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";  // https://codesandbox.io/s/f9hxw
import users from "./modules/users"
import works from "./modules/works"
import reviews from "./modules/reviews"
import skills from "./modules/skills"
import tooltip from "./modules/tooltip"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    users,
    works,
    reviews,
    skills,
    tooltip
  },
  plugins: [
    createPersistedState({
      paths: ["users", "works", "reviews", "skills", "tooltip"]
    })
  ]
});
