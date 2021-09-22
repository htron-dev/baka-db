import axios from 'axios'
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { kebabCase } from 'lodash'

const cacheDir = resolve(__dirname, '..', '..', '.cache')

let lastStart = Date.now()

export async function get(url: string, interval = 500) {
    const filename = resolve(cacheDir, 'mal', `${kebabCase(url)}.html`)

    if (existsSync(filename)) {
        return readFileSync(filename, 'utf-8')
    }

    await new Promise<void>((resolve) => {
        let delay = Date.now() + interval - lastStart

        if (delay < 0 && lastStart > Date.now()) {
            delay *= -1
        }

        setTimeout(resolve, Math.max(500, delay))
    })

    try {
        const { data } = await axios.get(encodeURI(url))

        mkdirSync(dirname(filename), { recursive: true })

        writeFileSync(filename, data)

        lastStart = Date.now()

        return data
    } catch (error) {
        lastStart = Date.now() + 60000 * 6
        throw new Error('request failed starting timeout...')
    }
}

export const mal = {
    get
}
