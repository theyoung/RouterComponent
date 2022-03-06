import Store from "./Store.js";

export default class Item extends HTMLElement {
    constructor(){
        super();
        this.originalContent = this.innerHTML;
        this.style.display = "block";
        this.style.backgroundColor = this.dataset.color;
        this.render();
    }


    render(){
        return this.innerHTML = `
            <div>
                ${this.originalContent}
                <input type="button" id='superman' value="change url to superman"></button>
                <input type="button" id='root' value="change url to root"></button>
            </div>
        `
    }

    connectedCallback(){
        this.querySelector('#superman').addEventListener('click',(evt)=>{
            Store.dispatchAction("dispatchUrl",{url:'/superman'});

        });
        this.querySelector('#root').addEventListener('click',(evt)=>{
            Store.dispatchAction("dispatchUrl",{url:'/'});
        });
        
    }

    disconnectedCallback(){

    }
};

customElements.get('one-item')?? customElements.define('one-item', Item);