<template>
  <header class="header">
    <Logo class="header__image" />
    <h1 class="header__title">{{ title }}</h1>
  </header>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Logo } from '@/presentation/components'

  export default defineComponent({
    name: 'LoginHeader',
    components: {
      Logo,
    },
    props: {
      title: {
        type: String,
        required: true,
      },
    },
  })
</script>

<style lang="scss">
  .header {
    display: flex;
    flex-direction: column;
    border-top: 40px solid $primaryDark;
    background-color: $primary;
    align-items: center;

    &__image {
      margin-top: 40px;
    }

    &__title {
      color: $white;
      margin: 16px;
    }
  }
</style>
