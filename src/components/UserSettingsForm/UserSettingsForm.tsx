import { FC } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { randomPhoto } from '../../mocks'
import { updateUserFormSchema } from '../../services'
import { useAuthStore } from '../../store'
import { SettingsFormInputs } from '../../types'
import { Button } from '../Button'
import { UserAvatar } from '../UserAvatar'
import styles from './UserSettingsForm.module.css'

export const UserSettingsForm: FC = () => {
  const { currentUser, updateUser } = useAuthStore()
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
  } = useForm<SettingsFormInputs>({
    defaultValues: {
      name: currentUser?.name || '',
      surname: currentUser?.surname || '',
    },
    resolver: yupResolver(updateUserFormSchema),
  })

  const navigate = useNavigate()

  const handleUpdateUserSubmit = async (data: SettingsFormInputs) => {
    console.log(data, 'handleUpdateUserSubmit')

    try {
      await updateUser(data)
      navigate('/')
    } catch (error) {
      console.error('Update failed:', error)
    }
  }

  return (
    <form
      className={styles.formContainer}
      onSubmit={handleSubmit(handleUpdateUserSubmit)}
    >
      <UserAvatar photo={randomPhoto} />
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
        {errors?.surname && (
          <span className={styles.errorMessage}>{errors.surname.message}</span>
        )}
      </label>

      <Button type="submit" title="Save changes" isDisabled={!isDirty}>
        Save
      </Button>
    </form>
  )
}
