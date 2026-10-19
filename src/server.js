const app = require('./app');
const connectDB = require('./db');

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await connectDB();
    } catch (error) {
        console.error('Starting API without MongoDB. Check MONGODB_URI and the Atlas database user.');
    }

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

startServer().catch((error) => {
    console.error('Failed to start server:', error);
    process.exitCode = 1;
});