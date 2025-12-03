const {MongoClient} = require('mongodb');
const mongoUrl = process.env.MONGO_URL;
const client = new MongoClient(mongoUrl);

let db = null;
const connectDB = async () => {
    if(db){return db}
    await client.connect();
    db = client.db("Logs");
    return db;
}
const getOrCreateMongoCollection = async (collectionName) => {
    const db = await connectDB();

    const collections = await db.listCollections({ name: collectionName }).toArray();

    if (!collections) {
        const collection = await db.createCollection(collectionName);
    }

    return db.collection(collectionName);
}
module.exports = {connectDB,getOrCreateMongoCollection};