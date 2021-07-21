# Contributing Guide

Hi friend first of all thanks for the interest in help the project, in this page you will see how you to help the project to be better.

And theses are the things that you can do to help us:

-   Tell us about some anime/manga that you want us to add to the project
-   Tell us about some wrong information of an item
-   Add to catalog an anime, manga, ova, movie, etc...
-   Translate a file in the catalog

> **tip:** Fell free to use the discussions page of the project if you have any doubts.

## Requirements

A github account to create issues, forks and pull requests.

## How ask to add item or fix some wrong information

You can use the [issues page](https://github.com/htron-dev/baka-db/issues) for that, when you create the issue will have some templates that you can use to elaborate your issue.

## How add/edit an item

You can make a pull request adding a new file to the catalog

We have some rules in naming the files and the content format, but they are ve very simple rules
and we need to follow they to make sure that will not have any problems with the API and filesystem in the future:

**helper links:**

-   [editing-files-in-github](https://docs.github.com/en/github/managing-files-in-a-repository/managing-files-on-github/editing-files-in-another-users-repository)

### Folder naming rules:

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

### File naming rules:

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
+ en-US-yu-yu-hakusho.md # right

```

Sometimes you could have items with same names, in these case you can add the media type in the name or a number:

```
en-US-yu-yu-hakusho.tv-serie.md
en-US-yu-yu-hakusho.manga.md

en-US-yu-yu-hakusho.ova.md
en-US-yu-yu-hakusho.ova-2.md
```

### Template

Use the [template.md](./template.md) file to know the basic information that item needs

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
