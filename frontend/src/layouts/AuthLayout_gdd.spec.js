import { mount, RouterLinkStub } from '@vue/test-utils'
import AuthLayoutGdd from './AuthLayout_gdd'

const localVue = global.localVue

describe('AuthLayoutGdd', () => {
  let wrapper

  const mocks = {
    $i18n: {
      locale: 'en',
    },
    $t: jest.fn((t) => t),
    $store: {
      state: {},
      commit: jest.fn(),
    },
    $route: {
      meta: {
        requiresAuth: false,
      },
    },
  }

  const stubs = {
    RouterLink: RouterLinkStub,
    RouterView: true,
  }

  const Wrapper = () => {
    return mount(AuthLayoutGdd, { localVue, mocks, stubs })
  }

  describe('mount', () => {
    beforeEach(() => {
      wrapper = Wrapper()
    })
    describe('Mobile Version Start', () => {
      beforeEach(() => {
        wrapper.vm.mobileStart = true
      })

      it('has Component AuthMobileStart', () => {
        expect(wrapper.findComponent({ name: 'AuthMobileStart' }).exists()).toBe(true)
      })

      it('has Component AuthNavbar', () => {
        expect(wrapper.findComponent({ name: 'AuthNavbar' }).exists()).toBe(false)
      })

      it('has Component AuthCarousel', () => {
        expect(wrapper.findComponent({ name: 'AuthCarousel' }).exists()).toBe(false)
      })

      it('has Component AuthFooter', () => {
        expect(wrapper.findComponent({ name: 'AuthFooter' }).exists()).toBe(false)
      })
    })

    describe('Desktop Version Start', () => {
      beforeEach(() => {
        wrapper.vm.mobileStart = false
      })

      it('has Component AuthNavbar', () => {
        expect(wrapper.findComponent({ name: 'AuthNavbar' }).exists()).toBe(true)
      })

      it('has Component AuthCarousel', () => {
        expect(wrapper.findComponent({ name: 'AuthCarousel' }).exists()).toBe(true)
      })

      it('has Component AuthFooter', () => {
        expect(wrapper.findComponent({ name: 'AuthFooter' }).exists()).toBe(true)
      })

      it('has no sidebar', () => {
        expect(wrapper.find('nav#sidenav-main').exists()).not.toBeTruthy()
      })

      it('has LanguageSwitch', () => {
        expect(wrapper.findComponent({ name: 'LanguageSwitch' }).exists()).toBeTruthy()
      })

      test('test size in setTextSize ', () => {
        wrapper.vm.setTextSize('85')
        expect(wrapper.vm.$refs.pageFontSize.style.fontSize).toBe('85rem')
      })
    })
  })
})
