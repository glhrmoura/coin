<template>
  <label class="block text-grey-light text-[10px] font-light" for="selectTo">
    {{ title }}
  </label>
</template>

<script>
export default {
  props: {
    title: String,
  },
};
</script>
