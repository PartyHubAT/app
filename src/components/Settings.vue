<template>
  <div v-if="settings">
    <button
      v-if="!isHost"
      @click="toggleSettings"
      class="px-6 text-center w-full py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out mb-2"
    >
      <span>Settings</span>
      <ChevronDownIcon
        v-if="!settingsOpen"
        class="h-5 w-5 ml-auto iconDown"
        aria-hidden="true"
      />
      <ChevronUpIcon
        v-if="settingsOpen"
        class="h-5 w-5 ml-auto iconUp"
        aria-hidden="true"
      />
    </button>
    <form v-if="settingsOpen" class="settingsForm">
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
import { ChevronDownIcon } from "@heroicons/vue/solid";
import { ChevronUpIcon } from "@heroicons/vue/solid";
export default {
  name: "Settings",
  components: { ChevronDownIcon, ChevronUpIcon },
  data() {
    return {
      settingsOpen: false,
    };
  },
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
    toggleSettings() {
      this.settingsOpen = !this.settingsOpen;
    },
  },
};
</script>

<style scoped>
.iconDown,
.iconUp {
  margin-top: -20px;
  margin-right: -15px;
  padding-top: 5px;
}

.settingsForm {
  transform-origin: top;
  transition: transform 0.3s ease-in-out;
}
</style>
