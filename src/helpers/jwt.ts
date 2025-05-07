import jwt, { SignOptions } from 'jsonwebtoken'
import 'dotenv/config'
import mongoose from 'mongoose';

interface AuthInterface {
    _id: string | mongoose.Types.ObjectId
    username: string
}

const jwtSecret: string = (process.env.SECRET_KEY as string);

const jwtConfig: SignOptions = {
    expiresIn: "30d",
    algorithm: 'HS256'
}

export const generateToken = (auth: AuthInterface) => {
    return jwt.sign(auth, jwtSecret, jwtConfig)
}

export const verifyToken = (authorization: string) => {
    try {
        const token = authorization.split(' ')[1]
        return jwt.verify(token, jwtSecret) as AuthInterface
    } catch (error) {
        throw error
    }
}