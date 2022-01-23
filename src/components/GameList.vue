<template>
  <div>
    <h3>Games</h3>
    <div v-if="hasGames">
      <game-display
        v-for="game in games"
        :game="game"
        :key="game.name"
        @selected="selectGame($event)"
      />
    </div>
    <Settings :settings="settings" />
  </div>
</template>

<script>
import GameDisplay from "./GameDisplay";
import Settings from "./Settings";

export default {
  name: "GameList",
  components: { GameDisplay, Settings },
  data() {
    return {
      games: [],
      settings: null,
    };
  },
  computed: {
    hasGames() {
      return this.games.length > 0;
    },
  },
  methods: {
    refreshGameList() {
      this.axios
        .get("/games")
        .then((res) => res.data)
        .then((data) => {
          this.games = data.games;
          if (this.games.length >= 1) {
            this.selectGame(this.games[0].name);
            this.getSettings(this.games[0].name);
          }
        })
        .catch((e) => console.log(e));
    },
    selectGame(gameName) {
      this.$socket.emit("selectGame", { gameName });
    },
    getSettings(gameName) {
      this.axios
        .get(`/gameSettings/${gameName}`)
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
          this.settings = data;
        })
        .catch((e) => console.log(e));
    },
  },
  mounted() {
    this.refreshGameList();
  },
};
</script>

<style scoped></style>
