import { HttpPostClient } from '@/data/protocols'
import { AddAccountParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'
import { AddAccount } from '@/domain/usecases'

export class RemoteAddAccount implements AddAccount {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      AddAccountParams,
      AccountModel
    >
  ) {}
  async add(addAccountParams: AddAccountParams): Promise<AccountModel> {
    await this.httpPostClient.post({ url: this.url, body: addAccountParams })
    return Promise.resolve({ accessToken: '' })
  }
}
