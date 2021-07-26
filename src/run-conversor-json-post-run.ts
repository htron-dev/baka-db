import fs from "fs";
import path from "path";
import { promisify } from "util";
import Logger from "./logger";

const getCatalogPath = (...args: string[]) =>
    path.resolve(__dirname, "..", "catalog", ...args);

async function renameAndRemoveOldProjectFiles(project: string) {
    const folder = path.resolve(__dirname, "..", "catalog", project);
    const exist = await promisify(fs.exists)(folder);

    if (!exist) {
        Logger.error("project not found: %s", project);
        return;
    }

    const files = await promisify(fs.readdir)(folder);

    const oldFiles = files.filter((f) => path.extname(f) === ".json");
    const newFiles = files.filter((f) => path.extname(f) === ".new");

    await Promise.all(
        oldFiles.map(async (filename) => {
            await promisify(fs.unlink)(getCatalogPath(project, filename));
            Logger.debug("old file removed: %s", filename);
        })
    );

    await Promise.all(
        newFiles.map(async (filename) => {
            await promisify(fs.rename)(
                getCatalogPath(project, filename),
                getCatalogPath(project, filename.replace(".json.new", ".json"))
            );
            Logger.debug("file renamed: %s", filename);
        })
    );
}

async function main() {
    const projects = process.argv.slice(2);

    await Promise.all(projects.map(renameAndRemoveOldProjectFiles));
}

main()
    .then(() => Logger.info("post-conversor-json: files updated"))
    .catch((err) => {
        Logger.error(err);
        process.exit(1);
    });
