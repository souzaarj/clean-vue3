import { AccountModel } from '@/domain/models/account-model'
import { AuthenticationParams } from '@/domain/usecases/authentication'
import faker from 'faker'

export const mockAuthentication = (): AuthenticationParams => ({
  password: faker.internet.password(),
  email: faker.internet.email(),
})

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.random.alphaNumeric(),
})
