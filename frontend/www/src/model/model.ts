import { MarsPhoto } from "./photo"
import { ROVERS } from "./selection"

/** Our readonly single source of truth */
export interface Model {
    readonly photos: MarsPhoto[]
    readonly roverFilter: ROVERS
    readonly date: Date
}
