
export enum ROVERS {
    CURIOSITY =  "Curiosity",
    OPPORTUNITY =  "Opportunity",
    SPIRIT =  "Spirit",
    PERSERVERANCE =  "Perseverance"
}

export interface Selection {
    readonly rover: ROVERS
    readonly date: Date
}
    