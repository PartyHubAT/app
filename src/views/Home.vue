<template>
  <div>
    <h1>PH</h1>
    <h2>Home</h2>
    <div>
      <label>
        Name
        <input v-model="playerName" />
      </label>
    </div>
    <button @click="host">Host</button>
    <div>
      <label>
        Room-id
        <input v-model="roomId" type="number" />
      </label>
    </div>
    <button>Join</button>
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
  },
};
</script>

<style scoped></style>
