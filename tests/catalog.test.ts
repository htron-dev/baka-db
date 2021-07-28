import test from "japa";

import { createCatalogManger } from "../src/catalog-manager";

import validTypes from "../valid-types.json";
import validTags from "../valid-tags.json";

test.group("test markdown files", (group) => {
    let items: any[] = [];

    group.before(async () => {
        const manager = createCatalogManger();

        items = await manager.getItems();
    });

    test("should item type be valid", (assert) => {
        items.forEach((item) => {
            assert.equal(
                validTypes.includes(item.type),
                true,
                `Invalid type "${item.type}"`
            );
        });
    });

    test("should item tags be valid", (assert) => {
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
