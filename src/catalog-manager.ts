import path from 'path'
import fs from 'fs'
import { promisify } from 'util'

import { convertFileToObject } from './convert-to-object'

export interface Filters {
    lang?: string
}

export function createCatalogManger() {
    const catalogPath = path.resolve(__dirname, '..', 'catalog')

    async function getFilePaths(filters?: Filters) {
        const projects = await promisify(fs.readdir)(catalogPath)

        const projectPaths = await Promise.all(
            projects.map(async (project) => {
                const files = await promisify(fs.readdir)(
                    path.resolve(catalogPath, project)
                )

                return files
                    .filter((f) => {
                        if (filters?.lang) {
                            const [lang] = f.split('_')
                            return lang === filters.lang
                        }
                        return true
                    })
                    .map((f) => path.resolve(catalogPath, project, f))
            })
        )

        return projectPaths.reduce((all, p) => all.concat(p), [])
    }

    async function getItems(filesPaths: string[]) {
        return await Promise.all(filesPaths.map(convertFileToObject))
    }

    return {
        getFilePaths,
        getItems
    }
}
