<template>
  <div data-test="status-wrap" class="status-wrap">
    <Spinner v-if="loading" class="status-wrap__spinner" />
    <span v-if="mainError" data-test="main-error" class="status-wrap__error">{{
      mainError
    }}</span>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Spinner } from '@/presentation/components'

  export default defineComponent({
    name: 'FormStatus',
    components: {
      Spinner,
    },
    props: {
      loading: {
        type: Boolean,
        default: false,
      },
      mainError: {
        type: String,
        default: '',
      },
    },
  })
</script>

<style lang="scss">
  .status-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__spinner {
      margin-top: 30px;
    }

    &__error {
      margin-top: 30px;
      color: $primaryLight;
    }
  }
</style>
