import fs from 'fs'
import path from 'path'
import { promisify } from 'util'
import glob from 'glob'

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

    return new Promise<number>((resolve, reject) => {
        try {
            const host = process.env.REDIS_HOST || '127.0.0.1'
            const port = Number(process.env.REDIS_PORT) || 6379

            const queue = new Queue('conversor', {
                redis: { host, port }
            })

            queue.empty()
            queue.clean(0)

            const args = process.argv.slice(2)

            let filenames = []

            if (args[0] === '--patter') {
                filenames = glob.sync(`catalog/${args[1]}`)
            } else {
                filenames = args
            }

            const projects = filenames
                .filter((f) => f.includes('catalog'))
                .map((f) =>
                    f.includes('.md')
                        ? path.basename(path.dirname(f))
                        : path.basename(f)
                )

            projects.forEach((project, index) => queue.add({ project, index }))

            queue.process(async (job, done) => {
                const { project, index } = job.data

                await convertProjectFilesToJson(project)

                Logger.info(
                    'conversor(%i/%i): %s project converted',
                    index + 1,
                    projects.length,
                    project
                )

                done()
            })

            if (!projects.length) {
                resolve(projects.length)
            }

            queue.on('drained', () => resolve(projects.length))
        } catch (error) {
            reject(error)
        }
    })
}

main()
    .then((length) => {
        Logger.info('conversor-json: conversion finished for %i', length)
        process.exit(0)
    })
    .catch((err) => {
        Logger.error(err)
        process.exit(1)
    })
