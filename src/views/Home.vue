<template>
  <div>
    <h1>PH</h1>
    <h2>Home</h2>
    <form>
      <div>
        <label>
          Name
          <input v-model="playerName" required />
        </label>
      </div>
      <button @click="host">Host</button>
      <div>
        <label>
          Room-id
          <input v-model="roomId" type="text" />
        </label>
      </div>
      <button @click="join" :disabled="playerName == ''">Join</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      playerName: "",
      roomId: 0,
    };
  },
  methods: {
    host() {
      this.$socket.emit("newRoom", { playerName: this.playerName });
    },
    join() {
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
};
</script>

<style scoped></style>
