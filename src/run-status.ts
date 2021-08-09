import Logger from './logger'
import lodash from 'lodash'
import path from 'path'
import glob from 'glob'

async function main() {
    const args = process.argv.slice(2)

    const basePath = path.resolve(__dirname, '..', 'catalog')

    const filters: any = args.slice(1).reduce((result, arg) => {
        const [name, value] = arg.split('=')
        return {
            ...result,
            [name]: value
        }
    }, {})

    const projectPatter = args.reduce((result, arg, index) => {
        if (arg === '--project-patter') {
            return args[index + 1]
        }
        return result
    }, '*')

    const filePatter = args.reduce((result, arg, index) => {
        if (arg === '--file-patter') {
            return args[index + 1]
        }
        return result
    }, '*')

    const globPatter = `${basePath}/${projectPatter}/en-US_${filePatter}.md`

    const catalog = glob.sync(globPatter)

    const allItems = catalog.map((f) => ({
        file: f,
        project: path.basename(path.dirname(f))
    }))

    const projects = Object.entries(lodash.groupBy(allItems, 'project')).map(
        ([key, value]) => ({
            name: key,
            files: value,
            items: value.length
        })
    )

    const filteredResults = projects.filter((p) => {
        if (filters.minFiles && Number(filters.minFiles) > p.items) {
            return false
        }
        return true
    })

    if (!filters.list) {
        console.table([
            {
                patter: globPatter,
                quantity: filteredResults.length
            }
        ])
        return
    }

    filteredResults.sort((a, b) => a.items - b.items)

    if (filters.list === 'details') {
        console.table(allItems)
        return
    }

    console.table(filteredResults, ['name', 'items'])
}

main().catch(Logger.error)
