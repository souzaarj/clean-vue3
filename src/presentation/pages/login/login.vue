<template>
  <div class="login">
    <header class="login__header">
      <Logo class="login__image" />
      <h1 class="login__title">4Dev - Enquetes para Programadores</h1>
    </header>
    <form class="login__form" action="">
      <h2 class="login__subTitle">Login</h2>
      <div class="login__wrap">
        <input
          type="email"
          class="input login__input"
          placeholder="Digite seu e-mail"
        />
        <span class="login__status">🔴</span>
      </div>
      <div class="login__wrap">
        <input
          type="email"
          class="input login__input"
          placeholder="Digite sua senha"
        />
        <span class="login__status">🔴</span>
      </div>
      <button class="btn login__button" type="button">Entrar</button>
      <span class="login__link">Criar conta</span>
      <div class="login__error-wrap">
        <Spinner class="login__spinner" />
        <span class="login__error">Erro</span>
      </div>
    </form>
    <footer class="login__footer"></footer>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import Spinner from '@/presentation/components/spinner.vue'
  import Logo from '@/presentation/components/logo.vue'

  export default defineComponent({
    name: 'Login',
    components: {
      Spinner,
      Logo,
    },
  })
</script>

<style lang="scss">
  .login {
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: space-between;

    &__header {
      display: flex;
      flex-direction: column;
      border-top: 40px solid $primaryDark;
      background-color: $primary;
      align-items: center;
    }

    &__image {
      margin-top: 40px;
    }

    &__title {
      color: $white;
      margin: 16px;
    }

    &__form {
      display: flex;
      flex-direction: column;
      width: 400px;
      align-self: center;
      background-color: $white;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 1px 3px -1px $black;
    }

    &__subTitle {
      color: $primaryDark;
      text-align: center;
      font-size: 20px;
      text-transform: uppercase;
    }

    &__wrap {
      display: flex;
      align-items: center;
      margin-top: 16px;
      position: relative;
    }

    &__input {
      flex-grow: 1;

      &:focus {
        outline-color: $primaryLight;
      }
    }

    &__status {
      position: absolute;
      right: 8px;
      font-size: 12px;
      cursor: help;
    }

    &__button {
      margin-top: 32px;
    }

    &__link {
      text-align: center;
      color: $primary;
      text-transform: lowercase;
      margin-top: 16px;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }

    &__error-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &__spinner {
      margin-top: 30px;
    }

    &__error {
      margin-top: 30px;
      color: $primaryLight;
    }

    &__footer {
      background-color: $primary;
      height: 48px;
    }
  }
</style>
