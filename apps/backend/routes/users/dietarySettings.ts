import { z } from 'zod'

import type { Request, Response } from 'express'

import { db } from '@/db/index'
import { dietarySettings } from '@/db/schema/user'
import { validateSessionToken } from '@/utils/auth/utils'

export const patch = async (req: Request, res: Response) => {
  try {
    const updateDietarySettingsSchema = z
      .object({
        waterGoal: z.number().optional(),
        calorieGoal: z.number().optional(),
        proteinGoal: z.number().optional(),
        fatGoal: z.number().optional(),
        carbsGoal: z.number().optional(),
        updatedAt: z.coerce.date().optional()
      })
      .strict()
    type UpdateUserData = z.infer<typeof updateDietarySettingsSchema>
    const partialData: UpdateUserData = updateDietarySettingsSchema.parse(
      req.body
    )

    const requestToken = req.token
    if (!requestToken) {
      return res.status(401).json({ error: true, message: 'Unauthorized' })
    }
    const session = await validateSessionToken(requestToken)
    if (!session.session) {
      return res.status(401).json({ error: true, message: 'Unauthorized' })
    }

    partialData.userId = session.user.id
    partialData.updatedAt = new Date()
    const updatedDietarySettings = await db
      .insert(dietarySettings)
      .values(partialData)
      .onConflictDoUpdate({
        target: dietarySettings.userId,
        set: partialData
      })
      .returning()
    if (updatedDietarySettings.length < 1) {
      return res.status(404).json({ error: true, message: 'User not found' })
    }

    return res.json({ error: false, data: updatedDietarySettings })
  } catch (e) {
    return res.status(500).json({ error: true, message: e.message })
  }
}
const typeGenerator = db
  .insert(dietarySettings)
  .values({ userId: 'hjh' })
  .returning()
export type PatchDietarySettingsReturn = Awaited<typeof typeGenerator>
