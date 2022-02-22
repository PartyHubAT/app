<template>
  <div id="page">
    <iframe ref="gameContainer" id="gameContainer" :src="gameUrl"></iframe>
  </div>
</template>
<script>
export default {
  name: "Game",
  computed: {
    gameUrl() {
      return `http://${window.location.host}/game/${this.$store.state.gameName}/index.html`;
    },
    roomId() {
      return this.$store.state.roomId;
    },
    gateway() {
      return this.$store.state.gateway;
    },
    port() {
      return this.$store.state.port;
    },
    link() {
      return `http://${this.gateway}:${this.port}/#/join/${this.roomId}`;
    },
  },
  methods: {
    returnToLobby() {
      this.$router.push("/").then(() => window.location.reload());
    },
    onOrientationChanged(evt) {
      this.$refs.gameContainer.contentWindow.postMessage(
        {
          alpha: evt.alpha,
          beta: evt.beta,
          gamma: evt.gamma,
        },
        this.gameUrl
      );
    },
  },
  mounted() {
    this.$refs.gameContainer.contentWindow.socket = this.$socket;
  },

  created() {
    window.addEventListener("message", this.returnToLobby, false);
    if (window.DeviceOrientationEvent) {
      window.addEventListener(
        "deviceorientation",
        this.onOrientationChanged,
        false
      );
    } else {
      alert("Device does not support device-orientation");
    }
  },

  unmounted() {
    window.removeEventListener("message", this.returnToLobby, false);
    window.removeEventListener(
      "deviceorientation",
      this.onOrientationChanged,
      false
    );
  },
};
</script>

<style scoped>
#page {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

#gameContainer {
  flex-grow: 1;
  border: 0;
}
</style>
