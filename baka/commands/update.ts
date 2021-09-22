import cheerio from 'cheerio'
import { ToolboxWithCatalog } from '@baka-db/cli'
import { mal } from '../toolbox/mal'
import * as fastq from 'fastq'
import { kebabCase } from 'lodash'

const command = {
    name: 'update',
    description: 'Script to update and manipulate database',
    run: async (toolbox: ToolboxWithCatalog) => {
        const { print, parameters, catalog, markdown } = toolbox

        const projectPattern = parameters.first
        const filePattern = parameters.second

        if (!projectPattern) {
            print.error('missing arguments')
            return
        }

        const items = catalog.findFilenames(filePattern || '*', projectPattern)

        const queue = fastq.promise(
            worker,
            Number(parameters.options.concurrency) || 1
        )

        items.forEach((item) => {
            queue
                .push(item)
                .catch((err) => {
                    print.error(`${err.message} | ${item}`)
                })
                .then(() => {
                    const remaining = items.length - queue.length()

                    const percentage = Math.ceil(
                        (remaining * 100) / items.length
                    )

                    print.info(
                        `updated ${remaining}/${items.length} | ${percentage}% | ${item}`
                    )
                })
        })

        async function worker(filename: string) {
            const item = await markdown.mountItem(filename)

            console.log(await item.toString())

            // const { link } = item.links[0]

            // const page = await mal.get(
            //     link,
            //     Number(parameters.options.interval) || 1
            // )

            // const $ = cheerio.load(page)

            // const image = $('#content img').first()

            // const src = image.attr('data-src')

            // if (!src) {
            //     return Promise.resolve()
            // }

            // item.thumbnail = {
            //     src,
            //     alt: kebabCase(item.title)
            // }

            // await item.save()
        }

        await new Promise((resolve) => {
            queue.empty = () => setTimeout(resolve, 1000)
        })

        print.success(`${items.length} items updated`)
    }
}

export default command
