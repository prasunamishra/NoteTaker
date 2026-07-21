import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const generateToken = (user) => {
    return JWT.sign({ id: user._id, email: user.email }, JWT_SECRET, {
        expiresIn: '7d',
    });
};

export const verifyToken = (token) => {
    return JWT.verify(token, JWT_SECRET);
};
