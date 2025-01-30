import { eq } from 'drizzle-orm'

import { hashPassword } from './passwords'

import type { User } from '@/db/schema/user'

import { db } from '@/db/index'
import { users } from '@/db/schema/user'

export function verifyUsernameInput(username: string): boolean {
  return (
    username.length > 3 && username.length < 32 && username.trim() === username
  )
}

export async function createUser(
  firstName: string,
  lastName: string,
  sex: 'M' | 'F',
  dateOfBirth: Date,
  email: string,
  password: string
): Promise<User> {
  const passwordHash = await hashPassword(password)
  const row = await db
    .insert(users)
    .values({
      firstName,
      lastName,
      sex,
      dateOfBirth,
      email,
      passwordHash
    })
    .returning()
  if (row.length < 1) {
    throw new Error('Unexpected error')
  }
  const user: User = {
    id: row[0]!.id,
    firstName,
    lastName,
    sex,
    dateOfBirth,
    email,
    emailVerified: new Date(), //TODO: Email Verification
    passwordHash: null,
    image: null
  }
  return user
}

// export async function updateUserPassword(
//   userId: number,
//   password: string
// ): Promise<void> {
//   const passwordHash = await hashPassword(password);
//   db.execute("UPDATE user SET password_hash = ? WHERE id = ?", [
//     passwordHash,
//     userId,
//   ]);
// }

// export function updateUserEmailAndSetEmailAsVerified(
//   userId: string,
//   email: string
// ): void {
// 	db
// 	.update(users)
// 	.set({
// 		email,
// 		emailVerified: new Date
// 	})
// 	.where(eq(users.id, userId))
// }

// export function setUserAsEmailVerifiedIfEmailMatches(
//   userId: number,
//   email: string
// ): boolean {
//   const result = db.execute(
//     "UPDATE user SET email_verified = 1 WHERE id = ? AND email = ?",
//     [userId, email]
//   );
//   return result.changes > 0;
// }

// export function getUserPasswordHash(userId: number): string {
//   const row = db.queryOne("SELECT password_hash FROM user WHERE id = ?", [
//     userId,
//   ]);
//   if (row === null) {
//     throw new Error("Invalid user ID");
//   }
//   return row.string(0);
// }

export async function getUserFromEmail(email: string): Promise<User | null> {
  const row = await db.select().from(users).where(eq(users.email, email))
  if (row.length < 1) {
    return null
  }
  return row[0]!
}
