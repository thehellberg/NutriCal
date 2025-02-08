import { z } from 'zod'

import type { Request, Response } from 'express'

import { db } from '@/db/index'
import { dietaryLogs } from '@/db/schema/user'
import { validateSessionToken } from '@/utils/auth/utils'
import { validateData } from '@/utils/zod-validate'

export const patch = async (req: Request, res: Response) => {
  try {
    const updateDietaryLogsSchema = z
      .object({
        date: z.coerce.date(),
        waterInML: z.number().optional(),
        calorieGoal: z.number().optional(),
        calorieConsumed: z.number().optional(),
        calorieBurned: z.number().optional(),
        proteinGoal: z.number().optional(),
        proteinConsumed: z.number().optional(),
        fatGoal: z.number().optional(),
        fatConsumed: z.number().optional(),
        carbsGoal: z.number().optional(),
        carbsConsumed: z.number().optional(),
        weight: z.number().optional(),
        height: z.number().optional()
      })
      .strict()
    const partialData: z.infer<typeof updateDietaryLogsSchema> =
      updateDietaryLogsSchema.parse(req.body)

    const valid = validateData(updateDietaryLogsSchema, partialData)
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
    const transformedData = {
      ...partialData,
      userId: session.user.id
    }
    console.log(transformedData)

    const updatedDietaryLog = await db
      .insert(dietaryLogs)
      .values(transformedData)
      .onConflictDoUpdate({
        target: [dietaryLogs.userId, dietaryLogs.date],
        set: transformedData
      })
      .returning()
    if (updatedDietaryLog.length < 1) {
      return res
        .status(404)
        .json({ error: true, message: 'No rows Inserted or Updated' })
    }

    return res.json({ error: false, data: updatedDietaryLog })
  } catch (e) {
    return res.status(500).json({ error: true, message: e })
  }
}
const updatedDietaryLog = db
  .insert(dietaryLogs)
  .values({ waterInML: 1200, date: new Date(), userId: 'jk' })
  .returning()
export type PatchDietaryLogReturn = Awaited<typeof updatedDietaryLog>
