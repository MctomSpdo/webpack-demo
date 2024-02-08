import { Model } from "Model/model"
import { ROVERS } from "Model/selection"
import { store } from "Model/store-rover"
import { html, render } from "lit-html"
import { distinctUntilChanged, map } from "rxjs"
import spaceService from "../../space-service"

export class InputForm extends HTMLElement {

    
    constructor() {
        super()
        this.attachShadow({mode : "open"})
    }

    connectedCallback() {
        store
            .pipe(
                distinctUntilChanged(undefined, model => model)
            )
            .subscribe(viewModel => this.render(viewModel))
    }

    render(viewModel: Model) {
            const options = Object.values(ROVERS).reverse().map((rover: ROVERS) => html`
            <option value="${rover}">${rover}</option>
        `
        )

        var template = html`
            <input type="date" value="2023-12-12" @change="${e => this.onDateChange(e)}"/>
            <select @change="${e => this.onChange(e)}" name="rovers" id="rover-select" >
                ${options}
            </select>
            <button type="button" @click="${e => this.buttonClicked(e)}">get</button>
        `

        render(template, this.shadowRoot)
    }

    onDateChange(event: Event) {
        const selectedDate = (<HTMLInputElement>event.target).value
        var date = new Date(selectedDate)
        store.next({...store.value, date: date})
        
    }

    onChange(event: Event) {
        const selectedValue = (<HTMLSelectElement>event.target).value
        
        const getRover = (input: String) : ROVERS => {
            if(input == "Curiosity") {
                return ROVERS.CURIOSITY
            } else if (input == "Perserverance") {
                return ROVERS.PERSERVERANCE
            } else if (input == "Opportunity") {
                return ROVERS.OPPORTUNITY
            } else if (input == "Spirit") {
                return ROVERS.SPIRIT
            }            
            return ROVERS.PERSERVERANCE
        }
        
        const roverValue = getRover(selectedValue)
        
        store.next({...store.value, roverFilter: roverValue})
    }

    buttonClicked(event: Event) {
        spaceService.fetchFromDate(store.value.roverFilter, store.value.date)
    }

}

customElements.define("rover-input", InputForm)