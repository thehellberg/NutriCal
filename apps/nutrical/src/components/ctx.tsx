import { useContext, createContext, type PropsWithChildren } from 'react'

import { useStorageState } from '~/hooks/useStorageState'

const AuthContext = createContext<{
  signIn: (token: string) => void
  signOut: () => void
  token?: string | null
  isLoading: boolean
}>({
  signIn: () => null,
  signOut: () => null,
  token: 'Not Loaded',
  isLoading: false
})

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext)
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />')
    }
  }

  return value
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, token], setToken] = useStorageState('token')

  return (
    <AuthContext.Provider
      value={{
        signIn: (token) => {
          // Perform sign-in logic here          
          setToken(token)
        },
        signOut: () => {

          setToken(null)
        },
        token,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
