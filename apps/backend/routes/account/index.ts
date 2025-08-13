import type { Request, Response } from 'express'

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
    if (session === null) {
      return res.status(401).json({
        error: true,
        message: 'Unauthorized'
      })
    }

    return res.json({
      error: false,
      data: session
    })
  } catch (e) {
    return res.status(500).json({
      error: true,
      message: e
    })
  }
}

export type GetAccountReturn = Awaited<ReturnType<typeof validateSessionToken>>
