<template>
  <div class="login">
    <Header title="4Dev - Enquetes para Programadores" />
    <form data-test="form" class="login__form" @submit.prevent="onSubmit">
      <h2 class="login__subTitle">Login</h2>
      <Input
        v-model="email"
        name="email"
        type="email"
        place-holder="Digite seu e-mail"
        :error="emailError"
      />
      <Input
        v-model="password"
        name="password"
        type="password"
        place-holder="Digite sua senha"
        :error="passwordError"
      />
      <button class="btn login__button" :disabled="buttonIsDisabled">
        Entrar
      </button>
      <router-link data-test="register" to="/signup" class="login__link"
        >Criar conta</router-link
      >

      <FormStatus :loading="isLoading" :main-error="mainError" />
    </form>
    <Footer />
  </div>
</template>

<script lang="ts">
  import { ref, defineComponent, computed, PropType, watch } from 'vue'
  import { Validation } from '@/presentation/protocols/validation'
  import { Authentication } from '@/domain/usecases/authentication'
  import {
    LoginHeader as Header,
    Input,
    FormStatus,
    Footer,
  } from '@/presentation/components'
  import { useRouter } from 'vue-router'
  import { SaveAccessToken } from '@/domain/usecases/save-access-token'

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
      authentication: {
        type: Object as PropType<Authentication>,
        required: true,
      },
      saveAccessToken: {
        type: Object as PropType<SaveAccessToken>,
        required: true,
      },
    },
    setup(props) {
      const mainError = ref('')
      const isLoading = ref(false)
      const email = ref('')
      const password = ref('')
      const emailError = ref('Campo obrigatório')
      const passwordError = ref('Campo obrigatório')

      const buttonIsDisabled = computed(
        () => !!emailError.value || !!passwordError.value
      )
      const route = useRouter()

      watch(
        email,
        (newValue) =>
          (emailError.value =
            props.validation.validate('email', { email: newValue }) || '')
      )

      watch(
        password,
        (newValue) =>
          (passwordError.value =
            props.validation.validate('password', { password: newValue }) || '')
      )

      const onSubmit = async (): Promise<void> => {
        try {
          if (isLoading.value || emailError.value || passwordError.value) return
          isLoading.value = true

          const account = await props.authentication.auth({
            email: email.value,
            password: password.value,
          })
          await props.saveAccessToken.save(account.accessToken)
          route.push('/')
        } catch (error) {
          isLoading.value = false
          mainError.value = error.message
        }
      }

      return {
        isLoading,
        mainError,
        buttonIsDisabled,
        email,
        password,
        emailError,
        passwordError,
        onSubmit,
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
