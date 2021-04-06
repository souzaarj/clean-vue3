import { HttpPostParams } from './../../src/data/protocols/http-post-client'
import { AxiosHttpClient } from '@/infra/axios-http-client'
import axios from 'axios'
import faker from 'faker'
import { url } from 'node:inspector'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
})

describe('AxiosHttpClient', () => {
  test('should call axios with correct URL and verb', async () => {
    const request = mockPostRequest()
    const sut = makeSut()
    sut.post({ url: request.url })
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url)
  })
})
