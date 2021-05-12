import { AddAccount } from './../../../src/domain/usecases/add-account'
import { AddAccountParams } from '@/domain/usecases'
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

export const mockAddAccount = (): AddAccountParams => ({
  name: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  passwordConfirmation: faker.internet.password(),
})

export class AddAccountSpy implements AddAccount {
  params: AddAccountParams
  result = mockAccountModel()
  callsCount = 0
  async add(params: AddAccountParams): Promise<AccountModel> {
    this.callsCount++
    this.params = params
    return this.result
  }
}
