<template>
  <button @click="selectGame">{{ game.name }}</button>
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
      this.$emit("selected", this.game.name);
    },
  },
  emits: ["selected"],
};
</script>

<style scoped></style>
