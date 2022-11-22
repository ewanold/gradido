import CONFIG from '@/config'
import { sendAccountActivationEmail, sendAccountMultiRegistrationEmail } from './sendEmailVariants'
import { sendEmailTranslated } from './sendEmailTranslated'

CONFIG.EMAIL = true
CONFIG.EMAIL_SMTP_URL = 'EMAIL_SMTP_URL'
CONFIG.EMAIL_SMTP_PORT = '1234'
CONFIG.EMAIL_USERNAME = 'user'
CONFIG.EMAIL_PASSWORD = 'pwd'

jest.mock('./sendEmailTranslated', () => {
  const originalModule = jest.requireActual('./sendEmailTranslated')
  return {
    __esModule: true,
    sendEmailTranslated: jest.fn((a) => originalModule.sendEmailTranslated(a)),
  }
})

describe('sendEmailVariants', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: any

  describe('sendAccountActivationEmail', () => {
    beforeAll(async () => {
      result = await sendAccountActivationEmail({
        firstName: 'Peter',
        lastName: 'Lustig',
        email: 'peter@lustig.de',
        language: 'en',
        activationLink: 'http://localhost/checkEmail/6627633878930542284',
        timeDurationObject: { hours: 23, minutes: 30 },
      })
    })

    describe('calls "sendEmailTranslated"', () => {
      it('with expected parameters', () => {
        expect(sendEmailTranslated).toBeCalledWith({
          receiver: {
            to: 'Peter Lustig <peter@lustig.de>',
          },
          template: 'accountActivation',
          locals: {
            firstName: 'Peter',
            lastName: 'Lustig',
            locale: 'en',
            activationLink: 'http://localhost/checkEmail/6627633878930542284',
            timeDurationObject: { hours: 23, minutes: 30 },
            resendLink: CONFIG.EMAIL_LINK_FORGOTPASSWORD,
          },
        })
      })

      it('has expected result', () => {
        expect(result).toMatchObject({
          envelope: {
            from: 'info@gradido.net',
            to: ['peter@lustig.de'],
          },
          message: expect.any(String),
          originalMessage: expect.objectContaining({
            to: 'Peter Lustig <peter@lustig.de>',
            from: 'Gradido (nicht antworten) <info@gradido.net>',
            attachments: [],
            subject: 'Gradido: Email Verification',
            html: expect.any(String),
            text: expect.stringContaining('GRADIDO: EMAIL VERIFICATION'),
          }),
        })
        expect(result.originalMessage.html).toContain('<title>Gradido: Email Verification</title>')
        expect(result.originalMessage.html).toContain('>Gradido: Email Verification</h1>')
        expect(result.originalMessage.html).toContain('Hello Peter Lustig')
        expect(result.originalMessage.html).toContain(
          'Your email address has just been registered with Gradido.',
        )
        expect(result.originalMessage.html).toContain(
          'Please click on this link to complete the registration and activate your Gradido account:',
        )
        expect(result.originalMessage.html).toContain(
          '<a href="http://localhost/checkEmail/6627633878930542284">http://localhost/checkEmail/6627633878930542284</a>',
        )
        expect(result.originalMessage.html).toContain(
          'or copy the link above into your browser window.',
        )
        expect(result.originalMessage.html).toContain(
          'The link has a validity of 23 hours and 30 minutes. If the validity of the link has already expired, you can have a new link sent to you here by entering your email address:',
        )
        expect(result.originalMessage.html).toContain(
          `<a href="${CONFIG.EMAIL_LINK_FORGOTPASSWORD}">${CONFIG.EMAIL_LINK_FORGOTPASSWORD}</a>`,
        )
        expect(result.originalMessage.html).toContain('Sincerely yours,<br><span>your Gradido team')
      })
    })
  })

  describe('sendAccountMultiRegistrationEmail', () => {
    beforeAll(async () => {
      result = await sendAccountMultiRegistrationEmail({
        firstName: 'Peter',
        lastName: 'Lustig',
        email: 'peter@lustig.de',
        language: 'en',
      })
    })

    describe('calls "sendEmailTranslated"', () => {
      it('with expected parameters', () => {
        expect(sendEmailTranslated).toBeCalledWith({
          receiver: {
            to: 'Peter Lustig <peter@lustig.de>',
          },
          template: 'accountMultiRegistration',
          locals: {
            firstName: 'Peter',
            lastName: 'Lustig',
            locale: 'en',
            resendLink: CONFIG.EMAIL_LINK_FORGOTPASSWORD,
          },
        })
      })

      it('has expected result', () => {
        expect(result).toMatchObject({
          envelope: {
            from: 'info@gradido.net',
            to: ['peter@lustig.de'],
          },
          message: expect.any(String),
          originalMessage: expect.objectContaining({
            to: 'Peter Lustig <peter@lustig.de>',
            from: 'Gradido (nicht antworten) <info@gradido.net>',
            attachments: [],
            subject: 'Gradido: Try To Register Again With Your Email',
            html: expect.any(String),
            text: expect.stringContaining('GRADIDO: TRY TO REGISTER AGAIN WITH YOUR EMAIL'),
          }),
        })
        expect(result.originalMessage.html).toContain(
          '<title>Gradido: Try To Register Again With Your Email</title>',
        )
        expect(result.originalMessage.html).toContain(
          '>Gradido: Try To Register Again With Your Email</h1>',
        )
        expect(result.originalMessage.html).toContain('Hello Peter Lustig')
        expect(result.originalMessage.html).toContain(
          'Your email address has just been used again to register an account with Gradido.',
        )
        expect(result.originalMessage.html).toContain(
          'However, an account already exists for your email address.',
        )
        expect(result.originalMessage.html).toContain(
          'Please click on the following link if you have forgotten your password:',
        )
        expect(result.originalMessage.html).toContain(
          `<a href="${CONFIG.EMAIL_LINK_FORGOTPASSWORD}">${CONFIG.EMAIL_LINK_FORGOTPASSWORD}</a>`,
        )
        expect(result.originalMessage.html).toContain(
          'or copy the link above into your browser window.',
        )
        expect(result.originalMessage.html).toContain(
          'If you are not the one who tried to register again, please contact our support:',
        )
        expect(result.originalMessage.html).toContain('Sincerely yours,<br><span>your Gradido team')
      })
    })
  })
})
