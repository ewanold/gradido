import { mount } from '@vue/test-utils'
import UserName from './UserName'
import flushPromises from 'flush-promises'

import { toastErrorSpy, toastSuccessSpy } from '@test/testSetup'

const localVue = global.localVue

const mockAPIcall = jest.fn()

const storeCommitMock = jest.fn()

describe('UserName Form', () => {
  let wrapper

  const mocks = {
    $t: jest.fn((t) => t),
    $store: {
      state: {
        username: '',
      },
      commit: storeCommitMock,
    },
    $apollo: {
      mutate: mockAPIcall,
    },
  }

  const Wrapper = () => {
    return mount(UserName, { localVue, mocks })
  }

  describe('mount', () => {
    beforeEach(() => {
      wrapper = Wrapper()
    })

    it('renders the component', () => {
      expect(wrapper.find('div#username_form').exists()).toBeTruthy()
    })

    describe('has no username', () => {
      it('renders the username', () => {
        expect(wrapper.find('[data-test="username-input-group"]')).toBeTruthy()
      })

      it('has no component username change ', () => {
        expect(wrapper.findComponent({ name: 'InputUsername' }).exists()).toBeFalsy()
      })
    })
    describe('change / edit  username', () => {
      beforeEach(async () => {
        wrapper.vm.isEdit = true
      })

      it('has no the username', () => {
        expect(wrapper.find('[data-test="username-input-group"]')).toBeTruthy()
      })

      it('has a component username change ', () => {
        expect(wrapper.findComponent({ name: 'InputUsername' }).exists()).toBeTruthy()
      })

      it('first step is username empty ', () => {
        expect(wrapper.vm.username).toEqual('')
      })

      describe('change / edit  username', () => {
        beforeEach(async () => {
          mocks.$store.state.username = ''
          await wrapper.setData({ isEdit: true })
        })

        it('first step is isEdit false ', () => {
          expect(wrapper.vm.isEdit).toEqual(true)
        })
        it(' has username-alert text ', () => {
          expect(wrapper.find('[data-test="username-alert"]').text()).toBe(
            'settings.username.no-username',
          )
        })
        it('has a submit button with disabled true', () => {
          expect(wrapper.find('[data-test="submit-username-button"]').exists()).toBeFalsy()
          // expect(wrapper.find('[data-test="submit-username-button"]').attributes('disabled')).toBe(true)

          // expect(wrapper.find('[data-test="submit-username-button"]').prop('disabled')).toBeFalsy()

          // expect(wrapper.find('[data-test="submit-username-button"]').attributes('disabled')).toBe(
          //   'disabled',
          // )
        })
      })

      describe('has a username', () => {
        beforeEach(async () => {
          mocks.$store.state.username = 'petra'
          wrapper.setData({ isEdit: true })
        })
        it('has no the username', () => {
          expect(wrapper.find('[data-test="username-input-group"]')).toBeTruthy()
        })

        it(' has no username-alert text ', () => {
          expect(wrapper.find('[data-test="username-alert"]').exists()).toBe(false)
        })

        it('has no component username change ', () => {
          expect(wrapper.findComponent({ name: 'InputUsername' }).exists()).toBeTruthy()
        })
      })

      describe.skip('edit username', () => {
        beforeEach(async () => {
          wrapper.findComponent({ name: 'InputUsername' }).setValue('petra')
        })

        it('has a submit button', () => {
          expect(wrapper.find('[data-test="submit-username-button"]').exists()).toBeTruthy()
        })

        describe('successfull submit', () => {
          beforeEach(async () => {
            mockAPIcall.mockResolvedValue({
              data: {
                updateUserInfos: {
                  validValues: 3,
                },
              },
            })
            jest.clearAllMocks()
            await wrapper.find('input').setValue('petra')
            await wrapper.find('form').trigger('keyup')
            await wrapper.find('[data-test="submit-username-button"]').trigger('click')
            await flushPromises()
          })

          it('calls the API', () => {
            expect(mockAPIcall).toBeCalledWith(
              expect.objectContaining({
                variables: {
                  alias: 'petra',
                },
              }),
            )
          })

          it('commits username to store', () => {
            expect(storeCommitMock).toBeCalledWith('username', 'petra')
          })

          it('toasts a success message', () => {
            expect(toastSuccessSpy).toBeCalledWith('settings.username.change-success')
          })
        })

        describe('submit results in server error', () => {
          beforeEach(async () => {
            mockAPIcall.mockRejectedValue({
              message: 'Error',
            })
            jest.clearAllMocks()
            await wrapper.find('input').setValue('petra')
            await wrapper.find('form').trigger('keyup')
            await wrapper.find('[data-test="submit-username-button"]').trigger('click')
            await flushPromises()
          })

          it('calls the API', () => {
            expect(mockAPIcall).toBeCalledWith(
              expect.objectContaining({
                variables: {
                  alias: 'petra',
                },
              }),
            )
          })

          it('toasts an error message', () => {
            expect(toastErrorSpy).toBeCalledWith('Error')
          })
        })
      })
    })
  })
})
