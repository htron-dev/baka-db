import fs from 'fs'
import path from 'path'

class Drive {
    async exists(filename: string){
        return fs.promises.stat(filename).then(() => true).catch(() => false)
    }
    
    async write(filename: string, content: string){
        await fs.promises.mkdir(path.dirname(filename), { recursive: true })
        
        return fs.promises.writeFile(filename, content)
    }

    async read(filename: string){
        return fs.promises.readFile(filename, 'utf8')
    }
    
    readSync(filename: string){
        return fs.readFileSync(filename, 'utf8')
    }
}

export const drive = new Drive()

export default new Drive()