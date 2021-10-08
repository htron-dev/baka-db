import { readFileSync } from 'fs'
import { resolve } from 'path'
import { kebabCase } from 'lodash'

import { Config, Schema } from '@baka-db/cli'

const schema: Record<string, Schema> = {
    title: {
        type: 'string',
        lineTest: (line) => /^# .*$/.test(line),
        format: (line) => line.replace(/#+ /g, '')
    },
    thumbnail: {
        type: 'image',
        lineTest: (line) => /!\[.*?\]/.test(line) && /\(.*?\)/.test(line)
    },
    authors: {
        type: 'array',
        itemType: 'string',
        lineTest: (line) => line === '## Authors',
        lineEndTest: (line) => line.includes('##')
    },
    links: {
        type: 'array',
        itemType: 'link',
        lineTest: (line) => line === '## Links',
        lineEndTest: (line) => line.includes('##')
    },
    tags: {
        type: 'array',
        lineTest: (line) => line === '## Tags',
        lineEndTest: (line) => line.includes('##')
    },
    sinopse: {
        type: 'text',
        lineTest: (line) => line === '## Sinopse',
        lineEndTest: (line) => line.includes('##')
    }
}

const properties = [
    'type',
    'episodes',
    'volumes',
    'chapters',
    'original_name',
    'start_date',
    'end_date',
    'opening_song',
    'ending_song',
    'rating'
]

properties.forEach((p) => {
    schema[p] = {
        type: 'string',
        lineTest: (line) => line.includes(`**${kebabCase(p)}**:`),
        format: (line) => line.replace(`-   **${kebabCase(p)}**:`, '').trim()
    }
})

const config: Config = {
    path: resolve(__dirname, '..', 'catalog'),
    files: [
        {
            pattern: '.*',
            template: readFileSync(
                resolve(__dirname, 'templates', 'item.edge'),
                'utf-8'
            ),
            schema
        }
    ]
}

export default config
