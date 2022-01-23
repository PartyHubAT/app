<template>
  <div style="border: 4px solid red" v-if="settings">
    <h3>Settings</h3>
    <form>
      <div
        v-for="(element, name) in settings.form"
        :key="name"
        style="border: 1px solid blue"
      >
        <label>{{ element.name }}</label>
        <label>{{ element.label }}</label>
        <input
          v-if="element.type == 'Number'"
          type="number"
          :min="element.min"
          :max="element.max"
          :required="element.required"
        />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Settings",
  props: {
    settings: {
      type: Object,
    },
  },
  methods: {},
};
</script>

<style scoped></style>
