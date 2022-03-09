import { mount } from '@vue/test-utils'
import TransactionConfirmation from './TransactionConfirmation'

const localVue = global.localVue

describe('GddSend confirm', () => {
  let wrapper

  const mocks = {
    $t: jest.fn((t) => t),
    $i18n: {
      locale: jest.fn(() => 'en'),
    },
    $n: jest.fn((n) => String(n)),
  }

  const propsData = {
    balance: 1234,
    email: 'user@example.org',
    amount: 12.34,
    memo: 'Pessimisten stehen im Regen, Optimisten duschen unter den Wolken.',
    loading: false,
    selected: 'send',
  }

  const Wrapper = () => {
    return mount(TransactionConfirmation, { localVue, mocks, propsData })
  }

  describe('mount', () => {
    beforeEach(() => {
      wrapper = Wrapper()
    })

    it('renders the component div.transaction-confirm', () => {
      expect(wrapper.find('div.transaction-confirm').exists()).toBeTruthy()
    })

    describe('has selected "send"', () => {
      beforeEach(async () => {
        await wrapper.setProps({
          selected: 'send',
        })
      })

      it('renders the component div.confirm-box-send', () => {
        expect(wrapper.find('div.confirm-box-send').exists()).toBeTruthy()
      })
    })

    describe('has selected "link"', () => {
      beforeEach(async () => {
        await wrapper.setProps({
          selected: 'link',
        })
      })

      it('renders the component div.confirm-box-link', () => {
        expect(wrapper.findAll('div.confirm-box-link').at(0).exists()).toBeTruthy()
      })
    })
  })
})
