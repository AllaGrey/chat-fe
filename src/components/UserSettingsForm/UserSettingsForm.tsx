import { FC, useEffect } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { randomPhoto } from '../../mocks'
import { updateUserFormSchema } from '../../services'
import { useAuthStore } from '../../store'
import { SettingsFormInputs } from '../../types'
import { getRandomAvatar } from '../../utils'
import { Button } from '../Button'
import { UserAvatar } from '../UserAvatar'
import styles from './UserSettingsForm.module.css'

export const UserSettingsForm: FC = () => {
  const { currentUser, updateUser } = useAuthStore()
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<SettingsFormInputs>({
    defaultValues: {
      name: currentUser?.name,
      surname: currentUser?.surname,
      avatar: currentUser?.avatar || randomPhoto,
    },
    resolver: yupResolver(updateUserFormSchema),
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser) {
      setValue('name', currentUser.name)
      setValue('surname', currentUser.surname)
      setValue('avatar', currentUser.avatar || randomPhoto)
    }
  }, [currentUser, setValue])

  const avatar = watch('avatar')

  const handleChangeAvatar = () => {
    const newAvatar = getRandomAvatar()
    setValue('avatar', newAvatar, { shouldDirty: true })
  }

  const handleUpdateUserSubmit = async (data: SettingsFormInputs) => {
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
      <label
        className={styles.avatar}
        title="Click to change avatar"
        onClick={handleChangeAvatar}
      >
        <UserAvatar photo={avatar || randomPhoto} />
        {errors?.avatar && (
          <span className={styles.errorMessage}>{errors.avatar.message}</span>
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
