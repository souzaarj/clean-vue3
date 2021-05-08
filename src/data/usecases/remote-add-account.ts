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
  async add(params: AddAccountParams): Promise<AccountModel> {
    await this.httpPostClient.post({ url: this.url, body: params })
    return { accessToken: '' }
  }
}