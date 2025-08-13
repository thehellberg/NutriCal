import { and, eq } from 'drizzle-orm'
import { z } from 'zod'

import type { Request, Response } from 'express'

import { db } from '@/db/index'
import { postLikes, posts } from '@/db/schema/user'
import { validateSessionToken } from '@/utils/auth/utils'

export const patch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({
        error: true,
        message: 'Invalid request'
      })
    }
    const postId = parseInt(id)

    const requestSchema = z
      .object({
        favorited: z.boolean()
      })
      .strict()
    const reqData = requestSchema.parse(req.body)
    const requestToken = req.token

    const session = await validateSessionToken(requestToken)
    if (!session) {
      return res.status(401).json({ error: true, message: 'Unauthorized' })
    }
    if (session.user === null) {
      return res.status(401).json({ error: true, message: 'Unauthorized' })
    }
    const post = await db
      .select()
      .from(posts)
      .where(eq(posts.id, postId.toString()))
      .limit(1)
    if (!post || post.length === 0) {
      return res.status(404).json({
        error: true,
        message: 'Post not found'
      })
    }
    if (reqData.favorited) {
      const result = await db
        .insert(postLikes)
        .values({
          postId: postId.toString(),
          userId: session.user.id.toString()
        })
        .returning()
      if (result.length === 0) {
        return res.status(500).json({
          error: true,
          message: 'Failed to like the post'
        })
      }
      return res.json({
        error: false,
        data: result[0]
      })
    } else {
      const result = await db
        .delete(postLikes)
        .where(
          and(
            eq(postLikes.postId, postId.toString()),
            eq(postLikes.userId, session.user.id.toString())
          )
        )
        .returning()
      if (result.length === 0) {
        return res.status(500).json({
          error: true,
          message: 'Failed to unlike the post'
        })
      }
      return res.json({
        error: false,
        data: result[0]
      })
    }
  } catch (e) {
    return res.status(500).json({ error: true, message: e.message })
  }
}
const patchLike = db
  .insert(postLikes)
  .values({
    postId: '1',
    userId: 'session.user.id.toString()'
  })
  .returning()
export type PatchPostLikeReturn = Awaited<typeof patchLike>
