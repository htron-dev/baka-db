import '@baka-db/cli'

interface Link {
    text: string
    link: string
}

interface Thumbnail {
    src: string
    alt: string
}

declare module '@baka-db/cli' {
    export interface CatalogItem {
        title: string
        thumbnail?: Thumbnail
        type: string
        links: Link[]
    }
}
