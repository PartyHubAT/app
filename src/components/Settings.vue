<template>
  <div style="border: 4px solid red" v-if="settings">
    <h3>Settings</h3>
    <form>
      <div
        v-for="element in settings"
        :key="element.key"
        style="border: 1px solid blue"
      >
        <div v-if="element.type == 'Number'">
          {{ element.name }}
          <label>{{ element.label }}</label>
          <input
            type="number"
            :min="element.min"
            :max="element.max"
            :required="element.required"
            v-model="element.defaultValue"
          />
        </div>
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
