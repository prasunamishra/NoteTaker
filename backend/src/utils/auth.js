import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({
    path: '../../.env',
})

export const generateToken = (user) => {
    return JWT.sign({ id: user._id, email: user.email }, 'secret',{
        expiresIn: '7d',
    });
}

const JWT_SECRET = process.env.JWT_SECRET || 'secret'
'edfcv3frghwy65bvcsf4c654hj786rgbw45y264ytrhbgergf'

export const verifyToken = (token) => {
    return JWT.verify(token, JWT_SECRET);
}
