<template>
  <Login :validation="loginValidation" :authentication="remoteAuthentication" />
</template>

<script>
  import { defineComponent } from 'vue'
  import { Login } from '@/presentation/pages'
  import { makeLoginValidation } from '@/main/factories/pages/login-validation-factory'
  import { makeRemoteAuthentication } from '@/main/factories/usecases/remoteAuthentication-factory'

  export default defineComponent({
    name: 'MakeLogin',
    components: {
      Login: Login,
    },
    setup() {
      const remoteAuthentication = makeRemoteAuthentication('/login')
      const loginValidation = makeLoginValidation()
      return {
        remoteAuthentication,
        loginValidation,
      }
    },
  })
</script>
