import fg from 'fast-glob'
import path from 'path'


export default async function () {
    const catalogPath = path.resolve(__dirname, '..', '..', 'catalog')

    console.time('Query time')

    const pattern = catalogPath + '/**/*.md'

    const entries = await fg(pattern)
    
    const projects = entries
        .map(e => path.dirname(e))
        .filter((p, index, array) => array.indexOf(p) === index)

    
    console.log('Projects quantity:', projects.length)
    console.log('Entries quantity:', entries.length)    
    console.timeEnd('Query time')

}