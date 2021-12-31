import { NextApiRequest, NextApiResponse } from 'next'
import collection from '../../units/conn'

export default async (_req: NextApiRequest, res: NextApiResponse) => {
    switch (_req.method) {
        case 'POST':
            try {
                const { time, text, author, topicId } = _req.body;
                const topics = await collection('replys');
                if (time && text && author) {
                    await topics.insert({ topicId, time, text, author })
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
