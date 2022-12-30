<template>
  <div>
    <label class="text-grey-light text-[10px] font-light" for="selectTo">
      {{ title }}
    </label>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
  },
};
</script>
