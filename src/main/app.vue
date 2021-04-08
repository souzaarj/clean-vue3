<template>
  <Login />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import Login from '@/presentation/pages/login/login.vue'

  export default defineComponent({
    name: 'App',
    components: {
      Login,
    },
  })
</script>

<style lang="scss" scoped>
  h1 {
    color: red;
  }
</style>
