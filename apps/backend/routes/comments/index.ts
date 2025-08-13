import { Request, Response } from 'express'
import z from 'zod'

import { db } from '@/db/index'
import { MediaType, postComments, posts } from '@/db/schema/user'
import { validateSessionToken } from '@/utils/auth/utils'
export const post = async (req: Request, res: Response) => {
  try {
    const schema = z
      .object({
        postId: z.string(),
        content: z.string(),
        parentId: z.string().optional()
      })
      .strict()
    const reqData = schema.parse(req.body)
    const requestToken = req.token
    const session = await validateSessionToken(requestToken || '')

    if (session === null) {
      return res.status(401).json({
        error: true,
        message: 'Unauthorized'
      })
    }
    // Create a new post
    const newPost = await db
      .insert(postComments)
      .values({
        postId: reqData.postId,
        userId: session.session?.userId ?? '',
        content: reqData.content,
        createdAt: new Date(),
        updatedAt: new Date(),
        parentId: null
      })
      .returning()

    return res.status(201).json({
      error: false,
      data: newPost
    })
  } catch (e) {
    return res.status(500).json({
      error: true,
      message: e
    })
  }
}
const postPosts = db
  .insert(posts)
  .values({
    userId: '',
    content: '',
    mediaType: MediaType.Text,
    mediaUrl: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    isApproved: true,
    isBanned: false
  })
  .returning()
export type PostPosts = Awaited<typeof postPosts>
