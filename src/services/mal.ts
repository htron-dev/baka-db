import axios from 'axios'
import path from 'path'
import snakeCase from 'lodash/snakeCase'
import * as cheerio from 'cheerio';

import { drive } from '../drive'
import Entry from '../entities/entry'

const cacheFolder = path.resolve(__dirname, '..', '..', '.cache', 'http')

// make request to mal site
class MalService {
    public htmlToEntry(html: string){
        const $ = cheerio.load(html);

        const sections = new Map<string, string[]>()
        const data: any = {}
        let current: string

        data.title = $('h1').text()
        
        $('.leftside')
            .children()
            .each((i, child) => {
                if (child.tagName === 'h2') {
                    current = $(child).text().trim()
                    return
                }

                if (!current) return

                const section = sections.get(current) || []

                section.push($(child).text().trim())

                sections.set(current, section)
            })

        Array.from(sections.entries())
            .filter(([key]) => key === 'Information')
            .reduce<string[]>((all, [_, value]) => all.concat(value), [])
            .map(item => item.split(/:(.*)/s).filter(i => i !== ''))
            .forEach(([key, value]) => {
                key = snakeCase(key)

                if (['type', 'episodes'].includes(key)) {
                    data[key] = value ? value.trim().toLowerCase() : value
                }
                
                if (['rating'].includes(key)) {
                    data[key] = value ? value.trim() : value
                }
            })


        const item = new Entry(data)

        return item
    }

    public async get(url: string) {
        const filename = path.resolve(cacheFolder, snakeCase(url))

        let html = ''

        const exists = await drive.exists(filename)

        if (exists) {
            html = await drive.read(filename)
        }

        if (!exists) {
            const { data } = await axios.get(url)
    
            await drive.write(filename, data)

            html = data

        }

        return this.htmlToEntry(html)
    }
}

export const mal = new MalService()