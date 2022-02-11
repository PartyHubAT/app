<template>
  <div class="flex justify-center">
    <div class="mb-3 xl:w-96">
      <h1 class="text-5xl font-medium leading-tight mt-0 mb-2 text-blue-600">
        PartyHub {{ $route.params.id }}
      </h1>
      <h2 class="text-3xl font-medium leading-tight mt-0 mb-2 text-blue-600">
        Home
      </h2>
      <div>
        <label class="form-label inline-block mb-2 text-gray-700 text-xl">
          Name
        </label>
        <div :class="{ error: v$.playerName.$errors.length }">
          <input
            v-model="playerName"
            required
            maxlength="64"
            minlength="1"
            ref="playerNameInput"
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
          <div
            class="input-errors"
            v-for="error of v$.playerName.$errors"
            :key="error.$uid"
          >
            <div class="error-msg">Enter a valid player name</div>
          </div>
        </div>
      </div>
      <button
        @click="host"
        :disabled="playerName == ''"
        class="inline-block px-6 w-full py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
      >
        Host
      </button>
      <div>
        <label class="form-label inline-block mb-2 text-gray-700 text-xl">
          Room-id
        </label>
        <div :class="{ error: v$.roomId.$errors.length }">
          <input
            v-model="roomId"
            type="text"
            pattern="^\d{1,6}$"
            placeholder="123456"
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
          <div
            class="input-errors"
            v-for="error of v$.roomId.$errors"
            :key="error.$uid"
          >
            <div class="error-msg">Enter a six digit room numbers</div>
          </div>
        </div>
      </div>
      <button
        @click="join"
        :disabled="playerName == '' || roomId == ''"
        class="inline-block w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      >
        Join
      </button>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const validateRoomId = (roomId) => {
  return roomId.toString().match(/(?<!\d)\d{6}(?!\d)/);
};

export default {
  name: "Home",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      playerName: "",
      roomId: "",
    };
  },
  created() {
    if (this.$route && this.$route.params) {
      this.roomId = this.$route.params.roomId;
    }
  },
  methods: {
    host() {
      this.$socket.emit("newRoom", { playerName: this.playerName });
    },
    async join() {
      const validInput = await this.v$.$validate();
      if (!validInput) return;
      this.$socket.emit("joinRoom", {
        roomId: this.roomId,
        playerName: this.playerName,
      });
    },
    joinLobby(roomId, gateway, port) {
      this.$store.commit("joinRoom", roomId);
      this.$store.commit("gateway", gateway);
      this.$store.commit("port", port);
      this.$router.push("/lobby");
    },
  },
  sockets: {
    roomCreated(data) {
      console.log(data);
      const { roomId, gateway, port } = data;
      this.joinLobby(roomId, gateway, port);
    },
    joinSuccess(data) {
      console.log(data);
      const { roomId, gateway, port } = data;
      this.joinLobby(roomId, gateway, port);
    },
  },
  validations() {
    return {
      playerName: { required },
      roomId: { validateRoomId },
    };
  },
};
</script>

<style scoped></style>
