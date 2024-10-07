import jsonwebtoken from "jsonwebtoken";
const jwt = jsonwebtoken;

const auth = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, 'secretKey');
        req.user = decoded.userId; // Attach the user's ID to the request object
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

export default auth;
