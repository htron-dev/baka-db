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

                console.log(file, basename);

                if (basename === ".json") {
                    return await promisify(fs.unlink)(
                        getCatalogPath(name, file)
                    );
                }

                if (basename === ".new") {
                    return await promisify(fs.rename)(
                        getCatalogPath(name, file),
                        getCatalogPath(name, file.replace(".json.new", ".json"))
                    );
                }
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
