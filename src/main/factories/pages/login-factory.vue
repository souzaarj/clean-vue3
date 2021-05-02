<template>
  <Login
    :validation="validationComposite"
    :authentication="remoteAuthentication"
  />
</template>

<script>
  import { defineComponent } from 'vue'
  import { Login } from '@/presentation/pages'
  import { RemoteAuthentication } from '@/data/usecases'
  import { AxiosHttpClient } from '@/infra/axios-http-client'
  import { ValidationComposite } from '@/validation/validators'
  import { ValidationBuilder } from '@/validation/validators/builder'

  export default defineComponent({
    name: 'MakeLogin',
    components: {
      Login: Login,
    },
    setup() {
      const url = 'http://localhost:5050/api/login'
      const axiosHttpClient = new AxiosHttpClient()
      const remoteAuthentication = new RemoteAuthentication(
        url,
        axiosHttpClient
      )

      const validationComposite = ValidationComposite.build([
        ...ValidationBuilder.field('email').required().email().build(),
        ...ValidationBuilder.field('password').required().minLength(2).build(),
      ])

      return {
        remoteAuthentication,
        validationComposite,
      }
    },
  })
</script>
