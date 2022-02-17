<template>
  <div class="flex justify-center w-full">
    <div class="w-9/12">
      <h1
        class="text-5xl font-medium leading-tight mt-8 mb-2 text-gray-700 text-center absolute left-1/2 transform -translate-x-1/2"
      >
        <span class="text-blue-600">P</span>arty<span class="text-blue-600"
          >H</span
        >ub {{ $route.params.id }}
      </h1>
      <h2
        class="text-gray-700 text-center absolute left-1/2 transform -translate-x-1/2 top-28"
      >
        Lobby <span class="text-blue-600">{{ roomId }}</span>
      </h2>
      <div class="flex justify-center h-screen flex-col pb-32">
        <div id="qrcode"></div>
        <div>
          <label class="inline-block mb-2 mt-4 text-gray-700 text-xl">
            Players
          </label>
          <ul>
            <li v-for="player in players" :key="player.name">
              {{ player.name }}
            </li>
          </ul>
        </div>
        <game-list v-if="isHost" />
        <selected-game v-else />
        <button
          v-if="!isHost"
          @click="showQRCode"
          class="inline-block px-6 w-full py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out mb-2"
        >
          Show QR-Code
        </button>
        <button
          :disabled="!isHost"
          @click="startGame"
          class="inline-block w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Play
        </button>
        <div
          id="modalContainer"
          class="w-screen h-screen bg-gray-100 bg-opacity-60 absolute top-0 left-0"
          :class="isVisible ? 'block' : 'hidden'"
        ></div>
        <div
          id="QRContainer"
          class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 p-2 z-10 rounded-md drop-shadow-2xl popup"
          :class="
            isVisible ? 'opacity-100 isVisible ' : 'opacity-0 isInvisible '
          "
        >
          <VueQRCodeComponent :text="link" />
          <!--<a :href="link">{{ link }}</a>-->
        </div>
      </div>
    </div>
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
      isVisible: false,
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
    showQRCode() {
      setTimeout(() => {
        this.isVisible = true;
      }, 10);
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
  created() {
    document.onclick = () => {
      if (this.isVisible) this.isVisible = false;
    };
  },
};
</script>

<style scoped>
#QRContainer,
#modalContainer {
  transition: all 200ms ease-in-out;
}
.popup {
  transform: translate(-50%, -50%) scale(0);
}
.isInvisible {
}
.isVisible {
  transform: translate(-50%, -50%) scale(1);
}
</style>
