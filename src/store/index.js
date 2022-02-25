import { createStore } from "vuex";

export default createStore({
  state: {
    roomId: 0,
    gameName: "",
    gateway: "",
    port: 3000,
  },
  mutations: {
    joinRoom(state, id) {
      state.roomId = id;
    },
    startGame(state, gameName) {
      state.gameName = gameName;
    },
    gateway(state, gateway) {
      state.gateway = gateway;
    },
    port(state, port) {
      state.port = port;
    },
  },
  actions: {},
  modules: {},
});
