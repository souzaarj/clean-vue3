<template>
  <input class="input" type="{type}" placeholder="{placeHolder}" />
</template>

<script>
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Input',
    props: {
      type: {
        type: String,
        default: 'text',
        required: true,
      },
      placeHolder: {
        type: String,
        default: '',
        required: false,
      },
    },
  })
</script>

<style lang="scss">
  .input {
    &:focus {
      outline-color: $primaryLight;
    }
  }
</style>
