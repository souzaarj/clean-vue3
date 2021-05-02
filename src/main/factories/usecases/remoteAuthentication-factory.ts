import { Authentication } from '@/domain/usecases/authentication'
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'
import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'

export const makeRemoteAuthentication = (): Authentication =>
  new RemoteAuthentication(
    'http://localhost:5050/api/login',
    makeAxiosHttpClient()
  )
