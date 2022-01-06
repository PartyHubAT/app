import { createStore } from "vuex";

export default createStore({
  state: {
    roomId: 0,
    gameName: "",
  },
  mutations: {
    joinRoom(state, id) {
      state.roomId = id;
    },
    startGame(state, gameName) {
      state.gameName = gameName;
    },
  },
  actions: {},
  modules: {},
});
