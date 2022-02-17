<template>
  <div v-if="game" class="w-full bg-white">
    <div id="infoContent" class="my-4">
      <h4 id="gameTitle" class="text-xl font-bold text-center">
        {{ game.displayName }}
      </h4>
      <br />
      <div class="px-3">
        <span class="font-bold">Beschreibung:</span>
        <br />
        <span>{{ game.description }}</span>
      </div>
      <br />
      <div class="px-3">
        <span class="font-bold">Spieleranzahl:</span>
        <br />
        {{ game.minPlayerCount }}-{{ game.maxPlayerCount }}
      </div>
    </div>
  </div>
  <div v-else class="w-full bg-white">
    <h1>Bitte wähle ein Spiel aus!</h1>
  </div>
</template>

<script>
export default {
  name: "GameInfo",
  props: {
    game: {
      type: Object,
      required: true,
    },
  },
  methods: {},
};
</script>

<style scoped></style>
