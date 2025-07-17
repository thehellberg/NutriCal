import type { Response, Request, NextFunction } from 'express'

import { db } from '@/db/index'
import { validateSessionToken } from '@/utils/auth/utils'
export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    if (!id || isNaN(parseInt(id))) {
      next()
      return res.status(400).json({
        error: true,
        message: 'Invalid request'
      })
    }
    const recipeId = parseInt(id)
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
    const recipe = await db.query.food.findFirst({
      orderBy: (foods, { desc }) => [desc(foods.createdAt)],
      where: (foods, { eq }) => eq(foods.id, recipeId),
      with: {
        recipeFoodComponents: {
          with: {
            component: true
          }
        },
        recipeIngredients: {
          orderBy: (recipeIngredients, { asc }) => [
            asc(recipeIngredients.ingredientOrder)
          ]
        },
        recipeSteps: {
          orderBy: (recipeSteps, { asc }) => [asc(recipeSteps.stepOrder)]
        },
        foodTags: {
          with: {
            tag: true
          }
        },
        units: true
      }
    })

    if (!recipe) {
      return res.status(404).json({
        error: true,
        message: 'No recipes found'
      })
    }
    return res.json({
      error: false,
      data: recipe
    })
  } catch (e) {
    return res.status(500).json({
      error: true,
      message: e
    })
  }
}
const getFood = db.query.food.findFirst({
  orderBy: (foods, { desc }) => [desc(foods.createdAt)],
  with: {
    recipeFoodComponents: {
      with: {
        component: true
      }
    },
    recipeIngredients: {
      orderBy: (recipeIngredients, { asc }) => [
        asc(recipeIngredients.ingredientOrder)
      ]
    },
    recipeSteps: {
      orderBy: (recipeSteps, { asc }) => [asc(recipeSteps.stepOrder)]
    },
    foodTags: {
      with: {
        tag: true
      }
    },
    units: true
  }
})
export type GetFoodById = Awaited<typeof getFood>
