import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/keys'
import { Request, Response, NextFunction } from 'express'

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '')

        if(!token) return res.status(401).json({ status: 'warning', message: 'Token not defined' })

        const payload: any = jwt.verify(token, JWT_SECRET!)

        req.user = payload
        
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 'error', message: 'Interlan server error.' })
    }
}