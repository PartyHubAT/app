import { createStore } from "vuex";

export default createStore({
  state: {
    roomId: 0,
  },
  mutations: {
    joinRoom(state, id) {
      state.roomId = id;
    },
  },
  actions: {},
  modules: {},
});
