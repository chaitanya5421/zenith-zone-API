
require('dotenv').config({
    path: require('path').join(__dirname, '../.env')
})

const dns = require('node:dns')
const mongoose = require('mongoose')

// Use your current Wi-Fi DNS servers for MongoDB SRV lookups
dns.setServers(['49.205.72.130', '183.82.243.66'])

const connectDB = async () => {
    const connectionString = process.env.MONGODB_URI

    if (!connectionString) {
        throw new Error('MONGODB_URI is not set in the .env file')
    }

    try {
        await mongoose.connect(connectionString, {
            serverSelectionTimeoutMS: 10000
        })

        console.log('Connected to MongoDB')
        console.log('Database name:', mongoose.connection.name)

        return true
    } catch (error) {
        console.error('MongoDB connection failed')
        console.error('Error name:', error.name)
        console.error('Error code:', error.code)
        console.error('Error message:', error.message)

        throw error
    }
}

module.exports = connectDB
