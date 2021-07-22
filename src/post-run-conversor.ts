import fs from "fs";
import path from "path";
import { promisify } from "util";
import { convertFileToObject } from "./convert-to-object";

const catalogPath = path.resolve(__dirname, "..", "catalog");
const getCatalogPath = (...args: string[]) =>
    path.resolve(__dirname, "..", "catalog", ...args);

async function updateFolderFiles(name: string) {
    const folder = getCatalogPath(name);
    const files = await promisify(fs.readdir)(folder);

    await Promise.all(
        files
            .filter((file) => [".json", ".new"].includes(path.extname(file)))
            .map(async (file) => {
                const basename = path.extname(file);

                if (basename === ".json") {
                    await promisify(fs.rm)(getCatalogPath(name, file));
                }

                if (basename === ".new") {
                    await promisify(fs.rename)(
                        getCatalogPath(name, file),
                        getCatalogPath(name, file.replace(".json.new", ".json"))
                    );
                }
                // const jsonPath = `${folder}/${file.replace(/.md/, ".json")}`;

                // const content = await convertFileToObject(`${folder}/${file}`);

                // await promisify(fs.writeFile)(
                //     `${jsonPath}.new`,
                //     JSON.stringify(content, null, 2)
                // );
            })
    );
}

async function main() {
    const folders = await promisify(fs.readdir)(catalogPath);

    await Promise.all(folders.map(updateFolderFiles));
}

main().catch((err) => {
    console.error(err);
    process.exit(0);
});
