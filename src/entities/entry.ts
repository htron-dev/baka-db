
import Drive from '../drive'
import MarkdownIt  from 'markdown-it'
import snakeCase from 'lodash/snakeCase'
import get from 'lodash/get'

const md = new MarkdownIt()

interface Link {
    text: string
    link: string
}

export default class Entry {
    public title: string
    public links: Link[] = []

    constructor(props: Entry){
        Object.assign(this, props)
    }

    public static async fromFile(filename: string) {
        const text = await Drive.read(filename)

        const tokens = md.parse(text.trim(), {})
        const sections = new Map<string, any[]>()
        let current = 'main'
    
        const item: any = { }

        tokens.forEach((token, index) => {
            if (token.tag === 'h2' && token.type.includes('heading_open')) {
                current = tokens[index + 1].content
            }

            if (token.content === '' || token.content === current) return

            const section = sections.get(current) || []
            let content: any = token.content

            if (current === 'Links') {
                content = {
                    link: get(token, 'children[0].attrs[0][1]', ''),
                    text: get(token, 'children[1].content', ''),
                }
            }

            section.push(content)

            sections.set(current, section)
        
        })

        const main = sections.get('main') || []

        item.title = main[0]

        main
            .slice(2)
            .map(t => t.replace(/\*\*/g, ''))
            .map(t => t.split(/:/))
            .forEach(([key, value]) => {
                item[snakeCase(key)] = value.trim()
            })

        Array.from(sections.entries())
            .filter(e => e[0] !== 'main')
            .forEach(([name, content]) => {
                name = snakeCase(name)
                
                if (name === 'sinopse') {
                    content = content[0]
                }

                item[name] = content
            })

        return new Entry(item)
    }
}