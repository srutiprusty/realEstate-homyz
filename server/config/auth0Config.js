import {auth} from 'express-oauth2-jwt-bearer'

const jwtCheck = auth({
    audience: "https://localhost:5173",
    issuerBaseURL: "https://dev-ymtltn84g8kje8v4.us.auth0.com",
    tokenSigningAlg: "RS256"
});

/* export default jwtCheck  */
export default function (req, res, next) {
    jwtCheck(req, res, (err) => {
        if (err) {
            console.error("JWT Error:", err.message);
            return res.status(401).json({ error: 'Unauthorized' });
        }
        next();
    });

}
/* import express from 'express';
import jwtCheck from './path/to/jwtCheck';

const app = express();

// Use JWT check middleware
app.use(jwtCheck);

// Define your routes
app.get('/secure-endpoint', (req, res) => {
    res.json({ message: "This is a secure endpoint" });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
 */

/* import { auth } from 'express-oauth2-jwt-bearer';

const jwtCheck = auth({
    audience: "http://localhost:8001/api",
    issuerBaseURL: "https://dev-ymtltn84g8kje8v4.us.auth0.com",
    tokenSigningAlg: "RS256"
});

// Middleware wrapper to log errors
const errorHandler = (err, req, res, next) => {
    console.error("JWT Middleware Error:", err);
    res.status(401).json({ message: 'Unauthorized' });
};

/* app.use(jwtCheck);
app.use(errorHandler); 
export default jwtCheck  */