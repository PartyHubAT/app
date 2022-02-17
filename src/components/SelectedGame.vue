<template>
  <div>
    <h3 class="inline-block mb-2 mt-4 text-gray-700 text-2xl">
      Gewähltes Spiel:
    </h3>

    <p v-if="this.$root.selectedGame" class="text-center mt-12 text-4xl">
      {{ this.$root.selectedGame.displayName }}
    </p>
    <p v-if="!this.$root.selectedGame">
      Warte, bis der Host ein Spiel gewählt hat!
    </p>
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
