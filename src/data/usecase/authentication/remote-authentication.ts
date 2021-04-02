import { HttpPostClient } from '@/data/protocols/http-post-client'

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpClientPost: HttpPostClient
  ) {}
  async auth(): Promise<void> {
    await this.httpClientPost.post(this.url)
  }
}
