import fs from "fs";
import path from "path";
import { promisify } from "util";
import { convertFileToObject } from "./convert-to-object";

const catalogPath = path.resolve(__dirname, "..", "catalog");

async function convertItemFilesToObjects(name: string) {
    const folder = `${catalogPath}/${name}`;
    const files = await promisify(fs.readdir)(folder);

    await Promise.all(
        files
            .filter((file) => path.extname(file) === ".md")
            .map(async (file) => {
                const jsonPath = `${folder}/${file.replace(/.md/, ".json")}`;

                const content = await convertFileToObject(`${folder}/${file}`);

                await promisify(fs.writeFile)(
                    `${jsonPath}.new`,
                    JSON.stringify(content, null, 2)
                );
            })
    );
}

async function main() {
    const folders = await promisify(fs.readdir)(catalogPath);

    await Promise.all(folders.map(convertItemFilesToObjects));
}

main().catch((err) => {
    console.error(err);
    process.exit(0);
});
