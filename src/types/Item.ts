import { Institution } from "./Institution"

export type Item = {
    id: string,
    article: string,
    name: string,
    institution: Institution,
    imageId: string | null
}