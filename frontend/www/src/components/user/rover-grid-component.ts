import { MarsPhoto } from "Model/photo"
import { store } from "Model/store-rover"
import { html,render } from "lit-html"
import { distinctUntilChanged, map } from "rxjs"
import spaceService from "../../space-service"


export class ImageTableComponent extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode : "open"})
    }

    connectedCallback() {
       this.loadRovers()
    }

    loadRovers() {
        var date = new Date()
        date.setDate(date.getDate() - 7)

        
        store
            .pipe(
                distinctUntilChanged(undefined, model => model.photos),
               map(model => model.photos)
            )
            .subscribe(photos => {
                this.render(photos)
            })
    }

    render(photos: Array<MarsPhoto>) {
        let rows = photos.map(foto => this.photoTemplate(foto))

        if(photos.length == 0) {
            rows.push(html`No Images provided`)
        }

        const tableTemplate = html`
            <style>
                .photo-grid {
                    display: grid;
                    grid-template-columns: auto auto auto;
                    margin: 0 auto;
                }

                p {
                    font-family: Arial, Verdana, Helvetica;
                }

                #input-middle {
                    width: 30%;
                    margin: 0 auto;
                    text-align: center;
                }
            </style>

            <div id="input-middle">
                <rover-input></rover-input>
                <p>Rover: ${photos[0]?.rover?.name}</p>
                <p>Date: ${photos[0]?.earth_date}</p>
            </div>

            <div class="photo-grid">
                    ${rows}
            </div>
        `
        

        render(tableTemplate, this.shadowRoot)
    }

    photoTemplate(photo: MarsPhoto) {
    //render singular photo: 
    return html`
        <style>
            img {
                width: 30vw;
                height: auto
            }
        </style>

        <div>
            <img src=${photo.img_src} alt="rover photo">
        </div>
        `
    }

    
}

customElements.define("photo-grid", ImageTableComponent)
