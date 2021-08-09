import Logger from './logger'
import fs from 'fs'
import { promisify } from 'util'
import path from 'path'

async function main() {
    const args = process.argv.slice(2)

    const regex = new RegExp(args[0])
    const basePath = path.resolve(__dirname, '..', 'catalog')

    const filters: any = args.slice(1).reduce((result, arg) => {
        const [name, value] = arg.split('=')
        return {
            ...result,
            [name]: value
        }
    }, {})

    const catalog = await promisify(fs.readdir)(basePath)

    const results = await Promise.all(
        catalog
            .filter((f) => regex.test(f))
            .map(async (project) => {
                const files = await promisify(fs.readdir)(
                    path.resolve(basePath, project)
                )

                return {
                    name: project,
                    path: path.resolve(basePath, project),
                    filesCount: files.length
                }
            })
    )

    const filteredResults = results.filter((p) => {
        if (filters.minFiles && Number(filters.minFiles) > p.filesCount) {
            return false
        }
        return true
    })

    filteredResults.sort((a, b) => a.filesCount - b.filesCount)

    console.table(
        filteredResults,
        filters.columns ? filters.columns.split(',') : undefined
    )
}

main().catch(Logger.error)
