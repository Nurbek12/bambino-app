import { prisma } from '../config/prisma'
import { Request, Response } from 'express'

export const getAllCategories = async (req: Request, res: Response) => {
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
        
        const [count,categories] = await Promise.all([
            prisma.category.count({where}),
            prisma.category.findMany({
                where,
                orderBy,
                skip: (page-1)*limit,
                take: limit,
            })
        ])

        return res.status(200).json({ data: categories, count })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 'error', message: 'Interlan server error.' })
    }
}

export const createCategory =  async (req: Request, res: Response) => {
    try {
        if(req.file) req.body.image = req.file.filename
        const category = await prisma.category.create({ data: req.body })

        return res.status(200).json({ data: category })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 'error', message: 'Interlan server error.' })
    }
}

export const updateCategory =  async (req: Request, res: Response) => {
    try {
        if(req.file) req.body.image = req.file.filename
  
        const category = await prisma.category.update({ where: { id: +req.params.id }, data: req.body })

        return res.status(200).json({ data: category })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 'error', message: 'Interlan server error.' })
    }
}

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        await prisma.category.delete({ where: { id: +req.params.id } })

        return res.status(200).json({ data: true })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 'error', message: 'Interlan server error.' })
    }
}