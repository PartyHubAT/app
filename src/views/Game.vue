<template>
  <div id="page">
    <h1 class="title">PartyHub</h1>
    <h1 class="roomId">Room-Id: {{ roomId }}</h1>
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
    addOrientationListener() {
      if (window.DeviceOrientationEvent) {
        window.addEventListener(
          "deviceorientation",
          (evt) => {
            var iframe = document.getElementById("gameContainer").contentWindow;
            iframe.postMessage(
              {
                alpha: evt.alpha,
                beta: evt.beta,
                gamma: evt.gamma,
              },
              this.gameUrl
            );
          },
          false
        );
      } else {
        alert("ori geht nicht");
      }
    },
  },
  mounted() {
    this.$refs.gameContainer.contentWindow.socket = this.$socket;
    this.addOrientationListener();
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
#roomId {
  float: right;
}
.title {
  position: absolute;
  font-size: 15px;
  top: 10px;
  left: 10px;
  font-family: Arial, Helvetica, sans-serif;
  color: white;
}
.roomId {
  position: absolute;
  font-size: 15px;
  top: 10px;
  right: 10px;
  font-family: Arial, Helvetica, sans-serif;
  color: white;
}
</style>
