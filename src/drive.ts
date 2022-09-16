import fs from 'fs'

class Drive {
    async exists(filename: string){
        return fs.promises.stat(filename).then(() => true).catch(() => false)
    }
    
    async read(filename: string){
        return fs.promises.readFile(filename, 'utf8')
    }
    
    readSync(filename: string){
        return fs.readFileSync(filename, 'utf8')
    }
}

export default new Drive()