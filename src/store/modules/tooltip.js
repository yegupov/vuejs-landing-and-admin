export default {
  namespaced: true,

  state: {
    show: false,
    type: "",
    text: ""
  },
  
  mutations: {
    SHOW_TOOLTIP: (state, params) => {
      state.show = true;
      state.type = params.type;
      state.text = params.text;
    },
    CLOSE_TOOLTIP: state => {
      state.show = false;
    }
  }
};
