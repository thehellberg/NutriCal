import { z } from 'zod'

import type { Request, Response } from 'express'

import { validateData } from '@/utils/zod-validate'

export const patch = async (req: Request, res: Response) => {
  const requestBody: userData = await req.body
  const valid = validateData(userLoginSchema, requestBody)
  if (valid !== 'OK') {
    return res.status(400).json({
      error: true,
      message: JSON.stringify(valid)
    })
  }

  return res.json({
    error: false
  })
}

export const userDataSchema = z.object({
  email: z
    .string()
    .min(1, 'Email field is required.')
    .max(255, 'Email too long.')
    .email('This is not a valid email.'),
  password: z.string().min(8)
})

type userData = {
  id: string
  username: string
  displayName: string
  sex: string
  dateOfBirth: Date
  created_at: Date
  avatar: string
}
