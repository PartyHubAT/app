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
    <Settings :settings="settings" v-if="role === 'HOST'" />
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
      role: "GUEST",
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
            this.selectGame(this.games[0]);
            this.getSettings(this.games[0].name);
          }
        })
        .catch((e) => console.log(e));
    },
    selectGame(game) {
      this.games.forEach((game) => {
        game.selected = false;
      });
      game.selected = true;
      const gameName = game.name;
      this.$socket.emit("selectGame", { gameName });
      this.getSettings(gameName);
    },
    getSettings(gameName) {
      this.axios
        .get(`/gameSettings/${gameName}`)
        .then((res) => res.data)
        .then((data) => {
          const form = data.form;
          const keysForm = Object.keys(form);
          for (let value of keysForm) {
            form[value].key = value;
          }
          if (data.defaultValues) {
            const keysDefault = Object.keys(data.defaultValues);
            for (let value of keysDefault) {
              if (data.defaultValues[value]) {
                form[value].value = "";
                form[value].value = data.defaultValues[value];
              }
            }
          }
          this.settings = form;
        })
        .catch((e) => console.log(e));
    },
  },
  mounted() {
    this.refreshGameList();
    this.role = this.$root.role;
  },
};
</script>

<style scoped></style>
