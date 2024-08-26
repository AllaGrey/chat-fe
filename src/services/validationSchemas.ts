import * as yup from 'yup'

import { REGEXP, VALIDATION_MESSAGES } from '../constants'

export const loginFormSchema = yup.object({
  email: yup
    .string()
    .required(VALIDATION_MESSAGES.required)
    .test('email', value => {
      if (!value.includes('@'))
        throw new yup.ValidationError(
          VALIDATION_MESSAGES.mismatchSymbol,
          value,
          'email'
        )
      return true
    })
    .matches(REGEXP.email, VALIDATION_MESSAGES.mismatchEmail),
  password: yup
    .string()
    .required(VALIDATION_MESSAGES.required)
    .min(8, VALIDATION_MESSAGES.mismatchPassword)
    .max(32, VALIDATION_MESSAGES.mismatchPassword)
    .matches(REGEXP.password, VALIDATION_MESSAGES.mismatchPassword),
})

export const registerFormSchema = yup.object({
  name: yup.string().required(VALIDATION_MESSAGES.required).min(3).max(30),
  surname: yup.string().required(VALIDATION_MESSAGES.required).min(3).max(30),
  email: yup
    .string()
    .required(VALIDATION_MESSAGES.required)
    .test('email', value => {
      if (!value.includes('@'))
        throw new yup.ValidationError(
          VALIDATION_MESSAGES.mismatchSymbol,
          value,
          'email'
        )
      return true
    })
    .matches(REGEXP.email, VALIDATION_MESSAGES.mismatchEmail),
  password: yup
    .string()
    .required(VALIDATION_MESSAGES.required)
    .min(8, VALIDATION_MESSAGES.mismatchPassword)
    .max(32, VALIDATION_MESSAGES.mismatchPassword)
    .matches(REGEXP.password, VALIDATION_MESSAGES.mismatchPassword),
  confirmPassword: yup
    .string()
    .required(VALIDATION_MESSAGES.required)
    .min(8, VALIDATION_MESSAGES.mismatchPassword)
    .max(32, VALIDATION_MESSAGES.mismatchPassword)
    .matches(REGEXP.password, VALIDATION_MESSAGES.mismatchPassword)
    .oneOf([yup.ref('password')], VALIDATION_MESSAGES.passwordsMustMatch),
})

export const updateUserFormSchema = yup.object({
  name: yup.string().required(VALIDATION_MESSAGES.required).min(3).max(30),
  surname: yup.string().required(VALIDATION_MESSAGES.required).min(3).max(30),
})
