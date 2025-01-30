/* Auth */
export type Session = {
  sessionToken: string
  userId: string
  expires: Date
}

export type User = {
  email: string
  firstName: string
  lastName: string | null
  sex: 'M' | 'F'
  dateOfBirth: Date | null
  id: string
  emailVerified: Date | null
  image: string | null
  passwordHash: string | null
}
