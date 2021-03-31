<template>
  <h1 data-testid="test-msg">{{ msg }}</h1>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Helloworld',
    props: {
      msg: {
        type: String,
        required: true
      }
    }
  })
</script>

<style lang="scss" scoped>
  h1 {
    color: red;
  }

  .text * {
    top: calc(1em + 2em);
  }
</style>
