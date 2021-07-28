import path from 'path'
import fs from 'fs'
import { promisify } from 'util'

import { convertFileToObject } from './convert-to-object'

export function createCatalogManger() {
    const catalogPath = path.resolve(__dirname, '..', 'catalog')

    async function getFilePaths() {
        const projects = await promisify(fs.readdir)(catalogPath)

        const projectPaths = await Promise.all(
            projects.map(async (project) => {
                const files = await promisify(fs.readdir)(
                    path.resolve(catalogPath, project)
                )

                return files.map((f) => path.resolve(catalogPath, project, f))
            })
        )

        return projectPaths.reduce((all, p) => all.concat(p), [])
    }

    async function getItems() {
        const filesPaths = await getFilePaths()

        return await Promise.all(filesPaths.map(convertFileToObject))
    }

    return {
        getFilePaths,
        getItems
    }
}
