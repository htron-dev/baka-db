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
-   The name must tell what media it is
-   No special characters
-   Need to be a markdown file `.md`

Examples:

```diff
- tv-serie.md # wrong
+ en-US_tv-serie.md # right

- en-US_anime-1.md # wrong
+ en-US-tv-serie.md # right

- en-US_ov@.md # wrong
+ en-US-ova.md # right

- en-US_tv-serie.txt # wrong
+ en-US-tv-serie.md # right

```

Sometimes you will have more items of same media in theses case you can just add a number in the end of filename like in the examples bellow:

```
en-US_tv-serie.md
en-US_tv-serie-2.md
en-US_tv-serie-3.md

en-US_movie.md
en-US_movie-2.md

en-US_ova.md
en-US_ova-2.md
```

### This is the content template to create the item:

```md
# Name of item

Some optional short description...

## Information

-   **type**: tv-serie | manga | light-novel | ova
-   **episodes**:
-   **original-name**:
-   **start-date**: 1992-08-10
-   **end-date**: 1995-07-01

## Alternative names

-   item-1
-   item-2
-   item-3

## Studios

-   [item-1](url)
-   [item-2](url)
-   [item-3](url)

## Genres

-   item-1
-   item-2
-   item-3

## Links

-   [link-1](url)
-   [link-2](url)
-   [link-3](url)

## Sinopse

The sinopse of item...
```

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
