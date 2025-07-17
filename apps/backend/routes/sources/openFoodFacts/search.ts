import { eq } from 'drizzle-orm'
import { z } from 'zod'

import type { Request, Response } from 'express'

import { db } from '@/db/index'
import { dietarySettings } from '@/db/schema/user'
import { validateSessionToken } from '@/utils/auth/utils'

interface OpenFoodFactsProduct {
  product_name: string
  brands?: string
  nutriscore_grade?: string
  nova_group?: number
  nutriments: {
    energy_100g?: number
    fat_100g?: number
    'saturated-fat_100g'?: number
    carbohydrates_100g?: number
    sugars_100g?: number
    fiber_100g?: number
    proteins_100g?: number
    salt_100g?: number
    sodium_100g?: number
  }
  allergens?: string
  traces?: string
  categories?: string
  image_url?: string
  code: string
}

interface OpenFoodFactsResponse {
  products: OpenFoodFactsProduct[]
  count: number
  page: number
  page_count: number
  page_size: number
}

export const post = async (req: Request, res: Response) => {
  try {
    const requestSchema = z
      .object({
        query: z.string()
      })
      .strict()
    const reqData = requestSchema.parse(req.body)

    const requestToken = req.token
    const session = await validateSessionToken(requestToken)
    if (!session.session) {
      res.status(401).json({ error: true, message: 'Unauthorized' })
      return
    }

    // Get user's dietary settings for filtering
    const userDietarySettings = await db.query.dietarySettings.findFirst({
      where: eq(dietarySettings.userId, session.session.userId)
    })

    const response = await fetch(
      `https://world.openfoodfacts.net/cgi/search.pl?search_terms=${reqData.query}&page=${1}&page_size=${10}&json=1&fields=product_name,brands,nutriscore_grade,nova_group,nutriments,allergens,traces,categories,image_url,code`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    return res.json({
      error: false,
      data: { response: await response.json() }
    })
    if (!response.data || !response.data.products) {
      return res.json({
        error: false,
        data: {
          products: [],
          pagination: {
            page: Number(page),
            page_size: Number(page_size),
            total_count: 0,
            total_pages: 0
          }
        }
      })
    }

    // Filter products based on dietary restrictions if user has settings
    let filteredProducts = response.data.products

    if (userDietarySettings) {
      filteredProducts = filteredProducts.filter((product) => {
        // Filter based on dietary preferences
        if (userDietarySettings.isVegan && product.categories) {
          const categories = product.categories.toLowerCase()
          if (
            categories.includes('meat') ||
            categories.includes('dairy') ||
            categories.includes('egg') ||
            categories.includes('fish')
          ) {
            return false
          }
        }

        if (userDietarySettings.isVegetarian && product.categories) {
          const categories = product.categories.toLowerCase()
          if (categories.includes('meat') || categories.includes('fish')) {
            return false
          }
        }

        // Filter based on allergens
        if (userDietarySettings.allergens && product.allergens) {
          const userAllergens = userDietarySettings.allergens.toLowerCase()
          const productAllergens = product.allergens.toLowerCase()

          const commonAllergens = [
            'gluten',
            'nuts',
            'milk',
            'eggs',
            'soy',
            'fish',
            'shellfish'
          ]
          for (const allergen of commonAllergens) {
            if (
              userAllergens.includes(allergen) &&
              productAllergens.includes(allergen)
            ) {
              return false
            }
          }
        }

        return true
      })
    }

    // Transform products to match your API structure
    const transformedProducts = filteredProducts.map((product) => ({
      id: product.code,
      name: product.product_name || 'Unknown Product',
      brand: product.brands || null,
      nutritionGrade: product.nutriscore_grade || null,
      novaGroup: product.nova_group || null,
      nutrition: {
        energy: product.nutriments.energy_100g || 0,
        fat: product.nutriments.fat_100g || 0,
        saturatedFat: product.nutriments['saturated-fat_100g'] || 0,
        carbohydrates: product.nutriments.carbohydrates_100g || 0,
        sugars: product.nutriments.sugars_100g || 0,
        fiber: product.nutriments.fiber_100g || 0,
        protein: product.nutriments.proteins_100g || 0,
        salt: product.nutriments.salt_100g || 0,
        sodium: product.nutriments.sodium_100g || 0
      },
      allergens: product.allergens || null,
      traces: product.traces || null,
      categories: product.categories || null,
      imageUrl: product.image_url || null,
      source: 'openfoodfacts'
    }))

    return res.json({
      error: false,
      data: {
        products: transformedProducts,
        pagination: {
          page: Number(page),
          page_size: Number(page_size),
          total_count: response.data.count || 0,
          total_pages: response.data.page_count || 0
        },
        applied_filters: userDietarySettings
          ? {
              dietary_restrictions: {
                vegan: userDietarySettings.isVegan,
                vegetarian: userDietarySettings.isVegetarian
              },
              allergen_filters: userDietarySettings.allergens ? true : false
            }
          : null
      }
    })
  } catch (e) {
    console.error('OpenFoodFacts search error:', e)
    return res.status(500).json({
      error: true,
      message: 'Failed to search food database',
      details: process.env.NODE_ENV === 'development' ? e.message : undefined
    })
  }
}

const getTypeGenerator = db.query.dietarySettings.findFirst()
export type GetDietarySettingsReturn = Awaited<typeof getTypeGenerator>
