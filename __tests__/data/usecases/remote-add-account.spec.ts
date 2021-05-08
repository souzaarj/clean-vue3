import { AccountModel } from '@/domain/models/account-model'
import { AddAccountParams } from '@/domain/usecases/add-account'
import { HttpPostClientSpy } from '@/tests/data/mocks'
import { mockAddAccount } from '@/tests/domain/mocks'
import { RemoteAddAccount } from '@/data/usecases/remote-add-account'
import faker from 'faker'

describe('RemoteAddAccount', () => {
  test('should call HttpClientPost with correct values', async () => {
    const url = faker.internet.url()
    const httpPostClientSpy = new HttpPostClientSpy<
      AddAccountParams,
      AccountModel
    >()
    const sut = new RemoteAddAccount(url, httpPostClientSpy)
    const addAccountParams = mockAddAccount()

    await sut.add(addAccountParams)
    expect(httpPostClientSpy.url).toBe(url)
  })
})
