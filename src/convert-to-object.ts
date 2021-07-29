import fs from 'fs'
import { promisify } from 'util'
import lodash from 'lodash'
import Logger from './logger'

const textBlocks = ['sinopse']

const objectsBlocks: string[] = []

const listBlocks = ['studios', 'links', 'tags', 'alternative_names', 'authors']

function getText(content: string[]) {
    return content.join('\n').replace(/^\s+|\s+$/g, '')
}

function getObject(content: string[]) {
    return content
        .filter((c) => c !== '')
        .reduce((all, item) => {
            const [key, value] = item.split(':')

            return {
                ...all,
                [lodash.snakeCase(key)]: getText([value])
            }
        }, {})
}

function getList(content: string[]) {
    return content
        .filter((c) => c !== '')
        .map((item) => {
            // check if is a markdown link
            if (/\(.*?\)/.test(item) && /\[.*?\]/.test(item)) {
                return {
                    text: lodash.get(item.match(/\[(.*?)\]/), '[1]', null),
                    link: lodash.get(item.match(/\((.*?)\)/), '[1]', null)
                }
            }

            return item.replace(/- +/, '')
        })
}

export async function convertFileToObject(path: string) {
    Logger.debug('converting file to object: %s', path)

    const file = await promisify(fs.readFile)(path, 'utf-8')

    const blocs: any[] = []

    let currentIndex = -1

    file.split('\n').forEach((line) => {
        if (line.charAt(0) === '#') {
            currentIndex++
            blocs[currentIndex] = {
                name: line.replace(/#+ /g, ''),
                content: []
            }
            return
        }

        if (!blocs[currentIndex]) {
            blocs[currentIndex] = {
                name: '',
                content: []
            }
        }

        blocs[currentIndex].content.push(line)
    })

    return blocs.reduce((result, { name, content }, index) => {
        const value: any = {}
        const key = lodash.snakeCase(name)

        if (index === 0) {
            value.title = name
            Object.assign(value, getObject(content))
        }

        if (listBlocks.includes(key)) {
            value[key] = getList(content)
        }

        if (objectsBlocks.includes(key)) {
            value[key] = getObject(content)
        }

        if (textBlocks.includes(key)) {
            value[key] = getText(content)
        }

        return {
            ...result,
            ...value
        }
    }, {})
}
