<template>
  <div data-testid="location-display">{{ $route.fullPath }}</div>
</template>

<script>
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'LocationDisplay',
  })
</script>
