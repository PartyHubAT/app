<template>
  <div id="page">
    <h1>PH</h1>
    <iframe ref="gameContainer" id="gameContainer" :src="gameUrl"></iframe>
  </div>
</template>
<script src="https://cdn.rawgit.com/davidshimjs/qrcodejs/master/qrcode.js"></script>
<script>
export default {
  name: "Game",
  computed: {
    gameUrl() {
      return `http://${window.location.host}/game/${this.$store.state.gameName}/index.html`;
    },
  },
  mounted() {
    this.$refs.gameContainer.contentWindow.socket = this.$socket;
  },
};
</script>

<style scoped>
#page {
  display: flex;
  flex-direction: column;
  height: 95vh;
}
#gameContainer {
  flex-grow: 1;
}
</style>
