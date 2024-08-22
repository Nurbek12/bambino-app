import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '../config/prisma'
import { Request, Response } from 'express'
import { JWT_SECRET } from '../config/keys'

export const login =  async (req: Request, res: Response) => {
    try {
        const user = await prisma.admin.findFirst({ where: { login: req.body.login } })

        if(!user) return res.status(400).json({ message: 'Не правильный логин или пароль' })

        if(!(await bcrypt.compare(req.body.password, user.password))) return res.status(400).json({ message: 'Не правильный логин или пароль' })
        
        const token = jwt.sign(user.id.toString(), JWT_SECRET!, { expiresIn: '2h' })
        return res.status(200).json({ data: token })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 'error', message: 'Interlan server error.' })
    }
}

const createAdmin = async (login: string, password: string) => {
    try {
        await prisma.admin.create({data: {
            login: login,
            password: await bcrypt.hash(password, 10)
        }})
        console.log("Админ создан!")
    } catch (error) {
        console.log(error)
    }
}