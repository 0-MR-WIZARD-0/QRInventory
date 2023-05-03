import { Item } from "./Item"
import { Teacher } from "./Teacher"

export type Cabinet = {
    id: string,
    cabinetNumber: string,
    items: Item[],
    teachers: Teacher[]
}