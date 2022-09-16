import status from './commands/status';
import search from './commands/search'
import show from './commands/show'


async function main(){
    const all: Record<string, () => Promise<any>> = {
        status,
        search,
        show
    }

    const [name] = process.argv.slice(2)
    const command = all[name]

    if (!command) {
        throw new Error(`command not found: ${name}`)
    }

    await command()
}

main().catch(err => console.error(err))