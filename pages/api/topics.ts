import { NextApiRequest, NextApiResponse } from 'next'
import collection from '../../units/conn'

export default async (_req: NextApiRequest, res: NextApiResponse) => {
    switch (_req.method) {
        case 'GET':
            try {
                const topics = await collection('topics');
                const items = await topics.aggregate([
                    {
                        $project: {
                            _id: {
                                $toString: "$_id"
                            },
                            title: "$title",
                            author: "$author",
                            time: "$time",
                        }
                    },
                    {
                        $lookup: {
                            from: "replys",
                            localField: "_id",
                            foreignField: "topicId",
                            as: "replys"
                        }
                    },
                    {
                        $addFields: {
                            numOfreplys: {
                                $size: "$replys"
                            }
                        }
                    },
                    {
                        $project: {
                            _id: {
                                $toObjectId: "$_id"
                            },
                            title: "$title",
                            author: "$author",
                            time: "$time",
                            numOfreplys: "$numOfreplys"
                        }
                    },
                    { $sort: { time: -1 } }
                    // {
                    //     $project: {
                    //         _id: {
                    //             $toString: "$_id"
                    //         },
                    //         title: "$title",
                    //         author: "$author",
                    //         time: "$time"
                    //     }
                    // },
                    // {
                    //     $lookup:
                    //     {
                    //         from: "replys",
                    //         localField: "_id",
                    //         foreignField: "topicId",
                    //         as: "replys"
                    //     }
                    // }, {
                    //     $addFields: {
                    //         numOfreplys: {
                    //             $size: "$replys"
                    //         }
                    //     }
                    // }
                ]).toArray()
                res.status(200).json(items)
            } catch (err: any) {
                res.status(500).json({ statusCode: 500, message: err.message })
            }
            break
        default:
            res.status(405).end() //Method Not Allowed
            break
    }
}