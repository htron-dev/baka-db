import test from 'japa'
import moment from 'moment'
import path from 'path'

import { createCatalogManger } from '../catalog-manager'

import validTypes from '../valid-types.json'
import validTags from '../valid-tags.json'

test.group('Markdown en-US files content', (group) => {
    let items: any[] = []

    group.before(async () => {
        const manager = createCatalogManger()

        let changedFiles = process.argv.slice(2)

        if (!changedFiles.length) {
            changedFiles = await manager.getFilePaths({
                lang: 'en-US'
            })
        }

        const filePaths = changedFiles.filter((filename) => {
            const [lang] = path.basename(filename).split('_')
            return lang === 'en-US'
        })

        items = await manager.getItems(filePaths)
    })

    test('should items have title', (assert) => {
        items.forEach((item) => {
            assert.equal(
                item.title && item.title !== '',
                true,
                'Title is required'
            )
        })
    })

    test('should items start-date be valid if have one', (assert) => {
        items.forEach((item) => {
            if (!item.start_date) {
                return
            }

            assert.equal(
                moment(item.start_date).isValid(),
                true,
                `Invalid date "${item.start_date}"`
            )
        })
    })

    test('should items end-date be valid if have one', (assert) => {
        items.forEach((item) => {
            if (!item.end_date) {
                return
            }

            assert.equal(
                moment(item.end_date).isValid(),
                true,
                `Invalid date "${item.end_date}"`
            )
        })
    })

    test('should items type be valid', (assert) => {
        items.forEach((item) => {
            assert.equal(
                validTypes.includes(item.type),
                true,
                `Invalid type "${item.type}"`
            )
        })
    })

    test('should items tags be valid', (assert) => {
        items
            .map((item) => item.tags || [])
            .reduce((all, tags) => all.concat(tags), [])
            .forEach((tag: string) => {
                assert.equal(
                    validTags.includes(tag),
                    true,
                    `Invalid tag "${tag}"`
                )
            })
    })
})
