import { mount } from '@vue/test-utils'
import { GdtEntryType } from '../../../graphql/enums'
import GdtTransactionList from './GdtTransactionList'

const localVue = global.localVue

const apolloMockNull = jest.fn().mockResolvedValue({
  data: {
    listGDTEntries: {
      count: 0,
      gdtEntries: [],
    },
  },
})

const apolloMock = jest.fn().mockResolvedValue({
  data: {
    listGDTEntries: {
      count: 4,
      gdtEntries: [
        {
          amount: 100,
          gdt: 1700,
          factor: 17,
          comment: '',
          date: '2021-05-02T17:20:11+00:00',
          gdtEntryType: GdtEntryType.FORM,
        },
        {
          amount: 1810,
          gdt: 362,
          factor: 0.2,
          comment: 'Dezember 20',
          date: '2020-12-31T12:00:00+00:00',
          gdtEntryType: GdtEntryType.GLOBAL_MODIFICATOR,
        },
        {
          amount: 100,
          gdt: 1700,
          factor: 17,
          comment: '',
          date: '2020-05-07T17:00:00+00:00',
          gdtEntryType: GdtEntryType.FORM,
        },
        {
          amount: 100,
          gdt: 110,
          factor: 22,
          comment: '',
          date: '2020-04-10T13:28:00+00:00',
          gdtEntryType: GdtEntryType.ELOPAGE_PUBLISHER,
        },
      ],
    },
  },
})

const toastErrorMock = jest.fn()
const windowScrollToMock = jest.fn()

window.scrollTo = windowScrollToMock

const state = {
  language: 'en',
}

describe('GdtTransactionList ', () => {
  let wrapper

  const mocks = {
    $store: {
      state,
      commit: jest.fn(),
    },
    $i18n: {
      locale: 'en',
    },
    $t: jest.fn((t) => t),
    $n: jest.fn((n) => n),
    $d: jest.fn((d) => d),
    $toasted: {
      error: toastErrorMock,
    },
    $apollo: {
      query: apolloMockNull,
    },
  }

  const Wrapper = () => {
    return mount(GdtTransactionList, { localVue, mocks })
  }

  describe('mount - When no transactions are loaded', () => {
    beforeEach(() => {
      wrapper = Wrapper()
    })

    it('renders the funding button ', () => {
      expect(wrapper.find('.gdt-funding').exists()).toBe(true)
    })

    it('links to https://gradido.net/en/memberships/ when clicking', async () => {
      const link = 'https://gradido.net/' + state.language + '/memberships/'
      expect(wrapper.find('.gdt-funding').attributes('href')).toBe(link)
    })
  })
})

describe('GdtTransactionList', () => {
  let wrapper

  const mocks = {
    $store: {
      state,
      commit: jest.fn(),
    },
    $i18n: {
      locale: 'en',
    },
    $t: jest.fn((t) => t),
    $n: jest.fn((n) => n),
    $d: jest.fn((d) => d),
    $toasted: {
      error: toastErrorMock,
    },
    $apollo: {
      query: apolloMock,
    },
  }

  const Wrapper = () => {
    return mount(GdtTransactionList, { localVue, mocks })
  }

  describe('mount - When transactions are loaded', () => {
    beforeEach(() => {
      wrapper = Wrapper()
    })

    it('renders the component', () => {
      expect(wrapper.find('div.gdt-transaction-list').exists()).toBeTruthy()
    })

    it('renders the not funding button ', () => {
      expect(wrapper.find('.gdt-funding').exists()).toBe(false)
    })

    describe('server returns valid data', () => {
      it('calls the API', async () => {
        await wrapper.vm.$nextTick()
        expect(apolloMock).toBeCalledWith(
          expect.objectContaining({
            variables: {
              currentPage: 1,
              pageSize: 25,
            },
          }),
        )
      })

      it('scrolls to (0, 0) after API call', () => {
        expect(windowScrollToMock).toBeCalledWith(0, 0)
      })
    })

    describe('server returns error', () => {
      beforeEach(() => {
        jest.resetAllMocks()
        apolloMock.mockRejectedValue({
          message: 'Ouch!',
        })
        wrapper = Wrapper()
      })

      it('toasts an error message', () => {
        expect(toastErrorMock).toBeCalledWith('Ouch!')
      })
    })

    describe('change of currentPage', () => {
      it('calls the API after currentPage changes', async () => {
        jest.clearAllMocks()
        wrapper.setData({ currentPage: 2 })
        await wrapper.vm.$nextTick()
        expect(apolloMock).toBeCalledWith(
          expect.objectContaining({
            variables: {
              currentPage: 2,
              pageSize: 25,
            },
          }),
        )
      })
    })
  })
})
