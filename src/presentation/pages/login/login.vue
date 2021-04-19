<template>
  <div class="login">
    <Header title="4Dev - Enquetes para Programadores" />
    <form class="login__form" @submit.prevent="onSubmit">
      <h2 class="login__subTitle">Login</h2>
      <Input
        v-model="email"
        name="email"
        type="email"
        place-holder="Digite seu e-mail"
        title="Campo obrigatório"
      />
      <Input
        v-model="password"
        name="password"
        type="password"
        place-holder="Digite sua senha"
        title="Campo obrigatório"
      />
      <button class="btn login__button" :disabled="buttonIsDisabled">
        Entrar
      </button>
      <span class="login__link">Criar conta</span>
      <FormStatus :loading="isLoading" :error="errorMessage" />
    </form>
    <Footer />
  </div>
</template>

<script lang="ts">
  import { ref, defineComponent, computed, provide, PropType, watch } from 'vue'
  import { Validation } from '@/presentation/protocols/validation'
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
    props: {
      validation: {
        type: Object as PropType<Validation>,
        required: true,
      },
    },
    setup(props) {
      const isLoading = ref(false)
      const errorMessage = ref('')
      const email = ref('')
      const password = ref('')
      const buttonIsDisabled = computed(() => true)

      provide('stateLogin', { isLoading, errorMessage })

      watch(email, (newValue) => props.validation.validate({ email: newValue }))

      watch(password, (newValue) =>
        props.validation.validate({ password: newValue })
      )

      return {
        isLoading,
        errorMessage,
        buttonIsDisabled,
        email,
        password,
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
