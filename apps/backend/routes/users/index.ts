import { z } from 'zod'

import { recipe } from '../recipes/track'

import type { Request, Response } from 'express'

import { db } from '@/db/index'
import { programRecipes, Meal } from '@/db/schema/programs'
import { validateSessionToken } from '@/utils/auth/utils'
import { validateData } from '@/utils/zod-validate'

export const patch = async (req: Request, res: Response) => {
  try {
    const updateUserSchema = z.object({
      username: z.string().optional(),
      email: z.string().email().optional(),
      age: z.number().optional()
    })

    const partialData = req.body
    const valid = validateData(updateUserSchema, partialData)
    if (valid !== 'OK') {
      return res.status(400).json({
        error: true,
        message: valid
      })
    }

    const requestToken = req.token
    if (!requestToken) {
      return res.status(401).json({
        error: true,
        message: 'Unauthorized'
      })
    }
    const session = await validateSessionToken(requestToken)
    if (!session.session) {
      return res.status(401).json({
        error: true,
        message: 'Unauthorized'
      })
    }

    // Example: update user data in database
    const updatedUser = await db
      .update('users')
      .set(partialData)
      .where({ id: session.session.userId })
      .returning()

    if (!updatedUser.length) {
      return res.status(404).json({
        error: true,
        message: 'User not found'
      })
    }

    return res.json({
      error: false,
      data: updatedUser
    })
  } catch (e) {
    return res.status(500).json({
      error: true,
      message: e
    })
  }
}
export type TrackRecipeReturn = Awaited<typeof recipe>
export const trackRecipeSchema = z.object({
  recipeId: z.number().min(0),
  programId: z.number().min(0),
  dayIndex: z.number().min(0).max(100),
  mealName: z.enum(['breakfast', 'lunch', 'dinner', 'snack', 'functional_food'])
})

type trackRecipe = {
  recipeId: number
  programId: number
  dayIndex: number
  mealName: Meal
}
