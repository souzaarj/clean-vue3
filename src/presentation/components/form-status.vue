<template>
  <div class="status-wrap">
    <Spinner class="status-wrap__spinner" />
    <span class="status-wrap__error">Error</span>
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
