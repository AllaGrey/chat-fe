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

export interface ILatestMessage {
  _id: string
  text: string
  createdAt: string
}

export interface IMessage {
  _id: string
  user: string
  text: string
  createdAt: string
}

export interface IChat {
  _id: string
  latestMessage: ILatestMessage
  otherUser: Omit<IUser, 'accessToken' | 'id'> & { _id: string }
}

export interface IChatsState {
  chats: IChat[]
  usersList: Omit<IUser, 'accessToken'>[]
  openedChat: IChat | null
  messageList: IMessage[]
  filter: string
  isLoading: boolean
  getChats: () => void
  openChat: (chat: IChat) => void
  closeChat: () => void
  createChat: (partnerId: string) => void
  deleteChat: (chatId: string) => void
  getMessageList: () => void
  addMessage: (newMessage: IMessage) => void
  getAllUsers: () => void
  filterUsers: (filterValue: string) => void
}
