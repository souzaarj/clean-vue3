/* eslint-disable vue/require-default-prop */

<template>
  <h1>{{ msg }}</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Helloworld',
  props: {
    msg: String
  }
})
</script>

<style lang="scss" scoped>
  h1{
    color: red;
  }
</style>
