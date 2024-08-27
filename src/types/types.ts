import { SignUpInputs } from '.'

export interface IUser {
  id: string
  name: string
  surname: string
  accessToken: string
  avatar: string
}

export interface IUserToUpdate {
  name: string
  surname: string
  avatar?: string
}

export interface IUserState {
  currentUser: IUser | null
  isLoggedIn: boolean
  isLoading: boolean
  signUp: (userData: SignUpInputs) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => void
  updateUser: (data: IUserToUpdate) => Promise<void>
  getUser: () => void
}
