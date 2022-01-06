<template>
  <div>
    <h1>PH</h1>
    <h2>Lobby {{ roomId }}</h2>
    <div>
      <h3>Players</h3>
      <ul>
        <li v-for="player in players" :key="player.name">{{ player.name }}</li>
      </ul>
    </div>
    <game-list v-if="isHost" />
    <selected-game v-else />
    <button :disabled="!isHost" @click="startGame">Play</button>
  </div>
</template>

<script>
import GameList from "../components/GameList";
import SelectedGame from "../components/SelectedGame";
export default {
  name: "Lobby",
  components: { SelectedGame, GameList },
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
    isHost() {
      return this.role === "HOST";
    },
  },
  methods: {
    startGame() {
      this.$socket.emit("startGame", {});
    },
  },
  sockets: {
    playersChanged(data) {
      const { playerNames } = data;
      this.players = playerNames.map((it) => ({ name: it }));
    },
    roleChanged(data) {
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
