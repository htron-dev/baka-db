import axios from 'axios'
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { kebabCase } from 'lodash'

const cacheDir = resolve(__dirname, '..', '..', '.cache')

export async function get(url: string) {
    const filename = resolve(cacheDir, 'mal', `${kebabCase(url)}.html`)

    if (existsSync(filename)) {
        return readFileSync(filename, 'utf-8')
    }

    const { data } = await axios.get(encodeURI(url))

    mkdirSync(dirname(filename), { recursive: true })

    writeFileSync(filename, data)

    await new Promise((resolve) => setTimeout(resolve, 1.5 * 1000))

    return data
}

export const mal = {
    get
}
