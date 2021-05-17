<template>
  <Login
    :validation="loginValidation"
    :authentication="remoteAuthentication"
    :save-access-token="localSaveAccessToken"
  />
</template>

<script>
  import { defineComponent } from 'vue'
  import { Login } from '@/presentation/pages'
  import { makeLoginValidation } from '@/main/factories/pages/login/login-validation-factory'
  import {
    makeRemoteAuthentication,
    makeLocalSaveAccessToken,
  } from '@/main/factories/usecases'

  export default defineComponent({
    name: 'MakeLogin',
    components: {
      Login: Login,
    },
    setup() {
      const remoteAuthentication = makeRemoteAuthentication('/login')
      const loginValidation = makeLoginValidation()
      const localSaveAccessToken = makeLocalSaveAccessToken()
      return {
        remoteAuthentication,
        loginValidation,
        localSaveAccessToken,
      }
    },
  })
</script>
