import type { Response, Request } from 'express'

import { db } from '@/db/index'
import { validateSessionToken } from '@/utils/auth/utils'
export const get = async (req: Request, res: Response) => {
  try {
    const searchQuery = req.query.search as string | undefined
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 20
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
      orderBy: (food, { desc }) => [desc(food.createdAt)],
      where: (food, { ilike }) =>
        searchQuery ? ilike(food.name, `%${searchQuery}%`) : undefined,
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
      limit,
      offset: (page - 1) * limit
    })

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
const getFoods = db.query.food.findMany({
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
export type GetFoods = Awaited<typeof getFoods>
