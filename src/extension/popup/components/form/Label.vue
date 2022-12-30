<template>
  <div class="form-input__label-container">
    <label class="form-input__label" for="selectTo">
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

<style scoped>
.form-input__label-container {
  margin-bottom: 8px;
}

.form-input__label {
  color: #ADADAD;
  font-size: 10px;
  font-weight: 300;
}
</style>
