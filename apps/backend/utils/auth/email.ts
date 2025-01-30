import { eq } from 'drizzle-orm'

import { db } from '@/db/index'
import { users } from '@/db/schema/user'

export async function checkEmailAvailability(email: string): Promise<boolean> {
  const row = await db.select().from(users).where(eq(users.email, email))
  if (row.length >= 1) {
    return false
  }
  return true
}
