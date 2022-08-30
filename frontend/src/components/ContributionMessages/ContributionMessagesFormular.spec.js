import { mount } from '@vue/test-utils'
import ContributionMessagesFormular from './ContributionMessagesFormular.vue'
import { toastErrorSpy, toastSuccessSpy } from '../../../test/testSetup'

const localVue = global.localVue

const apolloMutateMock = jest.fn().mockResolvedValue()

describe('ContributionMessagesFormular', () => {
  let wrapper

  const propsData = {
    contributionId: 42,
  }

  const mocks = {
    $t: jest.fn((t) => t),
    $apollo: {
      mutate: apolloMutateMock,
    },
    $i18n: {
      locale: 'en',
    },
  }

  const Wrapper = () => {
    return mount(ContributionMessagesFormular, {
      localVue,
      mocks,
      propsData,
    })
  }

  describe('mount', () => {
    beforeEach(() => {
      wrapper = Wrapper()
    })

    it('has a DIV .contribution-messages-formular', () => {
      expect(wrapper.find('div.contribution-messages-formular').exists()).toBe(true)
    })

    describe('call onReset', () => {
      it('form has the set data', () => {
        beforeEach(() => {
          wrapper.setData({
            form: {
              text: 'text form message',
            },
          })
          wrapper.vm.onReset()
        })
        expect(wrapper.vm.form).toEqual({
          text: '',
        })
      })
    })

    describe('call onSubmit', () => {
      it('response with the contribution message', () => {
        wrapper.vm.onSubmit()
      })
    })

    describe('send createContributionLink with error', () => {
      beforeEach(() => {
        apolloMutateMock.mockRejectedValue({ message: 'OUCH!' })
        wrapper = Wrapper()
        wrapper.vm.onSubmit()
      })

      it('toasts an error message', () => {
        expect(toastErrorSpy).toBeCalledWith('OUCH!')
      })
    })

    describe('send createContributionLink with success', () => {
      beforeEach(() => {
        wrapper.setData({
          form: {
            text: 'text form message',
          },
        })
        wrapper = Wrapper()
        wrapper.vm.onSubmit()
      })

      it('toasts an success message', () => {
        expect(toastSuccessSpy).toBeCalledWith(undefined)
      })
    })
  })
})
