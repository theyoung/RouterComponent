import Store from "./Store.js";

export default class Router extends HTMLElement {
    constructor(){
        super();
        this.originContent = this.innerHTML;
        this.path = this.dataset.path;
        this.hidden = true;

        Store.mediator.registerChannel('url',this.visibility.bind(this));
        
        this.render();
    }

    visibility(){
        this.hidden = true;
        if(Store.state.url === this.path){
            this.hidden = false;
        }
        this.style.display = this.hidden? 'none' : 'block';
    }

    render(){
        this.visibility();
        return this.innerHTML = `
            ${this.originContent}
            <p>${this.path} 여기 나오나요?</p>
        `
    }
};

customElements.get('custom-router')?? customElements.define('custom-router',Router);
