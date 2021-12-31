import { MongoClient } from 'mongodb'
const connectionString = 'mongodb://localhost:27017'
const MONGODB_DB = 'community'

const collection = async (name: string) => {
    const client = await MongoClient.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    const db = client.db(MONGODB_DB)
    return db.collection(name)
}

export default collection