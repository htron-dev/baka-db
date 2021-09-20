import '@baka-db/cli'

interface Link {
    text: string
    link: string
}

declare module '@baka-db/cli' {
    export interface CatalogItem {
        title: string
        type: string
        links: Link[]
    }
}
