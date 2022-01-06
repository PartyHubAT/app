<template>
  <div>
    <h1>PH</h1>
    <h2>Lobby {{ roomId }}</h2>
    <div>
      <h3>Players</h3>
      <ul>
        <li v-for="player in players" :key="player.name">{{ player.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Lobby",
  data() {
    return {
      players: [],
    };
  },
  computed: {
    roomId() {
      return this.$store.state.roomId;
    },
  },
};
</script>

<style scoped></style>
