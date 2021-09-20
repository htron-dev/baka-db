import test from 'japa'
import moment from 'moment'
import path from 'path'
import { createMarkdown, createCatalog } from '@baka-db/cli'

import validTypes from '../valid-types.json'
import validTags from '../valid-tags.json'

const catalog = createCatalog(path.resolve(__dirname, '..', '..', 'catalog'))
const markdown = createMarkdown()

const args = process.argv.slice(2)

let filenames: string[] = []

if (args[0] === '--pattern') {
    filenames = catalog.findFilenames('*', args[1])
} else {
    filenames = args
}

function isValidHttpUrl(string: string) {
    let url

    try {
        url = new URL(string)
    } catch (_) {
        return false
    }

    return url.protocol === 'http:' || url.protocol === 'https:'
}

filenames
    .filter((f) => f.includes('catalog'))
    .forEach((filename, index, array) => {
        test.group(
            `test content(${index + 1}/${array.length}): ${filename}`,
            () => {
                const item = markdown.fileToObject(filename)

                test('should items have title', (assert) => {
                    assert.equal(
                        item.title && item.title !== '',
                        true,
                        'Title is required'
                    )
                })

                test('should items start-date be valid if have one', (assert) => {
                    if (!item.start_date) {
                        return
                    }

                    assert.equal(
                        moment(item.start_date).isValid(),
                        true,
                        `Invalid date "${item.start_date}"`
                    )
                })

                test('should items end-date be valid if have one', (assert) => {
                    if (!item.end_date) {
                        return
                    }

                    assert.equal(
                        moment(item.end_date).isValid(),
                        true,
                        `Invalid date "${item.end_date}"`
                    )
                })

                test('should items type be valid', (assert) => {
                    assert.equal(
                        validTypes.includes(item.type),
                        true,
                        `Invalid type "${item.type}"`
                    )
                })

                test('should items tags be valid', (assert) => {
                    item.tags.forEach((tag: string) => {
                        assert.equal(
                            validTags.includes(tag),
                            true,
                            `Invalid tag "${tag}"`
                        )
                    })
                })

                test('should items links be valid', (assert) => {
                    item.links.forEach((link: any) => {
                        assert.equal(
                            typeof link === 'object',
                            true,
                            `Invalid link "${link}"`
                        )

                        assert.equal(
                            isValidHttpUrl(link.link),
                            true,
                            `Invalid link "${link.link}"`
                        )
                    })
                })
            }
        )
    })
