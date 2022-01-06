<template>
  <div>
    <h3>Game</h3>
    <p>{{ selectedGame }}</p>
  </div>
</template>

<script>
export default {
  name: "SelectedGame",
  data() {
    return {
      selectedGame: "",
    };
  },
  sockets: {
    gameSelected(data) {
      const { gameName } = data;
      this.selectedGame = gameName;
    },
  },
};
</script>

<style scoped></style>
