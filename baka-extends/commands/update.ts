import { ToolboxWithCatalog } from '@baka-db/cli'

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

        const items = await catalog.findAll(filePattern || '*', projectPattern)

        await Promise.all(
            items.map(async (item) => {
                item.links = item.links.map(({ text, link }) => {
                    if (/<.*?>/.test(link)) {
                        link = link.slice(1, link.length - 1)

                        link = link.replace(/\(/g, '%28').replace(/\)/g, '%29')
                    }

                    return {
                        text,
                        link
                    }
                })

                await item.save()
            })
        )

        print.info(`${items.length} items updated`)
    }
}

export default command
