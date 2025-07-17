import { type Response, type Request } from 'express'
import { z } from 'zod'

import { db } from '@/db/index'
import { validateSessionToken } from '@/utils/auth/utils'
export const post = async (req: Request, res: Response) => {
  try {
    const trackRecipeSchema = z
      .object({
        query: z.string(),
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(20)
      })
      .strict()
    const reqData = trackRecipeSchema.parse(req.body)
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

    const foods = await db.query.food.findMany({
      where: (food, { ilike }) => ilike(food.name, `%${reqData.query}%`),
      orderBy: (food, { desc }) => [desc(food.createdAt)],
      with: {
        recipeFoodComponents: {
          with: {
            component: true
          }
        },
        recipeIngredients: {
          orderBy: (foodIngredients, { asc }) => [
            asc(foodIngredients.ingredientOrder)
          ]
        },
        recipeSteps: {
          orderBy: (foodSteps, { asc }) => [asc(foodSteps.stepOrder)]
        },
        foodTags: {
          with: {
            tag: true
          }
        }
      },
      limit: reqData.limit,
      offset: (reqData.page - 1) * reqData.limit
    })

    if (foods.length === 0) {
      return res.status(404).json({
        error: true,
        message: 'No foods found'
      })
    }
    return res.json({
      error: false,
      data: foods
    })
  } catch (e) {
    return res.status(500).json({
      error: true,
      message: e
    })
  }
}
const postSearchFoods = db.query.food.findMany({
  orderBy: (food, { desc }) => [desc(food.createdAt)],
  with: {
    recipeFoodComponents: {
      with: {
        component: true
      }
    },
    recipeIngredients: {
      orderBy: (foodIngredients, { asc }) => [
        asc(foodIngredients.ingredientOrder)
      ]
    },
    recipeSteps: {
      orderBy: (foodSteps, { asc }) => [asc(foodSteps.stepOrder)]
    },
    foodTags: {
      with: {
        tag: true
      }
    }
  }
})
export type PostSearchFoods = Awaited<typeof postSearchFoods>
