import { ToolboxWithCatalog } from '@baka-db/cli'
import * as fastq from 'fastq'

const command = {
    name: 'update',
    description: 'Script to update and manipulate database',
    run: async (toolbox: ToolboxWithCatalog) => {
        const { print, parameters, catalog } = toolbox

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
            // code to run with worker
        }

        await new Promise((resolve) => {
            queue.empty = () => setTimeout(resolve, 1000)
        })

        print.success(`${items.length} items updated`)
    }
}

export default command
