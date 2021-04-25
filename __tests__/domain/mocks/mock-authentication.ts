import { AccountModel } from '@/domain/models/account-model'
import { AuthenticationParams } from '@/domain/usecases/authentication'
import { mockAccountModel } from './mock-account'
import { Authentication } from '@/domain/usecases'

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel()
  params: AuthenticationParams
  callsCount = 0
  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.callsCount++
    this.params = params
    return this.account
  }
}
