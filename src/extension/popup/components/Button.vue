<template>
  <button
    :disabled="disabled"
    :class="[`button--${type}`]"
    class="p-3 border-none w-[100px] rounded text-[10px] uppercase font-bold cursor-pointer 
    transition-colors active:opacity-90"
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
.button--primary {
  @apply bg-yellow-medium text-black;
}

.button--primary:disabled {
  @apply bg-grey-darker cursor-default text-grey-medium;
}

.button--ghost {
  @apply bg-transparent w-auto p-0 text-white;
}
</style>
