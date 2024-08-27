import { FC, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'

import { registerFormSchema } from '../../services'
import { useAuthStore } from '../../store'
import { RegisterFormInputs } from '../../types'
import { getRandomAvatar } from '../../utils'
import { Button } from '../Button'
import { Icon } from '../Icon'
import styles from './RegisterForm.module.css'

export const RegisterForm: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(registerFormSchema),
  })

  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false)

  const { signUp } = useAuthStore()

  const navigate = useNavigate()

  const handleRegisterSubmit = async (data: RegisterFormInputs) => {
    const { name, surname, email, password } = data

    const avatar = getRandomAvatar()
    try {
      await signUp({ name, surname, email, password, avatar })
      navigate('/')
    } catch (error) {
      console.error('Login failed:', error)
    }

    navigate('/')
  }

  return (
    <form
      className={styles.formContainer}
      onSubmit={handleSubmit(handleRegisterSubmit)}
    >
      <label className={styles.inputContainer}>
        <input
          className={styles.input}
          placeholder="Name"
          {...register('name')}
        />
        <span>Change avatar</span>
        {errors?.name && (
          <span className={styles.errorMessage}>{errors.name.message}</span>
        )}
      </label>

      <label className={styles.inputContainer}>
        <span>Name</span>
        <input
          className={styles.input}
          placeholder="Name"
          {...register('name')}
        />
        {errors?.name && (
          <span className={styles.errorMessage}>{errors.name.message}</span>
        )}
      </label>

      <label className={styles.inputContainer}>
        <span>Surname</span>
        <input
          className={styles.input}
          placeholder="Surname"
          {...register('surname')}
        />
        {errors?.email && (
          <span className={styles.errorMessage}>{errors.email.message}</span>
        )}
      </label>

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

      <label className={styles.inputContainer}>
        <span>Confirm password</span>
        <input
          className={styles.input}
          placeholder="Password"
          {...register('confirmPassword')}
          type={isPasswordShown ? 'text' : 'password'}
        />
        {errors?.confirmPassword && (
          <span className={styles.errorMessage}>
            {errors.confirmPassword.message}
          </span>
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

      <Button type="submit">Register</Button>

      <NavLink to={'/login'}>If you have an account, just log in</NavLink>
    </form>
  )
}
