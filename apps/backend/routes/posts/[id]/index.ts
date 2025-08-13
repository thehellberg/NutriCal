import type { Response, Request, NextFunction } from 'express'

import { db } from '@/db/index'
import { validateSessionToken } from '@/utils/auth/utils'
export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    if (!id) {
      next()
      return res.status(400).json({
        error: true,
        message: 'Invalid request'
      })
    }
    const postId = id
    const requestToken = req.token
    const session = await validateSessionToken(requestToken || '')
    if (session === null) {
      return res.status(401).json({
        error: true,
        message: 'Unauthorized'
      })
    }
    const post = await db.query.posts.findFirst({
      where: (posts, { eq, and }) =>
        and(
          eq(posts.id, postId),
          eq(posts.isApproved, true),
          eq(posts.isBanned, false)
        ),
      with: {
        likes: {
          columns: {
            userId: true
          }
        },
        comments: {
          columns: {
            id: true,
            content: true,
            createdAt: true
          },
          with: {
            user: {
              columns: {
                id: true,
                firstName: true,
                lastName: true
              }
            }
          }
        },
        user: {
          columns: {
            id: true,
            firstName: true,
            lastName: true
          }
        }
      }
    })

    if (!post) {
      return res.status(404).json({
        error: true,
        message: 'No Posts found'
      })
    }
    return res.json({
      error: false,
      data: post
    })
  } catch (e) {
    return res.status(500).json({
      error: true,
      message: e
    })
  }
}
const getPost = db.query.posts.findFirst({
  with: {
    likes: {
      columns: {
        userId: true
      }
    },
    comments: {
      columns: {
        id: true,
        content: true,
        createdAt: true
      },
      with: {
        user: {
          columns: {
            id: true,
            firstName: true,
            lastName: true
          }
        }
      }
    },
    user: {
      columns: {
        id: true,
        firstName: true,
        lastName: true
      }
    }
  }
})

export type GetPostById = Awaited<typeof getPost>
