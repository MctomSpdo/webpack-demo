
export interface Rover {
    id: number
    name: String
    landing_date: String
    launch_date: String
    status: String
    max_sol: number
    max_date: String
    total_photos: number
    cameras: RoverCamera[]
}

export interface RoverCamera {
    name: String
    full_name: String
}