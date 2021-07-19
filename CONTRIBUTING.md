# Contributing Guide

Hi friend first of all thanks for the interest in help the project, in this page you will see how to help the project with some tutoriais, but also fell free to use the discussions page of the project if you have any doubts.

Theses are the things that you can do to help the project:

-   Tell us about some anime/manga that you want us to add to the project
-   Tell us about some wrong information of an item
-   Pull request to add a new item to the project
-   Pull request to fix wrong information in the files
-   Pull request with translation of an item

## Requirements

A github account to create issues, forks and pull requests.

## How ask to add item or fix some wrong information

You can use the [issues page](https://github.com/htron-dev/baka-db/issues) for that, when you create the issue will have some templates that you can use to elaborate your issue.

## How to add a new item

To add a new item you need create a new folder with the name of the item in the animes or manga folder

Create the default files that are `index.json`, `metas.json` and `sinopse.md`.

And make pull request to the item be added in the project.

The folder name must follow this rules to make sure that will not have any problems with the API and filesystem:

-   Use the original japanese name
-   No kanji
-   Must be in kebab-case format
-   No special characters

Examples:

```diff
- 幽☆遊☆白書 # wrong
+ yu-yu-hakusho # right

- attack-on-titan # wrong
+ shingeki-no-kyojin # right

- shingeki no kyojin # wrong
+ shingeki-no-kyojin # right

- the-idolm@ster # wrong
+ the-idolmaster # right
```

### `index.json`

This file contain information that do not need to be translated to others languages like release date, number of episodes/chapters, studios, etc...

Example file:

```json
{
    "episodes": 112, // in mangas will be chapters
    "originalName": "幽☆遊☆白書",
    "release": {
        "start": "1992-08-10",
        "end": "1995-07-01"
    },
    "studios": [
        {
            "name": "Pierrot",
            "link": "https://en.pierrot.jp/"
        }
    ],
    "sites": [
        {
            "name": "My anime list",
            "link": "https://myanimelist.net/anime/392/Yuu%E2%98%86Yuu%E2%98%86Hakusho"
        },
        {
            "name": "Anime db",
            "link": "https://anidb.net/perl-bin/animedb.pl?show=anime&aid=312"
        },
        {
            "name": "Wikipedia",
            "link": "https://wikipedia.org/wiki/YuYu_Hakusho"
        }
    ]
}
```

### `metas.json`

This file contain some metadata about the item that can be translated to other languages like local name of anime, genders, etc

Example file:

```json
{
    "name": "Yu Yu Hakusho",
    "alternativeNames": [
        "Yu Yu Hakusho: Ghost Files",
        "Ghost Fighter",
        "Poltergeist Report",
        "YuYu Hakusho"
    ],
    "Genres": [
        "shonen",
        "action",
        "comedy",
        "demons",
        "supernatural",
        "martial-arts"
    ]
}
```

### `sinopse.md`

This file will simple contain the sinopse of the item and can be translated too.

## Translation

The metas.json and sinopse.md are the files of an item that can be translated to other languages.

The index.json file is an exception because it will contain information that do not change between languages like release date and studio.

### How translate a item

Each item will have some default files that are `metas.json` and `sinopse.md` and they are in en-US, you can use they as a base for your translation.

So Let's take a example to translate a metas.json.

-   **Step 1**: Choose an item and go to it's folder

-   **Step 2**: Click in add a new file, and the name will be also metas.json but with a prefix telling what language the file is it.  
    Ex: `pt-BR_metas.json`

-   **Step 3**: Now in the new file you can copy the content of the original metas.json and replace the texts in the file for translated ones

-   **Step 4**: When finished your translation you can commit and send a pull request to the main repository to be reviewed and latter be merged in the main project.

## Commit Specification

Commit messages should follow the [commit message convention](https://www.conventionalcommits.org).
Examples:

-   add a new anime:

```
feat(anime): add yu yu hakusho
```

-   add a new manga:

```
feat(manga): add yu yu hakusho
```

-   fix some a wrong data:

```
fix(anime): fix yu yu hakusho wrong original name kanji
```

-   update or improve something:

```
refactor(anime): improve yu yu hakusho pt-BR sinopse
```
