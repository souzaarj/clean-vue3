import { mockAccountModel } from './../../domain/mocks/mock-account'
import { EmailInUseError, UnexpectedError } from '@/domain/errors'
import { HttpStatusCode } from '@/data/protocols/http-response'
import { AccountModel } from '@/domain/models/account-model'
import { AddAccountParams } from '@/domain/usecases/add-account'
import { HttpPostClientSpy } from '@/tests/data/mocks'
import { mockAddAccount } from '@/tests/domain/mocks'
import { RemoteAddAccount } from '@/data/usecases/remote-add-account'
import faker from 'faker'

type SutTypes = {
  sut: RemoteAddAccount
  httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<
    AddAccountParams,
    AccountModel
  >()
  const sut = new RemoteAddAccount(url, httpPostClientSpy)
  return { sut, httpPostClientSpy }
}

describe('RemoteAddAccount', () => {
  test('should call HttpClientPost with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    const addAccountParams = mockAddAccount()

    await sut.add(addAccountParams)
    expect(httpPostClientSpy.url).toBe(url)
  })

  test('should call HttpClientPost with correct Body', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    const addAccountParams = mockAddAccount()

    await sut.add(addAccountParams)
    expect(httpPostClientSpy.body).toBe(addAccountParams)
  })

  test('should throw EmailInUseError  if HttpClientPost return 403', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    }
    const addAccountParams = mockAddAccount()
    const promise = sut.add(addAccountParams)
    await expect(promise).rejects.toThrow(new EmailInUseError())
  })

  test('should throw Unexpected if HttpClientPost return 400', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    }
    const addAccountParams = mockAddAccount()
    const promise = sut.add(addAccountParams)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should throw Unexpected if HttpClientPost return 500', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    }
    const addAccountParams = mockAddAccount()
    const promise = sut.add(addAccountParams)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should return an AccountModel if HttpClientPost returns 200', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    const mockResult = mockAccountModel()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockResult,
    }
    const addAccountParams = mockAddAccount()
    const httpsResponse = await sut.add(addAccountParams)
    expect(httpsResponse).toEqual({
      accessToken: mockResult.accessToken,
    })
  })
})
