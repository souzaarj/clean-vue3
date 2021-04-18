<template>
  <div class="login">
    <Header title="4Dev - Enquetes para Programadores" />
    <form class="login__form" action="">
      <h2 class="login__subTitle">Login</h2>
      <Input
        type="email"
        place-holder="Digite seu e-mail"
        title="Campo obrigatório"
      />
      <Input
        type="password"
        place-holder="Digite sua senha"
        title="Campo obrigatório"
      />
      <button
        class="btn login__button"
        :disabled="buttonIsDisabled"
        type="button"
      >
        Entrar
      </button>
      <span class="login__link">Criar conta</span>
      <FormStatus :loading="isLoading" :error="errorMessage" />
    </form>
    <Footer />
  </div>
</template>

<script lang="ts">
  import { ref, defineComponent, computed } from 'vue'
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
    setup() {
      const isLoading = ref(false)
      const errorMessage = ref('')
      const buttonIsDisabled = computed(() => {
        return true
      })

      return {
        isLoading,
        errorMessage,
        buttonIsDisabled,
      }
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

    &__button {
      margin-top: 32px;
      outline: none;

      &:disabled {
        background: $disabledBackground;
        color: $disabledColor;

        &:hover {
          opacity: 1;
          cursor: unset;
        }
      }
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
