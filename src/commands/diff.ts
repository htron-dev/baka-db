import path from 'path'
import Entry from '../entities/entry'
import { mal } from '../services/mal'
import isEqual from 'lodash/isEqual'

export default async function () {
    const [source, filename] = process.argv.slice(3)

    if (!filename) throw new Error('missing filename')
    
    if (!source) throw new Error('invalid source must be: mal')

    console.time('Query time')

    const item = await Entry.fromFile(path.resolve(process.cwd(), filename))

    const malLink = item.links.find(l => l.text === 'My Anime list')

    if (!malLink) throw new Error('Mal link not found')
    
    const malItem = await mal.get(malLink.link)

    Object.keys(item)
        .forEach((key) => {
            let currentValue = item[key as keyof Entry]
            let malValue = malItem[key as keyof Entry]        

            if (Array.isArray(currentValue)) {
                currentValue = JSON.stringify(currentValue)
            }
        
            if (Array.isArray(malValue)) {
                malValue = JSON.stringify(malValue)
            }

            if (isEqual(malValue, currentValue)) return

            if (currentValue && currentValue.length > 100) {
                currentValue = currentValue.slice(0, 100) + '...'
            }
            
            if (malValue && malValue.length > 100) {
                malValue = malValue.slice(0, 100) + '...'
            }

            console.log(key)
            console.log('\x1b[32m', '+', malValue, '\x1b[0m')
            console.log('\x1b[31m', '-', currentValue, '\x1b[0m')
        })

    console.timeEnd('Query time')

}