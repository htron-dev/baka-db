<div align='center'>

# Baka-db

![logo-128](https://user-images.githubusercontent.com/43827016/128577846-fb2d59a9-4aae-4591-8b67-83c9bb95b53b.png)

Public anime/manga database

[summary](./summary/0.md)

</div>

## Introduction

Baka-db is an archive that contains data and information about animes, mangas, ova, movies, and other media related to otaku culture.

It was created to be a big and good source of data that anyone can use for any purpuse.

## Social medias

-   [twitter](https://twitter.com/baka_db)

## Catalog

All the content of database are in `catalog` folder, each folder represents a project that contents the medias that the project may have.

So for example if we have an anime called "Naruto" and a manga called "Naruto" both of they will go in project folder "naruto", and also if exist another season, ova, movie, special, or anything that is related to the project "naruto" it will also be is this folder.

Also you will notice that all files in the database have a prefix like `en-US` or `pt-BR`, this tell what is the language that the item is written, this is to have the same item in multiple languages.

Ex:

-   `en-US_naruto-tv-series.md`
-   `pt-BR_naruto-tv-series.md`

| Format                                                             | Description                                                                     |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| [Markdown](https://github.com/htron-dev/baka-db/tree/main/catalog) | Catalog files in markdown format, this is the default format                    |
| [JSON](https://github.com/htron-dev/baka-db/tree/json/catalog)     | Catalog files in .json format, it uses the markdown files as base to be created |

# Contributing

Check [CONTRIBUTING.md](./CONTRIBUTING.md) to know the details

# License

[MIT](LICENSE.md)
