export default class Mediator {
    constructor(){
        this.channels = new Map();
    }

    createChannel(name){
        if(!this.channels.has(name)){
            this.channels.set(name, new Array());
        }
    }

    registerChannel(name, callback, context){
        callback.bind(context);
        if(!this.channels.has(name)) {
            this.createChannel(name);
        }

        this.channels.get(name).push(callback);

    }

    triggerChannel(name){
        if(this.channels.has(name)){
            this.channels.get(name).forEach(callback => {
                callback([...arguments].splice(1));
            });
        }
    }
}