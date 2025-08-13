import { z } from 'zod'

import type { Response, Request } from 'express'

import { db } from '@/db/index'
import { dietaryLogs } from '@/db/schema/user'
import { validateSessionToken } from '@/utils/auth/utils'
export const get = async (req: Request, res: Response) => {
  try {
    const { date } = req.params
    const getDietaryLogsSchema = z.coerce.date()
    const inputData: z.infer<typeof getDietaryLogsSchema> =
      getDietaryLogsSchema.parse(date)
    const requestToken = req.token
    const session = await validateSessionToken(requestToken)
    if (session === null) {
      return res.status(401).json({
        error: true,
        message: 'Unauthorized'
      })
    }
    const dietaryLog = await db.query.dietaryLogs.findFirst({
      orderBy: (dietaryLogs, { desc }) => [desc(dietaryLogs.createdAt)],
      where: (dietaryLogs, { eq, and }) =>
        and(
          eq(dietaryLogs.date, inputData),
          eq(dietaryLogs.userId, session.user.id)
        )
    })

    if (!dietaryLog) {
      const userPresets = await db.query.dietarySettings.findFirst({
        where: (dietarySetting, { eq, and }) =>
          eq(dietarySetting.userId, session.user.id)
      })
      const defaultDietaryLog = {
        ...userPresets,
        date: inputData,
        id: undefined,
        userId: session.user.id
      }
      const updatedDietaryLog = await db
        .insert(dietaryLogs)
        .values(defaultDietaryLog)
        .onConflictDoUpdate({
          target: [dietaryLogs.userId, dietaryLogs.date],
          set: defaultDietaryLog
        })
        .returning()
      return res.json({
        error: false,
        data: updatedDietaryLog
      })
    }
    return res.json({
      error: false,
      data: dietaryLog
    })
  } catch (e) {
    return res.status(500).json({
      error: true,
      message: e
    })
  }
}
const typeGenerator = db.query.dietaryLogs.findFirst()
export type GetDietaryLogReturn = Awaited<typeof typeGenerator>
