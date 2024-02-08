import { ROVERS } from "Model/selection"
import { setPhotos } from "Model/store-rover"

const API_KEY = "Ard5P1Gocb3XeAbaaquOzvp2W1eWPDMPYTAHqV5D"

class SpaceService {

    async fetchFromDate(rover: ROVERS, date: Date, page: number = 1) {     
        //https://stackoverflow.com/questions/3552461/how-do-i-format-a-date-in-javascript
        function join(date, options, separator) {
           function format(option) {
              let formatter = new Intl.DateTimeFormat('en', option);
              return formatter.format(date);
           }
           return options.map(format).join(separator);
        }
         
        let options = [{year: 'numeric'},  {month: '2-digit'}, {day: 'numeric'}];
        let dateString = join(date, options, '-');

        //const dateString = `2023-12-12`
        const response = await fetch(
            `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${dateString}&page=${page}&api_key=${API_KEY}`
        )
        const photos = await response.json()
        setPhotos(photos.photos)
        console.log(photos);
    }
    
}

const spaceService = new SpaceService()
export default spaceService