app.js -> Build/configure application 

server.js -> start Application

MongoDB is optional while the JSON-backed APIs are in use. To enable it, add `MONGODB_URI` to `backend/.env`. The server will continue to run if MongoDB is not configured or cannot be reached.


controller -> Request, Response, Status codes, Calling Services
Controller should not have any Business Login

services -> Business Logic

model-> it handles data integration.


middleWare -> Process request before Controller 
utils -> resuable helper functions
config -> Application Configuration

