<template>
  <div>
    <h1>Partyhub</h1>
    <h2>Lobby {{ roomId }}</h2>
    <div id="qrcode"></div>
    <div>
      <h3>Players</h3>
      <ul>
        <li v-for="player in players" :key="player.name">{{ player.name }}</li>
      </ul>
    </div>
    <game-list v-if="isHost" />
    <selected-game v-else />
    <button :disabled="!isHost" @click="startGame">Play</button>
    <VueQRCodeComponent :text="link" />
    <a :href="link">{{ link }}</a>
  </div>
</template>
<script>
import GameList from "../components/GameList";
import SelectedGame from "../components/SelectedGame";
import VueQRCodeComponent from "vue-qrcode-component";
export default {
  name: "Lobby",
  components: { SelectedGame, GameList, VueQRCodeComponent },
  data() {
    return {
      players: [],
      role: "GUEST",
    };
  },
  computed: {
    roomId() {
      return this.$store.state.roomId;
    },
    gateway() {
      return this.$store.state.gateway;
    },
    port() {
      return this.$store.state.port;
    },
    isHost() {
      return this.role === "HOST";
    },
    // eslint-disable-next-line vue/return-in-computed-property
    link() {
      return `http://${this.gateway}:${this.port}/#/join/${this.roomId}`;
    },
  },
  methods: {
    startGame() {
      if (this.isHost && this.$root.gameSettings) {
        this.$socket.emit("startGame", this.$root.gameSettings);
      } else this.$socket.emit("startGame", {});
    },
  },
  sockets: {
    playersChanged(data) {
      const { playerNames } = data;
      this.players = playerNames.map((it) => ({ name: it }));
    },
    roleChanged(data) {
      this.$root.role = data.role;
      const { role } = data;
      this.role = role;
    },
    gameStarted(data) {
      const { gameName } = data;
      this.$store.commit("startGame", gameName);
      this.$router.push("/game");
    },
  },
};
</script>

<style scoped></style>
