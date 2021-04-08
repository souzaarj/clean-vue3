<template>
  <footer class="footer"></footer>
</template>

<script>
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Footer',
  })
</script>

<style lang="scss" scoped>
  .footer {
    background-color: $primary;
    height: 48px;
  }
</style>
