import { HttpStatusCode } from './../../protocols/http-response'
import { HttpResponse } from '@/data/protocols/http-response'
import { InvalidCredentialError } from '@/domain/errors/invalid-credential-error'
import { AuthenticationParams } from '@/domain/usecases/authentication'
import { HttpPostClient } from '@/data/protocols/http-post-client'

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpClientPost: HttpPostClient
  ) {}
  async auth(params: AuthenticationParams): Promise<void> {
    const httpResponse = await this.httpClientPost.post({
      url: this.url,
      body: params,
    })

    if (httpResponse.statusCode === HttpStatusCode.unauthorized) {
      throw new InvalidCredentialError()
    }
  }
}
