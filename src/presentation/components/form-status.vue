<template>
  <div data-testid="status-wrap" class="status-wrap">
    <Spinner v-if="isLoading" class="status-wrap__spinner" />
    <span v-if="errorMessage" class="status-wrap__error">Error</span>
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
      isLoading: {
        type: Boolean,
        default: false,
      },
      errorMessage: {
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
