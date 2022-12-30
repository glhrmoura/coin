<template>
  <component :is="tag" :class="['heading', `heading--${tag}`]">
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'h1',
    }
  },
};
</script>

<style scoped>
.heading {
  margin: 0px;
  color: #ADADAD;
}

.heading--h1 {
  font-size: 42px;
  font-weight: 600;
}

.heading--h2 {
  font-size: 38px;
  font-weight: 600;
}

.heading--h3 {
  font-size: 32px;
  font-weight: 400;
}

.heading--h4 {
  font-size: 28px;
  font-weight: 400;
}

.heading--h5 {
  font-size: 22px;
  font-weight: 400;
}

.heading--h6 {
  font-size: 16px;
  font-weight: 400;
}
</style>