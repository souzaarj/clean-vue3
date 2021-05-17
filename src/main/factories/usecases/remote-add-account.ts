import { makeAxiosHttpClient } from '@/main/factories/http'
import { RemoteAddAccount } from '@/data/usecases/remote-add-account'
import { AddAccount } from '@/domain/usecases'
import { makeApiUrl } from '../http/api-url-factory'

export const makeRemoteAddAccount = (): AddAccount =>
  new RemoteAddAccount(makeApiUrl('/signup'), makeAxiosHttpClient())
