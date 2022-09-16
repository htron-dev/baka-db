import fg from 'fast-glob'
import path from 'path'
import drive from '../drive'


export default async function () {
    const catalogPath = path.resolve(__dirname, '..', '..', 'catalog')

    const flagArgs = process.argv.slice(3).filter(a => a.startsWith('--'))
    const [search] = process.argv.slice(3 + flagArgs.length)

    const flags = flagArgs
        .map(f => f.replace('--', '').split('='))
        .reduce<Record<string, string>>((all, [key, value]) => ({ ...all, [key]: value }), {})

    if (!search) throw new Error('missing arguments')

    console.time('Query time')

    const pattern = catalogPath + '/**/*.md'

    const results: any[] = []

    console.log('querying...')

    const entries = await fg(pattern)

    for (const entry of entries) {
        const content = drive.readSync(entry)
        const project = path.basename(path.dirname(entry))

        let valid = false
    
        if (content.search(search) !== -1) {
            valid = true
        }

        if (flags.project && flags.project !== project) {
            valid = false
        }

        if (valid) results.push({
            project,
            path: entry.replace(catalogPath, './catalog')
        })
    }

    results.forEach(r => {
        console.log(r.project, '|', r.path)
    })

    console.timeEnd('Query time')

}