import { NextApiRequest, NextApiResponse } from 'next'
import collection from '../../units/conn'

export default async (_req: NextApiRequest, res: NextApiResponse) => {
    switch (_req.method) {
        case 'GET':
            try {
                const users = await collection('users');
                const u = await users.aggregate(
                    [{ $sample: { size: 1 } }]
                ).toArray()
                res.status(200).json(u[0])
            } catch (err: any) {
                res.status(500).json({ statusCode: 500, message: err.message })
            }
            break
        default:
            res.status(405).end() //Method Not Allowed
            break
    }
}