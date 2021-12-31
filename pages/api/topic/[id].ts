import { ObjectID } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next'
import collection from '../../../units/conn';


export default async (_req: NextApiRequest, res: NextApiResponse) => {
    switch (_req.method) {
        case 'GET':
            try {
                const { id } = _req.query
                const topics = await collection('topics');
                const replys = await collection('replys')
                const topic = await topics.findOne({ _id: new ObjectID(id as string) })
                const replys_items = await replys.find({ topicId: id }).sort({ time: -1 }).toArray()
                res.status(200).json(Object.assign(topic, { replys: replys_items }) || null)
            } catch (err: any) {
                res.status(500).json({ statusCode: 500, message: err.message })
            }
            break
        default:
            res.status(405).end() //Method Not Allowed
            break
    }
}