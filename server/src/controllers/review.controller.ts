import { prisma } from '../config/prisma'
import { Request, Response } from 'express'

export const getAllReviews = async (req: Request, res: Response) => {
    try {
        const where: any = {}
        const orderBy: any = req.query.sorting || {}
        const page = Number(req.query?.page) || 1
        const limit = Number(req.query?.limit) || 20
        const search = req.query.search || ''

        if(search) Object.assign(where, {
            text: {
                contains: search
            },
        })

        const [count,reviews] = await Promise.all([
            prisma.review.count({where}),
            prisma.review.findMany({
                where,
                orderBy,
                skip: (page-1)*limit,
                take: limit,
                include: {
                    product: {
                        select: {
                            id: true,
                            name: true,
                        }
                    },
                    user: {
                        select: {
                            last_name: true,
                            first_name: true,
                        }
                    }
                }
            })
        ])

        return res.status(200).json({ data: reviews, count })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 'error', message: 'Interlan server error.' })
    }
}

export const createReview =  async (req: Request, res: Response) => {
    try {
        const review = await prisma.review.create({ data: req.body })
        const product = await prisma.product.findUnique({ where: { id: review.product_id } })
        const rate = (product?.rate!+review.rate)/2
        await prisma.product.update({
            where: { id: req.body.product_id },
            data: {
                rate: { set: rate }
            }
        })

        return res.status(200).json({ data: review, rate })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 'error', message: 'Interlan server error.' })
    }
}

export const updateReview =  async (req: Request, res: Response) => {
    try {
        const review = await prisma.review.update({ where: { id: +req.params.id }, data: req.body })

        return res.status(200).json({ data: review })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 'error', message: 'Interlan server error.' })
    }
}

export const deleteReview = async (req: Request, res: Response) => {
    try {
        await prisma.review.delete({ where: { id: +req.params.id } })

        return res.status(200).json({ data: true })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 'error', message: 'Interlan server error.' })
    }
}