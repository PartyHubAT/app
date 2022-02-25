<template>
  <button
    @click="selectGame"
    :class="{ selected: game.selected }"
    class="rounded-md p-2 mr-2"
  >
    {{ game.displayName }}
  </button>
</template>

<script>
export default {
  name: "GameDisplay",
  props: {
    game: {
      type: Object,
      required: true,
    },
  },
  methods: {
    selectGame() {
      this.$root.selectedGame = this.game;
      this.$emit("selected", this.game.name);
    },
  },
  emits: ["selected"],
};
</script>

<style scoped>
.selected {
  color: white;
  background-color: rgb(37, 99, 235);
}
</style>
