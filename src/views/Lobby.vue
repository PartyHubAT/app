<template>
  <div>
    <h1>PH</h1>
    <h2>Lobby {{ roomId }}</h2>
  </div>
</template>

<script>
export default {
  name: "Lobby",
  computed: {
    roomId() {
      return this.$store.state.roomId;
    },
  },
};
</script>

<style scoped></style>
