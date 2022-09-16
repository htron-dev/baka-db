import status from './commands/status';


async function main(){
    const all: Record<string, () => Promise<any>> = {
        status
    }

    const [command] = process.argv.slice(2)

    if (all[command]) {
        await all[command]()
    }
}

main().catch(err => console.error(err))