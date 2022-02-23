<template>
  <div>
    <p>Wait until the host selected a game!</p>
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
