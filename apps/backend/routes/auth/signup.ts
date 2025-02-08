import { Request, Response } from 'express'
import { z } from 'zod'

import { checkEmailAvailability } from '@/utils/auth/email'
import { createUser } from '@/utils/auth/user'
import { createSession, generateSessionToken } from '@/utils/auth/utils'
import { validateData } from '@/utils/zod-validate'
export const post = async (req: Request, res: Response) => {
  const requestBody: z.infer<typeof userSignupSchema> = userSignupSchema.parse(
    req.body
  )
  requestBody.dateOfBirth = new Date(requestBody.dateOfBirth)
  const valid = validateData(userSignupSchema, requestBody)
  if (valid !== 'OK') {
    return res.status(400).json({
      error: true,
      message: valid
    })
  }
  if (!(await checkEmailAvailability(requestBody.email))) {
    return res.status(400).json({
      error: true,
      message: 'Email already exits!'
    })
  }
  const user = await createUser(
    requestBody.firstName,
    requestBody.lastName,
    requestBody.sex,
    requestBody.dateOfBirth,
    requestBody.email,
    requestBody.password
  )
  const token = generateSessionToken()
  const session = await createSession(token, user.id)
  return res.json({
    error: false,
    data: {
      token,
      user,
      session
    }
  })
}

const userSignupSchema = z
  .object({
    email: z
      .string()
      .min(1, 'Email field is required.')
      .max(255, 'Email too long.')
      .email('This is not a valid email.'),
    password: z.string().min(8),
    firstName: z.string().min(1, 'First name is mandatory.'),
    lastName: z.string(),
    sex: z.enum(['M', 'F']),
    dateOfBirth: z.date()
  })
  .strict()
