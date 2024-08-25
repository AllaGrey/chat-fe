import { FC, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { NavLink } from 'react-router-dom'

import { loginFormSchema } from '../../services'
import { login } from '../../services/operations'
import { LoginFormInputs } from '../../types'
import { Button } from '../Button'
import { Icon } from '../Icon'
import styles from './LoginForm.module.css'

export const LoginForm: FC = () => {
  const {
    control,
    handleSubmit,
    watch,
    register,
    reset,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(loginFormSchema),
  })

  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false)

  const handleLoginSubmit = async (data: LoginFormInputs) => {
    console.log(data, 'loginForm')
    await login(data)
  }

  return (
    <form
      className={styles.formContainer}
      onSubmit={handleSubmit(handleLoginSubmit)}
    >
      <label className={styles.inputContainer}>
        <span>Email</span>
        <input
          className={styles.input}
          placeholder="Email"
          {...register('email')}
        />
        {errors?.email && (
          <span className={styles.errorMessage}>{errors.email.message}</span>
        )}
      </label>

      <label className={styles.inputContainer}>
        <span>Password</span>
        <input
          className={styles.input}
          placeholder="Password"
          {...register('password')}
          type={isPasswordShown ? 'text' : 'password'}
        />
        {errors?.password && (
          <span className={styles.errorMessage}>{errors.password.message}</span>
        )}
        <span
          className={styles.iconWrapper}
          onClick={() => setIsPasswordShown(!isPasswordShown)}
        >
          <Icon
            width={20}
            height={20}
            iconName={isPasswordShown ? 'eye-close' : 'eye-open'}
          />
        </span>
      </label>

      <Button type="submit">Login</Button>

      <NavLink to={'/register'}>Don't have an account?</NavLink>
    </form>
  )
}
