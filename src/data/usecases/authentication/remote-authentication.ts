import { AccountModel } from '@/domain/models/account-model'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { HttpStatusCode } from '@/data/protocols/http-response'
import { InvalidCredentialError } from '@/domain/errors/invalid-credential-error'
import { AuthenticationParams } from '@/domain/usecases/authentication'
import { HttpPostClient } from '@/data/protocols/http-post-client'

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpClientPost: HttpPostClient<
      AuthenticationParams,
      AccountModel
    >
  ) {}
  async auth(params: AuthenticationParams): Promise<void> {
    const httpResponse = await this.httpClientPost.post({
      url: this.url,
      body: params,
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        break
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialError()
      default:
        throw new UnexpectedError()
    }
  }
}
