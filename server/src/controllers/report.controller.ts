import { prisma } from '../config/prisma'
import { Request, Response } from 'express'
import { setStatistics } from './statistic.controller'

export const getAllReports = async (req: Request, res: Response) => {
    try {
        const where: any = {}
        const orderBy: any = req.query.sorting || {}
        const page = Number(req.query?.page) || 1
        const limit = Number(req.query?.limit) || 20

        const [count,reviews] = await Promise.all([
            prisma.report.count({where}),
            prisma.report.findMany({
                where,
                orderBy,
                skip: (page-1)*limit,
                take: limit,
                include: {
                    user: {
                        select: {
                            last_name: true,
                            first_name: true,
                        }
                    },
                }
            })
        ])

        return res.status(200).json({ data: reviews, count })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 'error', message: 'Interlan server error.' })
    }
}

export const createReport =  async (req: Request, res: Response) => {
    try {
        const report = await prisma.report.create({ 
            data: req.body, 
            include: {
                user: {
                    select: {
                        first_name: true,
                        last_name: true,
                    }
                } 
            } 
        })
        await prisma.order.update({
            where: { id: report.order_id },
            data: { is_reported: true }
        })
        setStatistics('reports', 1)
        return res.status(200).json({ data: report })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 'error', message: 'Interlan server error.' })
    }
}

export const updateReport =  async (req: Request, res: Response) => {
    try {
        const report = await prisma.report.update({ where: { id: +req.params.id }, data: req.body })

        return res.status(200).json({ data: report })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 'error', message: 'Interlan server error.' })
    }
}

export const deleteReport = async (req: Request, res: Response) => {
    try {
        await prisma.report.delete({ where: { id: +req.params.id } })

        return res.status(200).json({ data: true })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 'error', message: 'Interlan server error.' })
    }
}