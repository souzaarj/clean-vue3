<template>
  <Helloworld msg="topeeee" />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import Helloworld from '@/main/components/helloworld.vue'

  export default defineComponent({
    name: 'App',
    components: {
      Helloworld
    }
  })
</script>

<style lang="scss" scoped>
  h1 {
    color: red;
  }
</style>
