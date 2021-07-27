import fs from "fs";
import path from "path";
import { promisify } from "util";
import { convertFileToObject } from "./convert-to-object";
import Logger from "./logger";

async function convertProjectFilesToJson(project: string) {
    const projectFolder = path.resolve(__dirname, "..", "catalog", project);

    await promisify(fs.mkdir)(
        path.resolve(__dirname, "..", "dist", "catalog", project),
        {
            recursive: true,
        }
    );

    const exist = await promisify(fs.exists)(projectFolder);

    if (!exist) {
        Logger.error("project not found: %s", project);
        return;
    }

    const files = await promisify(fs.readdir)(projectFolder);

    await Promise.all(
        files
            .filter((file) => path.extname(file) === ".md")
            .map(async (file) => {
                const jsonPath = path.resolve(
                    path.resolve(__dirname, "..", "dist", "catalog", project),
                    file.replace(/.md/, ".json")
                );

                const content = await convertFileToObject(
                    path.resolve(projectFolder, file)
                );

                await promisify(fs.mkdir)(path.dirname(jsonPath), {
                    recursive: true,
                });

                await promisify(fs.writeFile)(
                    jsonPath,
                    JSON.stringify(content, null, 4)
                );

                Logger.debug("conversor-json: file converted %s", file);
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
