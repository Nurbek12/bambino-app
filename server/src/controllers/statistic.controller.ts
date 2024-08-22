import { prisma } from '../config/prisma'
import { Request, Response } from 'express'

export const getStatisticsCounts = async (_: Request, res: Response) => {
    try {
        const [
            users_count,
            orders_count,
            reports_count,
            products_count,
        ] = await Promise.all([
            prisma.user.count(),
            prisma.order.count(),
            prisma.report.count({ where: { status: 'pending' } }),
            prisma.product.count(),
        ])

        return res.status(200).json({ data: {
            users_count,
            orders_count,
            reports_count,
            products_count,
        } })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 'error', message: 'Interlan server error.' })
    }
}

export const setStatistics = async (key: keyof typeof prisma.statistics.fields, value: number) => {
    const d = new Date()
    const date = d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }).replace(/\//g, '-')
    
    const s = await prisma.statistics.findUnique({ where: { date } })
    if(s) {
        await prisma.statistics.update({ where: { id: s.id }, data: { [key]: { increment: value } } })
    } else {
        const newStatistic: any = {
            date,
            day: d.getDate(),
            month: d.getMonth() + 1,
            year: d.getFullYear(),
            amount: 0,
            orders: 0,
            users: 0,
            reports: 0
        }
        newStatistic[key] = value
        await prisma.statistics.create({ data: newStatistic })
    }
}

// setStatistics()