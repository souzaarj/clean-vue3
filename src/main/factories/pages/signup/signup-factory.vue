<template>
  <Signup
    :add-account="addAccount"
    :validation="signupValidation"
    :save-access-token="localSaveAccessToken"
  />
</template>
<script>
  import { defineComponent } from 'vue'
  import { makeRemoteAddAccount } from '@/main/factories/usecases/remote-add-account'
  import { makeSignupValidation } from '@/main/factories/pages/signup/signup-validation-factory'
  import Signup from '@/presentation/pages/signup.vue'
  import { makeLocalSaveAccessToken } from '@/main/factories/usecases'

  export default defineComponent({
    name: 'MakeSignup',
    components: {
      Signup,
    },
    setup() {
      const addAccount = makeRemoteAddAccount()
      const signupValidation = makeSignupValidation()
      const localSaveAccessToken = makeLocalSaveAccessToken()
      return { addAccount, signupValidation, localSaveAccessToken }
    },
  })
</script>
