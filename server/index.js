import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { userRoute } from './routes/userRoute.js';
import { residencyRoute } from './routes/residencyRoute.js';
dotenv.config()

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
});

app.use("/api/user", userRoute)
app.use("/api/residency", residencyRoute)
/* 
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { userRoute } from './routes/userRoute.js';
import { residencyRoute } from './routes/residencyRoute.js';
import { auth } from 'express-oauth2-jwt-bearer';

// Initialize environment variables
dotenv.config();

// Create an Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests and cookies
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// JWT middleware configuration
const jwtCheck = auth({
    audience: "http://localhost:8001",  // Ensure this matches your Auth0 API identifier
    issuerBaseURL: "https://dev-ymtltn84g8kje8v4.us.auth0.com",  // Ensure this matches your Auth0 domain
    tokenSigningAlg: "RS256"  // Token signing algorithm
});

// Use JWT middleware
app.use(jwtCheck);

// Routes
app.use('/api/user', userRoute);
app.use('/api/residency', residencyRoute);

// Error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error("JWT Middleware Error:", err);
    res.status(401).json({ message: 'Unauthorized' });
};

// Use error handling middleware after all routes
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
 */