import { join } from 'path'
import { v4 as uuid } from 'uuid'
import multer, { diskStorage } from 'multer'

export const upload = multer({
    storage: diskStorage({
        filename: (_, file, cb) => cb(null, `file-${uuid()}-${file.originalname}`),
        destination: (_, __, cb) => cb(null, join(__dirname, '../', '../', 'upload'))
    })
})