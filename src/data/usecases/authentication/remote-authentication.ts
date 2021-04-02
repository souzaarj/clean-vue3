import { AuthenticationParams } from '@/domain/usecases/authentication'
import { HttpPostClient } from '@/data/protocols/http-post-client'

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpClientPost: HttpPostClient
  ) {}
  async auth(params: AuthenticationParams): Promise<void> {
    await this.httpClientPost.post({ url: this.url, body: params })
  }
}
