import CONFIG from '@/config'
import { sendEmailTranslated } from './sendEmailTranslated'

export const sendAddedContributionMessageEmail = (data: {
  firstName: string
  lastName: string
  email: string
  language: string
  senderFirstName: string
  senderLastName: string
  contributionMemo: string
}): Promise<Record<string, unknown> | null> => {
  return sendEmailTranslated({
    receiver: {
      to: `${data.firstName} ${data.lastName} <${data.email}>`,
    },
    template: 'addedContributionMessage',
    locals: {
      firstName: data.firstName,
      lastName: data.lastName,
      locale: data.language,
      senderFirstName: data.senderFirstName,
      senderLastName: data.senderLastName,
      contributionMemo: data.contributionMemo,
      overviewURL: CONFIG.EMAIL_LINK_OVERVIEW,
    },
  })
}

export const sendAccountActivationEmail = (data: {
  firstName: string
  lastName: string
  email: string
  language: string
  activationLink: string
  timeDurationObject: Record<string, unknown>
}): Promise<Record<string, unknown> | null> => {
  return sendEmailTranslated({
    receiver: { to: `${data.firstName} ${data.lastName} <${data.email}>` },
    template: 'accountActivation',
    locals: {
      firstName: data.firstName,
      lastName: data.lastName,
      locale: data.language,
      activationLink: data.activationLink,
      timeDurationObject: data.timeDurationObject,
      resendLink: CONFIG.EMAIL_LINK_FORGOTPASSWORD,
    },
  })
}

export const sendAccountMultiRegistrationEmail = (data: {
  firstName: string
  lastName: string
  email: string
  language: string
}): Promise<Record<string, unknown> | null> => {
  return sendEmailTranslated({
    receiver: { to: `${data.firstName} ${data.lastName} <${data.email}>` },
    template: 'accountMultiRegistration',
    locals: {
      firstName: data.firstName,
      lastName: data.lastName,
      locale: data.language,
      resendLink: CONFIG.EMAIL_LINK_FORGOTPASSWORD,
    },
  })
}
