import { UnexpectedError } from './../../domain/errors/unexpected-error'
import { EmailInUseError } from './../../domain/errors/email-in-use-error'
import { HttpPostClient, HttpStatusCode } from '@/data/protocols'
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
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return { accessToken: httpResponse.body?.accessToken || '' }
      case HttpStatusCode.forbidden:
        throw new EmailInUseError()
      default:
        throw new UnexpectedError()
    }
  }
}
