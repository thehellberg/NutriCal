import { type Response, type Request } from 'express'
import { z } from 'zod'

import { db } from '@/db/index'
import { validateSessionToken } from '@/utils/auth/utils'
export const post = async (req: Request, res: Response) => {
  try {
    const requestSchema = z
      .object({
        barcode: z.string()
      })
      .strict()
    const reqData = requestSchema.parse(req.body)
    const requestToken = req.token
    const session = await validateSessionToken(requestToken)
    if (session === null) {
      return res.status(401).json({
        error: true,
        message: 'Unauthorized'
      })
    }

    const foods = await db.query.food.findMany({
      where: (food, { eq }) => eq(food.barcode, reqData.barcode),
      orderBy: (food, { desc }) => [desc(food.createdAt)],
      with: {
        foodTags: {
          with: {
            tag: true
          }
        }
      },
      limit: 5
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
const postFoodsBarcode = db.query.food.findMany({
  orderBy: (food, { desc }) => [desc(food.createdAt)],
  with: {
    foodTags: {
      with: {
        tag: true
      }
    }
  }
})
export type PostFoodsBarcode = Awaited<typeof postFoodsBarcode>
