import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

import Queue from 'bull'

import { convertFileToObject } from './convert-to-object'
import Logger from './logger'

async function convertProjectFilesToJson(project: string) {
    const projectFolder = path.resolve(__dirname, '..', 'catalog', project)

    let exist = true

    await promisify(fs.access)(projectFolder).catch(() => (exist = false))

    if (!exist) {
        Logger.error('project not found: %s', project)
        return
    }

    const files = await promisify(fs.readdir)(projectFolder)

    await Promise.all(
        files
            .filter((file) => path.extname(file) === '.md')
            .map(async (file) => {
                const jsonPath = path.resolve(
                    path.resolve(__dirname, '..', 'dist', 'catalog', project),
                    file.replace(/.md/, '.json')
                )

                const content = await convertFileToObject(
                    path.resolve(projectFolder, file)
                )

                await promisify(fs.mkdir)(path.dirname(jsonPath), {
                    recursive: true
                })

                await promisify(fs.writeFile)(
                    jsonPath,
                    JSON.stringify(content, null, 4)
                )

                Logger.debug('conversor-json: file converted %s', file)

                await new Promise((resolve) => setTimeout(resolve, 1000))
            })
    )
}

async function main() {
    await promisify(fs.mkdir)(
        path.resolve(__dirname, '..', 'dist', 'catalog'),
        { recursive: true }
    )

    return new Promise((resolve) => {
        const queue = new Queue('conversor')

        process.argv
            .slice(2)
            .map((f) => {
                if (!f.includes('catalog/')) {
                    return f
                }

                const [, project] = f.split('/')
                return project
            })
            .filter((p, index, array) => array.indexOf(p) === index)
            .forEach((project) => queue.add({ project }))

        queue.process(async (job, done) => {
            const { project } = job.data

            await convertProjectFilesToJson(project)

            done()
        })

        queue.on('drained', resolve)
    })
}

main()
    .then(() => {
        Logger.info('conversor-json: conversion finished')
        process.exit(0)
    })
    .catch((err) => {
        Logger.error(err)
        process.exit(1)
    })
