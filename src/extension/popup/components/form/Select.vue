<template>
  <div class="form-input__select-container">
    <select
      tabindex="0"
      :value="value"
      class="form-input__select"
      @change="onChange"
    >
      <option
        v-for="option in options"
        :key="option.title"
        :value="option.value"
      >
        {{ option.title }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    value: String,

    options: {
      type: Array,
      default: () => ([]),
    }
  },

  methods: {
    onChange(event) {
      this.$emit('change', event);
      this.$emit('update:value', event.target.value);
    }
  },
};
</script>

<style scoped>
.form-input__select {
  position: relative;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: #333333;
  border: 1px solid #ADADAD;
  border-radius: 4px;
  padding: 12px 18px 12px 12px;
  width: 200px;
  cursor: pointer;
  color: #FFFFFF;
}

.form-input__select-container {
  position: relative;
}

.form-input__select-container::after {
  content: '';
  position: absolute;
  border: 5px solid transparent;
  border-top-color: #ADADAD;
  top: 18px;
  right: 12px;
  pointer-events: none;
}
</style>