import test from "japa";
import moment from "moment";

import { createCatalogManger } from "../src/catalog-manager";

import validTypes from "../valid-types.json";
import validTags from "../valid-tags.json";

test.group("test markdown files", (group) => {
    let items: any[] = [];

    group.before(async () => {
        const manager = createCatalogManger();
        // TODO: get only en_US files
        items = await manager.getItems();
    });

    test("should items have title", (assert) => {
        items.forEach((item) => {
            assert.equal(
                item.title && item.title !== "",
                true,
                `Title is required`
            );
        });
    });

    test("should items start-date be valid if have one", (assert) => {
        items.forEach((item) => {
            if (!item.start_date) {
                return;
            }

            assert.equal(
                moment(item.start_date).isValid(),
                true,
                `Invalid date "${item.start_date}"`
            );
        });
    });

    test("should items end-date be valid if have one", (assert) => {
        items.forEach((item) => {
            if (!item.end_date) {
                return;
            }

            assert.equal(
                moment(item.end_date).isValid(),
                true,
                `Invalid date "${item.end_date}"`
            );
        });
    });

    test("should items type be valid", (assert) => {
        items.forEach((item) => {
            assert.equal(
                validTypes.includes(item.type),
                true,
                `Invalid type "${item.type}"`
            );
        });
    });

    test("should items tags be valid", (assert) => {
        items
            .map((item) => item.tags || [])
            .reduce((all, tags) => all.concat(tags), [])
            .forEach((tag: string) => {
                assert.equal(
                    validTags.includes(tag),
                    true,
                    `Invalid tag "${tag}"`
                );
            });
    });
});
