import { mount, RouterLinkStub } from '@vue/test-utils'
import App from './App'
import VueRouter from 'vue-router'

const localVue = global.localVue
localVue.use(VueRouter)
const router = new VueRouter()
const mockStoreCommit = jest.fn()

const stubs = {
  RouterLink: RouterLinkStub,
  RouterView: true,
}

describe('App', () => {
  const mocks = {
    $i18n: {
      locale: 'en',
    },
    $t: jest.fn((t) => t),
    $store: {
      commit: mockStoreCommit,
      state: {
        token: null,
      },
    },
  }

  let wrapper

  const Wrapper = () => {
    return mount(App, { localVue, mocks, stubs, router })
  }

  describe('mount', () => {
    beforeEach(() => {
      wrapper = Wrapper()
    })

    it('renders the App', () => {
      expect(wrapper.find('#app').exists()).toBe(true)
    })

    it('has a component AuthLayoutGDD', () => {
      expect(wrapper.findComponent({ name: 'AuthTemplate' }).exists()).toBe(true)
    })
  })
})
