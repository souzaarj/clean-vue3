import { HttpPostClient } from '@/data/protocols/http-post-client'
import { RemoteAuthentication } from '@/data/usecase/authentication/remote-authentication'

describe('RemoteAuthentication', () => {
  test('should call HttpClient with correct URL', async () => {
    class HttpPostClientSpy implements HttpPostClient {
      url?: string
      async post(url: string): Promise<void> {
        this.url = url
        return null
      }
    }

    const url = 'any_url'
    const httpPostClientSpy = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, httpPostClientSpy)
    await sut.auth()
    expect(httpPostClientSpy.url).toBe(url)
  })
})
