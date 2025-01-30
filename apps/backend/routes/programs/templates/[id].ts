import type { Response, Request, NextFunction } from 'express'

import { db } from '@/db/index'
import { validateSessionToken } from '@/utils/auth/utils'
export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    if (!id || isNaN(parseInt(id))) {
      next()
      return res.status(400).json({
        error: true,
        message: 'Invalid request'
      })
    }
    const programTemplateId = parseInt(id)
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
    const programTemplate = await db.query.programTemplates.findFirst({
      orderBy: (programTemplates, { desc }) => [
        desc(programTemplates.createdAt)
      ],
      where: (programTemplates, { eq }) =>
        eq(programTemplates.id, programTemplateId),
      with: {
        programTemplateRecipes: {
          with: {
            recipe: true
          }
        },
        programTemplateTags: {
          with: {
            tag: true
          }
        }
      }
    })

    if (!programTemplate) {
      return res.status(404).json({
        error: true,
        message: 'No programs found'
      })
    }
    return res.json({
      error: false,
      data: programTemplate
    })
  } catch (e) {
    return res.status(500).json({
      error: true,
      message: e
    })
  }
}
const programTemplates = db.query.programTemplates.findFirst({
  with: {
    programTemplateRecipes: { with: { recipe: true } },
    programTemplateTags: {
      with: {
        tag: true
      }
    }
  }
})
export type ProgramTemplate = Awaited<typeof programTemplates>
