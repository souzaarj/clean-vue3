import { HttpPostParams } from './../../../src/data/protocols/http-post-client'
import { HttpPostClient } from '@/data/protocols/http-post-client'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  async post(params: HttpPostParams): Promise<void> {
    this.url = params.url
    return null
  }
}
