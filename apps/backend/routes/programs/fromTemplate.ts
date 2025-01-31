import { eq } from 'drizzle-orm'
import { Request, Response } from 'express'
import { z } from 'zod'

import { db } from '@/db/index'
import { programs, programTemplates } from '@/db/schema/programs'
import { validateSessionToken } from '@/utils/auth/utils'
import { validateData } from '@/utils/zod-validate'

export const post = async (req: Request, res: Response) => {
  try {
    console.log('h')

    const requestBody: programCreation = req.body
    const valid = validateData(programCreationSchema, requestBody)
    if (valid !== 'OK') {
      return res.status(400).json({
        error: true,
        message: valid
      })
    }
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
    const template = await db
      .select()
      .from(programTemplates)
      .where(eq(programTemplates.id, requestBody.programTemplateId))
      .limit(1)

    if (!template[0]) {
      return res.status(404).json({
        error: true,
        message: 'Template not found'
      })
    }

    const newProgram = await db
      .insert(programs)
      .values({
        programTemplateId: template[0].id,
        userId: session.user.id,
        name: template[0].name,
        startDate: new Date(),
        endDate: new Date(
          Date.now() + template[0].durationInDays * 24 * 60 * 60 * 1000
        ),
        instructions: template[0].instructions,
        isSelected: true
      })
      .returning()
    if (newProgram.length === 0) {
      return res.status(404).json({
        error: true,
        message: 'No programs found'
      })
    }
    return res.json({
      error: false,
      data: newProgram
    })
  } catch (e) {
    return res.status(500).json({
      error: true,
      message: e
    })
  }
}
export const programCreationSchema = z.object({
  programTemplateId: z.number().min(0)
})

type programCreation = {
  programTemplateId: number
}

const newProgram = db
  .insert(programs)
  .values({
    programTemplateId: 1,
    userId: '1',
    name: 'name',
    startDate: new Date(),
    endDate: new Date(),
    instructions: 'instructions',
    isSelected: true
  })
  .returning()
export type CreateProgramReturn = Awaited<typeof newProgram>
