<template>
  <button
    class="button"
    :class="[`button--${type}`]"
    :disabled="disabled"
  >
    <slot v-if="$slots.default" />

    <span v-else-if="title">
      {{ title }}
    </span>
  </button>
</template>

<script>
export default {
  props: {
    title: String,

    disabled: Boolean,

    type: {
      type: String,
      default: 'primary',
    },
  },
};
</script>

<style scoped>
.button {
  padding: 12px;
  border: none;
  width: 100px;
  border-radius: 4px;
  font-size: 10px;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.4px;
  cursor: pointer;
  transition: color .2s, background-color .2s;
}

.button:active {
  opacity: 0.9;
}

.button--primary {
  color: #000000;
  background-color: #FFBC00;
}

.button--primary:disabled {
  color: #8F8F8F;
  cursor: default;
  background-color: #2E2E2E;
}

.button--ghost {
  color: #FFFFFF;
  padding: 0px;
  width: auto;
  background-color: transparent;
}
</style>
