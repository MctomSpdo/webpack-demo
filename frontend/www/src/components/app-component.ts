import { html, render } from "lit-html"

import "./user/rover-grid-component"
import "./user/input-form"

import { store } from "Model/store-rover"
import { distinctUntilChanged } from "rxjs"
import { Model } from "Model/model"

class AppComponent extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    connectedCallback() {
        store
            .pipe(distinctUntilChanged())
            .subscribe(model => this.render(model))
    }

    private template(model: Model) {
        console.log(model.photos)

        console.log(model.photos);
        
        return html`
            <style>
                h1 {
                    text-align: center;
                    font-family: Arial, Verdana, Helvetica;
                }
            </style>

            <h1>Rover images</h1>
            <photo-grid></photo-grid>
        `
    }

    private render(model: Model) {
        render(this.template(model), this.shadowRoot)
    }
}
customElements.define("app-component", AppComponent)