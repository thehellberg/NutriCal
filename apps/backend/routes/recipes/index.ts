import type { Response, Request } from 'express'

import { db } from '@/db/index'
import { validateSessionToken } from '@/utils/auth/utils'
export const get = async (req: Request, res: Response) => {
  try {
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
    const recipes = await db.query.recipes.findMany({
      orderBy: (recipes, { desc }) => [desc(recipes.createdAt)],
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
const recipes = db.query.recipes.findMany({
  orderBy: (recipes, { desc }) => [desc(recipes.createdAt)],
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
export type Recipes = Awaited<typeof recipes>
