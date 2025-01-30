import type { Response, Request } from 'express'
export const get = async (req: Request, res: Response) => {
  if (req.method !== 'GET') return res.status(405)

  return res.json({ hello: 'world' })
}
