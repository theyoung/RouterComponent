
import Router from "./Router.js";
import Item from "./Item.js";
import Store from "./Store.js";

export default class App extends HTMLElement {
    constructor(){
        super();
        window.onpopstate = this.changeUrl.bind(this);
        this.render();
    }

    changeUrl(nav){
        console.log(nav.state);
        Store.dispatchAction("changedUrl",{url:nav.state.url})
    }

    render(){
        return this.innerHTML = `
            <custom-router data-path="/superman">
                <one-item data-color="blue">
                </one-item>
            </custom-router>
            <custom-router data-path="/">
                <one-item data-color="red">
                </one-item>
            </custom-router>
        `
    }
}

customElements.get("main-app")?? customElements.define("main-app", App);