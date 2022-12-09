/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2022-12-05 17:05:39
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2022-12-09 18:48:49
 * @FilePath: \FBGame\assets\Battle\Script\games\eventfire\EventOnFire.ts
 * @Description: 游戏事件订阅器
 */

export interface Listener{
    cb:Function,
    once:boolean,
    group:any
}

export interface EventsType{
    [eventstring:string]:Listener[];
}

export default class EventOnFire{
    events:EventsType = {};

    on(eventname:string,cb:Function,once:boolean = false){
        if(!this.events[eventname]){
            this.events[eventname] = [];
        }

        this.events[eventname].push({
            cb,
            once,
            group:''
        })
    }

    onOnce(eventName: string, cb: Function){
        this.on(eventName,cb,true);
    }

    onGroup(eventName: string, cb: Function, group: any){
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push({
            cb,
            once: false,
            group
        });
    }

    doFire(eventName:string,...params:any[]){
        const listeners = this.events[eventName] || [];

        let l = listeners.length;

        for (let i = 0; i < l; i++) {
            const {cb, once,group} = listeners[i];

            cb.apply(group, params);

            if (once) {
                listeners.splice(i, 1);
                i--;
                l--;
            }
        }
    }

    offGroup(group: any) {
        for (let esKey in this.events) {
            const listeners = this.events[esKey] || [];
            let l = listeners.length;
            for (let i = 0; i < l; i++) {
                if (listeners[i].group === group) {
                    listeners.splice(i, 1);
                    i--;
                    l--;
                }
            }
        }
    }

    off(eventName?: string, cb?: Function) {
        // clean all
        if (eventName === undefined) {
            this.events = {};
        } else {
            if (cb === undefined) {
                // clean the eventName's listeners
                delete this.events[eventName];
            } else {
                const listeners = this.events[eventName] || [];
                // clean the event and listener
                let l = listeners.length;
                for (let i = 0; i < l; i++) {
                    if (listeners[i].cb === cb) {
                        listeners.splice(i, 1);
                        i--;
                        l--;
                    }
                }
            }
        }
    }

    emit = this.doFire;
}