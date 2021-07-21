import fs from "fs";
import { promisify } from "util";
import lodash from "lodash";

const textBlocks = ["sinopse"];

const objectsBlocks = ["information"];

const listBlocks = ["studios", "links", "genres", "alternative_names"];

function getText(content: string[]) {
    return content.join("\n").replace(/^\s+|\s+$/g, "");
}

function getObject(content: string[]) {
    return content
        .filter((c) => c !== "")
        .reduce((all, item) => {
            const [key, value] = item.split(":");

            return {
                ...all,
                [lodash.snakeCase(key)]: getText([value]),
            };
        }, {});
}

function getList(content: string[]) {
    return content
        .filter((c) => c !== "")
        .map((item) => {
            // check if is a markdown link
            if (/\(.*?\)/.test(item) && /\[.*?\]/.test(item)) {
                return {
                    text: lodash.get(item.match(/\[(.*?)\]/), "[1]", null),
                    link: lodash.get(item.match(/\((.*?)\)/), "[1]", null),
                };
            }

            return item.replace(/- +/, "");
        });
}

export async function convertFileToObject(path: string) {
    const file = await promisify(fs.readFile)(path, "utf-8");

    const blocs: any[] = [];

    let currentIndex = -1;

    file.split("\n").forEach((line) => {
        if (line.charAt(0) === "#") {
            currentIndex++;
            blocs[currentIndex] = {
                name: line.replace(/#+ /g, ""),
                content: [],
            };
            return;
        }

        blocs[currentIndex].content.push(line);
    });

    return blocs.reduce((result, { name, content }, index) => {
        const value: any = {};
        const key = lodash.snakeCase(name);

        if (index === 0) {
            value.title = name;
            value.description = getText(content);
        }

        if (listBlocks.includes(key)) {
            value[key] = getList(content);
        }

        if (objectsBlocks.includes(key)) {
            value[key] = getObject(content);
        }

        if (textBlocks.includes(key)) {
            value[key] = getText(content);
        }

        return {
            ...result,
            ...value,
        };
    }, {});
}
