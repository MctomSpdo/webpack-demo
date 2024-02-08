import { BehaviorSubject } from "rxjs";
import { Model } from "./model";
import { MarsPhoto } from "./photo";
import { produce } from "immer";
import { ROVERS } from "./selection";

export function setPhotos(photos: MarsPhoto[]) {
    let nextState = produce(store.getValue(), draft => {
        draft.photos = photos
    })
    store.next(nextState)
}

const initialState: Model = {
    photos: [], 
    roverFilter: ROVERS.PERSERVERANCE,
    date: new Date(2023,12,12)
}
const store = new BehaviorSubject<Model>(initialState)

export { store }