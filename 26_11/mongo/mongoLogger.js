const { getOrCreateMongoCollection } = require("./mongoConnect.js");

const accessLogger = async (req, res, next) => {
    try {
        const collection = await getOrCreateMongoCollection('accessLogs');
        const logAccess = {
            method: req.method,
            url: req.originalUrl,
            body: req.body,
            statusCode: res.statusCode,
            timestamp: Date.now()
        };
        res.on('finish', async () => {
            await collection.insertOne(logAccess)
        });
    } catch (error) {
        console.error(error)
    }
    next();
}

const errorLogger = async (err, req, res, next) => {
    try {
        const collection = await getOrCreateMongoCollection('errorLogs');
        const logError = {
            method: req.method,
            error: err,
            errorMessage: err.message,
            statusCode: res.statusCode,
            timestamp: Date.now()
        }
        await collection.insertOne(logError)

    } catch (error) {
        console.error(error)
    }
    next(err)
}
module.exports = {accessLogger, errorLogger};