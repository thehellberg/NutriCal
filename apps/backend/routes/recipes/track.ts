import { z } from 'zod'

import type { Response, Request } from 'express'

import { db } from '@/db/index'
import { Meal, programRecipes } from '@/db/schema/programs'
import { validateSessionToken } from '@/utils/auth/utils'
import { validateData } from '@/utils/zod-validate'
export const post = async (req: Request, res: Response) => {
  try {
    const requestBody: trackRecipe = req.body
    const valid = validateData(trackRecipeSchema, requestBody)
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
    if (session.session === null) {
      return res.status(401).json({
        error: true,
        message: 'Unauthorized'
      })
    }
    const recipes = await db
      .insert(programRecipes)
      .values({
        dayIndex: requestBody.dayIndex,
        mealName: requestBody.mealName,
        programId: requestBody.programId,
        recipeId: requestBody.recipeId
      })
      .returning()

    if (recipes.length === 0) {
      return res.status(404).json({
        error: true,
        message: 'No recipes found'
      })
    }
    return res.json({
      error: false,
      data: recipes
    })
  } catch (e) {
    return res.status(500).json({
      error: true,
      message: e
    })
  }
}
export const recipe = db
  .insert(programRecipes)
  .values({
    recipeId: 1,
    programId: 1,
    dayIndex: 1,
    mealName: Meal.BREAKFAST
  })
  .returning()
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
