import { NextApiRequest, NextApiResponse } from 'next'
import collection from '../../units/conn'

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  switch (_req.method) {
    case 'POST':
      try {
        const { time, title, text, author } = _req.body;
        const topics = await collection('topics');
        if (time && title && text && author) {
          await topics.insert({ time, title, text, author })
          res.status(200).json(true)
        } else {
          res.status(200).json(false)
        }
      } catch (err: any) {
        res.status(500).json({ statusCode: 500, message: err.message })
      }
      break
    default:
      res.status(405).end() //Method Not Allowed
      break
  }
}
