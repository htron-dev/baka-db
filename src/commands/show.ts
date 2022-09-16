import path from 'path'
import Entry from '../entities/entry'

export default async function () {
    const [filename] = process.argv.slice(3)

    if (!filename) throw new Error('missing filename')

    console.time('Query time')

    const item = await Entry.fromFile(path.resolve(process.cwd(), filename))

    console.log(item)

    console.timeEnd('Query time')

}