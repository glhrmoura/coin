<template>
  <div
    class="relative after:content-[''] after:absolute after:border-[5px] after:border-transparent 
    after:border-t-grey-light after:top-[18px] after:right-[12px] after:pointer-events-none"
  >
    <select
      :value="value"
      class="appearance-none relative bg-grey-dark border-[1px] border-grey-light rounded
      py-3 pl-3 pr-5 w-[200px] cursor-pointer text-white"
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
