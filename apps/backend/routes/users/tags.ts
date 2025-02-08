import { eq } from 'drizzle-orm'
import { z } from 'zod'

import type { Request, Response } from 'express'

import { db } from '@/db/index'
import { userTags } from '@/db/schema/programs'
import { validateSessionToken } from '@/utils/auth/utils'
import { validateData } from '@/utils/zod-validate'

export const get = async (req: Request, res: Response) => {
  try {
    const requestToken = req.token
    if (!requestToken) {
      return res.status(401).json({ error: true, message: 'Unauthorized' })
    }
    const session = await validateSessionToken(requestToken)
    if (!session.session) {
      return res.status(401).json({ error: true, message: 'Unauthorized' })
    }

    const userTagsData = await db
      .select()
      .from(userTags)
      .where(eq(userTags.userId, session.user.id))
    return res.json({ error: false, data: userTagsData })
  } catch (e) {
    return res.status(500).json({ error: true, message: e.message })
  }
}
const userTagsData = db.select().from(userTags)
export type GetUserTagsReturn = Awaited<typeof userTagsData>

export const put = async (req: Request, res: Response) => {
  try {
    const updateUserTagsSchema = z
      .object({ ids: z.array(z.number().int()) })
      .strict()

    const partialData: z.infer<typeof updateUserTagsSchema> =
      updateUserTagsSchema.parse(req.body)
    const valid = validateData(updateUserTagsSchema, partialData)
    if (valid !== 'OK') {
      return res.status(400).json({ error: true, message: valid })
    }

    const requestToken = req.token
    if (!requestToken) {
      return res.status(401).json({ error: true, message: 'Unauthorized' })
    }
    const session = await validateSessionToken(requestToken)
    if (!session.session) {
      return res.status(401).json({ error: true, message: 'Unauthorized' })
    }

    await db.delete(userTags).where(eq(userTags.userId, session.user.id))
    if (partialData.ids.length === 0) {
      return res.json({ error: false, data: [] })
    }
    const updatedUserTags = await db
      .insert(userTags)
      .values(
        partialData.ids.map((id) => ({
          userId: session.user.id,
          tagId: id
        }))
      )
      .returning()
    return res.json({ error: false, data: updatedUserTags })
  } catch (e) {
    return res.status(500).json({ error: true, message: e.message })
  }
}
const updatedUserTags = db
  .insert(userTags)
  .values([{ userId: '1', tagId: 1 }])
  .returning()
export type PutUserTagsReturn = Awaited<typeof updatedUserTags>
