# Contributing Guide

Thanks for the interest in help the project XD, these are some ways to help improve the project

-   [Issues](#issues)
-   [Pull request](#pull-request)

## Issues

You can open an [issue](https://github.com/htron-dev/baka-db/issues) to ask for anything related to the project like:

-   A new feature
-   Add a missing item in catalog
-   Fix some wrong information

## Pull request

You can fix, update or add a new content in the catalog using a [pull request](https://github.com/htron-dev/baka-db/pulls).

For that you can do this in github site or cloning the repository and edit the files locally.

You can use this [template.md](./template.md) to help you with the creation of items.

The requirements to a pull request be accepted are very simple:

-   Pass in all pipelines tests (this is made automatically when you open the PR)
-   No r-18 content
-   Be reviewed by a maintainer

### Project name convention

-   Use the original japanese name but with normal alphabetic
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

#### Exceptions

In some cases can exist projects with same names of other, in theses cases you can add the year or "by author" in the end of name to be able to create the folder

Examples:

```
yu-yu-hakusho_1990 # year

yu-yu-hakusho_by-togashi # by author

yu-yu-hakusho_1990_by-togashi # year and by author
```

### Filename convention

-   Must have prefix with the code language of the file
-   No special characters
-   Need to be a markdown file `.md`

Examples:

```diff
- yu-yu-hakusho.md # wrong
+ en-US_yu-yu-hakusho.md # right

- en-US_.hack//sign.md # wrong
+ en-US_hack-sign.md # right

- en-US_yu-yu-hakusho.txt # wrong
+ en-US_yu-yu-hakusho.md # right

```

#### Exceptions

Sometimes you could have items with same names, in these case you can add the media type in the name or a number:

```
en-US_yu-yu-hakusho-tv-serie.md
en-US_yu-yu-hakusho-manga.md

en-US_yu-yu-hakusho-ova.md
en-US_yu-yu-hakusho-ova-2.md
```

## Commit Specification

Commit messages should follow the [conventional commits pattern](https://www.conventionalcommits.org).

Examples:

-   add a new anime:

```
feat(catalog): add yu yu hakusho
```

-   add a new manga:

```
feat(catalog): add yu yu hakusho
```

-   fix some a wrong data:

```
fix(catalog): fix yu yu hakusho wrong original name kanji
```

-   update or improve something:

```
refactor(catalog): improve yu yu hakusho pt-BR sinopse
```
