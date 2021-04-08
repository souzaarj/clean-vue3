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
    border: 1px solid $primaryLight;
    line-height: 40px;
    border-radius: 4px;
    padding: 0 40px 0 8px;

    &:focus {
      outline-color: $primaryLight;
    }
  }
</style>
