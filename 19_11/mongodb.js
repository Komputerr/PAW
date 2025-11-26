const { MongoClient } = require('mongodb');

const mongoUrl = 'mongodb://localhost:3000';
const mongoClient = new MongoClient(mongoUrl);

async function _createCollection()
{
    try{
        const db = await mongoClient.connect(mongoUrl);
        const dbo = await db.db("mydb")
        try{
            await dbo.createCollection("accessLogs")
        }
        catch (err){
            throw err;
        }
        await db.close();
    }catch(err){
        throw err;
    }
}

export {mongoUrl, mongoClient, _createCollection}