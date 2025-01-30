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
    const recipe = await db.query.recipes.findFirst({
      orderBy: (recipes, { desc }) => [desc(recipes.createdAt)],
      where: (recipes, { eq }) => eq(recipes.id, recipeId),
      with: {
        recipeComponentRecipes: {
          with: {
            recipeComponent: true
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
        recipeTags: {
          with: {
            tag: true
          }
        }
      }
    })

    if (!recipe) {
      return res.status(404).json({
        error: true,
        message: 'No programs found'
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
const recipe = db.query.recipes.findFirst({
  with: {
    recipeComponentRecipes: {
      with: {
        recipeComponent: true
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
    recipeTags: {
      with: {
        tag: true
      }
    }
  }
})
export type Recipe = Awaited<typeof recipe>
