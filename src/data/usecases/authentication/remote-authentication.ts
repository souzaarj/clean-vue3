import { AccountModel } from '@/domain/models'
import { InvalidCredentialError, UnexpectedError } from '@/domain/errors'
import { HttpStatusCode, HttpPostClient } from '@/data/protocols'
import { Authentication, AuthenticationParams } from '@/domain/usecases'

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpClientPost: HttpPostClient<
      AuthenticationParams,
      AccountModel
    >
  ) {}

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await this.httpClientPost.post({
      url: this.url,
      body: params,
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body || { accessToken: '' }
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialError()
      default:
        throw new UnexpectedError()
    }
  }
}
