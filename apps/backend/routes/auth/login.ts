import { z } from 'zod'

import type { Request, Response } from 'express'

import { verifyPasswordHash } from '@/utils/auth/passwords'
import { getUserFromEmail } from '@/utils/auth/user'
import { generateSessionToken, createSession } from '@/utils/auth/utils'
import { validateData } from '@/utils/zod-validate'

export const post = async (req: Request, res: Response) => {
  try {
    const requestBody: userLogin = req.body
    const valid = validateData(userLoginSchema, requestBody)
    if (valid !== 'OK') {
      return res.status(400).json({
        error: true,
        message: valid
      })
    }

    const user = await getUserFromEmail(requestBody.email)
    if (!user) {
      return res.status(400).json({
        error: true,
        message: 'User not found!'
      })
    }
    if (
      user.passwordHash &&
      !(await verifyPasswordHash(user.passwordHash, requestBody.password))
    ) {
      return res.status(400).json({
        error: true,
        message: 'Mismatched Email and Password.'
      })
    }
    const token = generateSessionToken()
    const session = await createSession(token, user.id)
    return res.json({
      error: false,
      data: {
        token,
        session
      }
    })
  } catch (e) {
    return res.status(500).json({
      error: true,
      message: e
    })
  }
}

export const userLoginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email field is required.')
    .max(255, 'Email too long.')
    .email('This is not a valid email.'),
  password: z.string().min(8)
})

type userLogin = {
  email: string
  password: string
}
