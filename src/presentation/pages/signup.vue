<template>
  <div class="signup">
    <Header title="4Dev - Enquetes para Programadores" />
    <form data-test="form" class="signup__form" @submit.prevent="onSubmit">
      <h2 class="signup__subTitle">Criar Conta</h2>
      <Input
        v-model="name"
        name="name"
        type="text"
        place-holder="Digite seu nome"
        :error="nameError"
      />
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
      <Input
        v-model="passwordConfirmation"
        name="passwordConfirmation"
        type="password"
        place-holder="Confirme sua senha"
        :error="passwordConfirmationError"
      />
      <button class="btn signup__button" :disabled="buttonIsDisabled">
        Enviar
      </button>
      <router-link data-test="login" to="/login" class="signup__link"
        >Login</router-link
      >

      <FormStatus :loading="isLoading" :main-error="mainError" />
    </form>
    <Footer />
  </div>
</template>

<script lang="ts">
  import { ref, defineComponent, computed, PropType, watch } from 'vue'
  import {
    LoginHeader as Header,
    Input,
    FormStatus,
    Footer,
  } from '@/presentation/components'
  import { Validation } from '@/presentation/protocols/validation'
  import { AddAccount } from '@/domain/usecases'

  export default defineComponent({
    name: 'Signup',
    components: {
      Header,
      Input,
      FormStatus,
      Footer,
    },
    props: {
      validation: {
        type: Object as PropType<Validation>,
        required: true,
      },
      addAccount: {
        type: Object as PropType<AddAccount>,
        required: true,
      },
    },

    setup(props) {
      const mainError = ref('')
      const isLoading = ref(false)
      const name = ref('')
      const email = ref('')
      const password = ref('')
      const passwordConfirmation = ref('')
      const nameError = ref('Campo obrigatório')
      const passwordError = ref('Campo obrigatório')
      const emailError = ref('Campo obrigatório')
      const passwordConfirmationError = ref('Campo obrigatório')
      const anyFieldError = computed(
        () =>
          !!nameError.value ||
          !!emailError.value ||
          !!passwordError.value ||
          !!passwordConfirmationError.value
      )
      const buttonIsDisabled = computed(() => anyFieldError.value)

      watch(
        name,
        (newValue) =>
          (nameError.value = props.validation.validate('name', newValue) || '')
      )

      watch(
        email,
        (newValue) =>
          (emailError.value =
            props.validation.validate('email', newValue) || '')
      )

      watch(
        password,
        (newValue) =>
          (passwordError.value =
            props.validation.validate('password', newValue) || '')
      )

      watch(
        passwordConfirmation,
        (newValue) =>
          (passwordConfirmationError.value =
            props.validation.validate('passwordConfirmation', newValue) || '')
      )

      const onSubmit = async () => {
        if (isLoading.value || anyFieldError.value) return

        isLoading.value = true

        await props.addAccount.add({
          name: name.value,
          email: email.value,
          password: password.value,
          passwordConfirmation: passwordConfirmation.value,
        })
      }

      return {
        email,
        password,
        name,
        passwordConfirmation,
        nameError,
        emailError,
        passwordError,
        passwordConfirmationError,
        mainError,
        isLoading,
        buttonIsDisabled,
        onSubmit,
      }
    },
  })
</script>

<style lang="scss">
  .signup {
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
