<template>
  <div>
    <h1>PH</h1>
    <h2>Home</h2>
    <div>
      <label> Name </label>
      <div :class="{ error: v$.playerName.$errors.length }">
        <input v-model="playerName" required maxlength="64" minlength="1" />
        <div
          class="input-errors"
          v-for="error of v$.playerName.$errors"
          :key="error.$uid"
        >
          <div class="error-msg">Enter a valid player name</div>
        </div>
      </div>
    </div>
    <button @click="host" :disabled="playerName == ''">Host</button>
    <div>
      <label> Room-id </label>
      <div :class="{ error: v$.roomId.$errors.length }">
        <input
          v-model="roomId"
          type="text"
          pattern="^\d{1,6}$"
          placeholder="123456"
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
    <button @click="join" :disabled="playerName == '' || roomId == ''">
      Join
    </button>
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
    joinLobby(roomId) {
      this.$store.commit("joinRoom", roomId);
      this.$router.push("/lobby");
    },
  },
  sockets: {
    roomCreated(data) {
      const { roomId } = data;
      this.joinLobby(roomId);
    },
    joinSuccess(data) {
      const { roomId } = data;
      this.joinLobby(roomId);
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
