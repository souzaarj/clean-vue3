import { AccountModel } from '@/domain/models/account-model'
type AddAccountParams = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export interface AddAccount {
  add: (addAccountParams: AddAccountParams) => Promise<AccountModel>
}
