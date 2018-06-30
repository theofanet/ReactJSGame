export class Subject{
    constructor(){
        this.subject_id = Math.random().toString(36).substr(2, 9);
    }

    getSubjectId(){
        return this.subject_id;
    }

    notify(event, data=null){
        EventManager.notifyObservers(this, event, data);
    }
}

export class Observer{
    constructor(){
        this.observer_id = Math.random().toString(36).substr(2, 9);
    }

    getObserverId(){
        return this.observer_id;
    }

    observe(event, callback){
        EventManager.subscribe(this, event, callback);
    }

    stopObserving(event){
        EventManager.unsubscribe(this, event);
    }
}

class EventManager{
    static _handlers = {};

    static subscribe(observer, event, callback){
        if(!observer instanceof Observer)
            return false;
        if(!EventManager._handlers.hasOwnProperty(event))
            EventManager._handlers[event] = {};
        EventManager._handlers[event][observer.getObserverId()] = callback;
        return true;
    }

    static unsubscribe(observer, event){
        if(observer instanceof Observer){
            if(EventManager._handlers.hasOwnProperty(event) 
                && EventManager._handlers[event].hasOwnProperty(observer.getObserverId())){
                    delete EventManager._handlers[event][observer.getObserverId()];
                    return true;
                }
        }
        return false;
    }

    static notifyObservers(subject, event, data=null){
        if(!subject instanceof Subject)
            return false;
        if(EventManager._handlers.hasOwnProperty(event)){
            for(let obs of Object.values(EventManager._handlers[event]))
                if(obs)
                    obs(subject, data);
        }
    }
}
