<template>
  <div class="flex justify-center w-full">
    <div class="w-10/12">
      <h1
        class="text-5xl font-medium leading-tight mt-8 mb-2 text-gray-700 text-center absolute left-1/2 transform -translate-x-1/2"
      >
        <span class="text-blue-600">P</span>arty<span class="text-blue-600"
          >H</span
        >ub {{ $route.params.id }}
      </h1>
      <h2
        class="text-gray-700 text-center absolute left-1/2 transform -translate-x-1/2 top-28 text-xl"
      >
        Lobby <span class="text-blue-600 font-bold">{{ roomId }}</span>
      </h2>
      <div class="mt-40">
        <div id="qrcode"></div>
        <div>
          <label class="inline-block mb-2 mt-4 text-gray-700 text-2xl">
            Players ({{ players.length }})
          </label>
          <div class="grid grid-cols-2">
            <div
              class="player text-blue-600 font-bold pb-2"
              v-for="player in players"
              :key="player.name"
            >
              {{ player.name }}
            </div>
          </div>
        </div>
        <game-list v-if="isHost" />
        <selected-game v-else />
        <button
          v-if="isHost"
          @click="showGameInfo"
          class="inline-block px-6 w-full py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out mb-2"
        >
          Game Description
        </button>
        <button
          v-if="isHost"
          @click="showQRCode"
          class="inline-block px-6 w-full py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out mb-2"
        >
          Show QR-Code
        </button>
        <button
          v-if="isHost"
          @click="startGame"
          class="inline-block w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Play
        </button>
        <div
          id="modalContainer"
          class="w-screen h-screen bg-gray-500 bg-opacity-80 absolute top-0 left-0"
          :class="isQRCodeVisible || isGameInfoVisible ? 'block' : 'hidden'"
        ></div>
        <div
          id="QRContainer"
          class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 p-3 z-10 rounded-md drop-shadow-2xl popup"
          :class="
            isQRCodeVisible ? 'opacity-100 isVisible' : 'opacity-0 isInvisible'
          "
        >
          <VueQRCodeComponent :text="link" class="w-full" />
          <div class="text-white font-medium">
            <p class="uppercase">Link to join</p>
            <a :href="link">{{ link }}</a>
          </div>
        </div>
        <div
          id="InfoContainer"
          class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-2 z-10 rounded-md drop-shadow-2xl popup w-11/12"
          :class="
            isGameInfoVisible
              ? 'opacity-100 isVisible '
              : 'opacity-0 isInvisible '
          "
        >
          <GameInfo :game="this.$root.selectedGame" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import GameList from "../components/GameList";
import VueQRCodeComponent from "vue-qrcode-component";
import GameInfo from "../components/GameInfo.vue";
import SelectedGame from "../components/SelectedGame";
export default {
  name: "Lobby",
  components: { SelectedGame, GameList, VueQRCodeComponent, GameInfo },
  data() {
    return {
      players: [],
      role: "GUEST",
      isQRCodeVisible: false,
      isGameInfoVisible: false,
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
        this.isQRCodeVisible = true;
      }, 10);
    },
    showGameInfo() {
      setTimeout(() => {
        this.isGameInfoVisible = true;
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
    this.$socket.emit("onLobbyJoined", {});
    document.onclick = () => {
      if (this.isQRCodeVisible) this.isQRCodeVisible = false;
      if (this.isGameInfoVisible) this.isGameInfoVisible = false;
    };
  },
};
</script>

<style scoped>
#QRContainer,
#modalContainer,
#InfoContainer {
  transition: all 200ms ease-in-out;
}
#QRContainer img {
  margin: 0 auto;
  padding: 20px;
}
.popup {
  transform: translate(-50%, -50%) scale(0);
}
.isVisible {
  transform: translate(-50%, -50%) scale(1);
}
.players {
  transition: all 200ms ease-in-out;
}
</style>
