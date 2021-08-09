import test from 'japa'
import moment from 'moment'
import glob from 'glob'

import { createCatalogManger } from '../catalog-manager'

import validTypes from '../valid-types.json'
import validTags from '../valid-tags.json'

const args = process.argv.slice(2)

let filenames: string[] = []
const manager = createCatalogManger()

if (args[0] === '--regex') {
    filenames = glob.sync(args[1])
} else {
    filenames = args
}

filenames
    .filter((f) => f.includes('catalog'))
    .forEach((filename, index, array) => {
        test.group(
            `test content(${index + 1}/${array.length}): ${filename}`,
            (group) => {
                let item: any

                group.before(async () => {
                    item = await manager.getItem(filename)
                })

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
            }
        )
    })
