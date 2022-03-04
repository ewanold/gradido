import { mount } from '@vue/test-utils'
import TransactionDecay from './TransactionDecay'

const localVue = global.localVue

const mocks = {
  $i18n: {
    locale: 'en',
  },
  $n: jest.fn((n) => n),
  $t: jest.fn((t) => t),
  $d: jest.fn((d) => d),
}

const propsData = {
  amount: '12.45',
  balance: '31.76099091058521',
  balanceDate: '2022-02-28T13:55:47.000Z',
  decay: {
    decay: '-0.2038314055482643084',
    start: '2022-02-25T07:29:26.000Z',
    end: '2022-02-28T13:55:47.000Z',
    duration: 282381,
    __typename: 'Decay',
  },
  id: 9,
  linkedUser: {
    firstName: 'Bibi',
    lastName: 'Bloxberg',
    __typename: 'User',
  },
  memo: 'sadasd asdasdasdasdadadd da dad aad',
  typeId: 'DECAY',
  decayStartBlock: new Date('2021-05-13T17:46:31.000Z'),
}

describe('TransactionDecay', () => {
  let wrapper

  const Wrapper = () => {
    return mount(TransactionDecay, { localVue, mocks, propsData })
  }
  describe('mount', () => {
    beforeEach(() => {
      wrapper = Wrapper()
    })

    it('renders the component transaction-slot-decay', () => {
      expect(wrapper.find('div.transaction-slot-decay').exists()).toBeTruthy()
    })
  })
})