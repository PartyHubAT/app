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
            v-model="element.value"
          />
        </div>
        <div v-if="element.type == 'Text' || element.type == 'String'">
          {{ element.name }}
          <label>{{ element.label }}</label>
          <input
            type="text"
            :required="element.required"
            v-model="element.value"
          />
        </div>
        <div v-if="element.type == 'Checkbox'">
          {{ element.name }}
          <label>{{ element.label }}</label>
          <input
            type="checkbox"
            :required="element.required"
            v-model="element.value"
          />
        </div>
        <div v-if="element.type == 'Select'">
          {{ element.name }}
          <label>{{ element.label }}</label>
          <select v-model="element.value" :multiple="element.multiple">
            <option
              v-for="option in element.options"
              :key="option"
              :value="option"
            >
              {{ option }}
            </option>
          </select>
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
  watch: {
    settings: {
      handler: function () {
        this.computedSettings();
      },
      deep: true,
    },
  },
  mounted() {},
  methods: {
    computedSettings() {
      const keys = Object.keys(this.settings);
      let settings = {};
      for (let value of keys) {
        settings[value] = this.settings[value].value;
      }
      this.$root.gameSettings = settings;
    },
  },
};
</script>

<style scoped></style>
