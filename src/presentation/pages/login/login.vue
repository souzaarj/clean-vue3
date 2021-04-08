<template>
  <div class="login">
    <Header title="4Dev - Enquetes para Programadores" />
    <form class="login__form" action="">
      <h2 class="login__subTitle">Login</h2>
      <div class="login__wrap">
        <Input
          class="input login__input"
          type="email"
          placeholder="Digite seu e-mail"
        />
        <span class="login__status">🔴</span>
      </div>
      <div class="login__wrap">
        <Input
          class="input login__input"
          type="password"
          placeholder="Digite sua senha"
        />
        <span class="login__status">🔴</span>
      </div>
      <button class="btn login__button" type="button">Entrar</button>
      <span class="login__link">Criar conta</span>
      <FormStatus />
    </form>
    <Footer />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import {
    LoginHeader as Header,
    Input,
    FormStatus,
    Footer,
  } from '@/presentation/components'

  export default defineComponent({
    name: 'Login',
    components: {
      Header,
      FormStatus,
      Footer,
      Input,
    },
  })
</script>

<style lang="scss">
  .login {
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: space-between;

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
  }
</style>
