import fs from 'fs'
import { join } from 'path'
import ImageKit from 'imagekit'
import { Request, Response, NextFunction } from 'express'
import { IMAGEKIT_ENDPOINT_URL, IMAGEKIT_PRIVATE_KEY, IMAGEKIT_PUBLIC_KEY } from '../config/keys'

const imagekit = new ImageKit({
    privateKey: IMAGEKIT_PRIVATE_KEY!,
    publicKey: IMAGEKIT_PUBLIC_KEY!,
    urlEndpoint: IMAGEKIT_ENDPOINT_URL!
})

const upload = async (file: any, cb: any) => fs.readFile(join(__dirname, '../', '../', 'upload', file.filename), (_, data) => imagekit.upload({
    file: data,
    folder: "bambino",
    fileName: file.filename, }, 
    (err, resp) => cb(err?.message, {
        url: resp?.url,
        size: resp?.size,
        name: resp?.name
    })
))

export const uploadToCloud = async (req: Request, res: Response, next: NextFunction, type: 'file' | 'files') => {
    try {
        if(type === 'file') {
            if(!req.file) return next()
            
            await upload(req.file, (err: any, data: any) => {
                if(err) return next(err)
                req.body.image = data.url
                return next()
            })
        } else if (type === 'files' && (req.files as any)?.length > 0) {
            const images: any[] = []

            await Promise.all((req.files as any[]).map((file) =>
                new Promise((resolve, reject) => {
                    upload(file, (err: any, data: any) => {
                        if(err) return reject(err)
                        images.push(data)
                        resolve(data)
                    })
                })
            ))
            // req.body.images = images
            // next()
        } else return next()
    } catch (error) {
        console.log(error)
    }
}