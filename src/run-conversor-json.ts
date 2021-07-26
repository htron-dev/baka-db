import fs from "fs";
import path from "path";
import { promisify } from "util";
import { convertFileToObject } from "./convert-to-object";
import Logger from "./logger";

async function convertProjectFilesToJson(project: string) {
    const folder = path.resolve(__dirname, "..", "catalog", project);
    const exist = await promisify(fs.exists)(folder);

    if (!exist) {
        Logger.error("project not found: %s", project);
        return;
    }

    const files = await promisify(fs.readdir)(folder);

    await Promise.all(
        files
            .filter((file) => path.extname(file) === ".md")
            .map(async (file) => {
                const jsonPath = path.resolve(
                    folder,
                    file.replace(/.md/, ".json")
                );

                const content = await convertFileToObject(
                    path.resolve(folder, file)
                );

                await promisify(fs.writeFile)(
                    `${jsonPath}.new`,
                    JSON.stringify(content, null, 4)
                );

                Logger.debug("file converted: %s", file);
            })
    );
}

async function main() {
    const projects = process.argv.slice(2);

    await Promise.all(projects.map(convertProjectFilesToJson));
}

main()
    .then(() => Logger.info("conversor-json: conversion finished"))
    .catch((err) => {
        Logger.error(err);
        process.exit(1);
    });
