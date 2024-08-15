import { prisma } from '../config/prisma'
import { Request, Response } from 'express'

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const where: any = {}
        const orderBy: any = req.query.sorting || {}
        const page = Number(req.query?.page) || 1
        const limit = Number(req.query?.limit) || 20
        const search = req.query.search || ''

        if(search) Object.assign(where, {
            name: {
                contains: search
            },
        })

        const [count,products] = await Promise.all([
            prisma.product.count({where}),
            prisma.product.findMany({
                where,
                orderBy,
                skip: (page-1)*limit,
                take: limit,
            })
        ])

        return res.status(200).json({ data: products, count })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 'error', message: 'Interlan server error.' })
    }
}

export const createProduct =  async (req: Request, res: Response) => {
    try {
        const product = await prisma.product.create({ data: req.body })

        return res.status(200).json({ data: product })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 'error', message: 'Interlan server error.' })
    }
}

export const updateProduct =  async (req: Request, res: Response) => {
    try {
        const product = await prisma.product.update({ where: { id: +req.params.id }, data: req.body })

        return res.status(200).json({ data: product })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 'error', message: 'Interlan server error.' })
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        await prisma.product.delete({ where: { id: +req.params.id } })

        return res.status(200).json({ data: true })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 'error', message: 'Interlan server error.' })
    }
}