<template>
  <div class="label">
    <span class="color-square" :style="{ 'background-color': color }"></span>
    <span v-text="text"></span>
  </div>
</template>

<script>
export default {
  name: 'Label',

  props: {
    color: {
      type: String,
      default: '#121212',
    },
    text: {
      type: String,
      default: 'default',
    },
  },
}
</script>

<style scoped>
.color-square {
  display: inline-block;
  width: 24px;
  height: 24px;
}

.label {
  margin: 0.5rem 0rem;
}
</style>
