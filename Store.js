import Mediator from "./Mediator.js";

class Store {
    constructor(state={},dispatcher={}){
        let that = this;
        this.dispatcher = dispatcher;
        this.mediator = new Mediator;

        this.state = new Proxy(state,{
            set:function (target, prop, newVal){
                Reflect.set(...arguments)
                if(prop === 'url') that.mediator.triggerChannel(prop,{url:newVal});
                console.log(prop,newVal);
                return true;
            }
        });
    }

    dispatchAction(actionName, params){
        if(!(typeof this.dispatcher[actionName] === 'function')){
            console.error('No Action Name : ' +actionName + 'with Param = ' + params);
            return false;
        }
        const copiedState = JSON.parse(JSON.stringify(this.state));
        let localState = this.dispatcher[actionName](copiedState, params);
        Object.assign(this.state, localState);
    }

}

export default new Store({
    url : new URL(window.location.href).pathname
},{
    changedUrl:function(oldState, newState){
        return newState;
    },
    dispatchUrl:function(oldState, newState){
        history.pushState(newState,newState.url,newState.url);
        return newState;
    },
})