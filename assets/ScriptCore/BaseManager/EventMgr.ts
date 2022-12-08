/*
 * @Description: 事件管理器
 * @Author: Super_Javan
 * @Date: 2022-12-03 11:12:51
 * @LastEditTime: 2022-12-03 17:02:18
 * @LastEditors: Super_Javan
 */

export type MyEventHandler = (...params:any) => void;
class MyEventListenners{
    public handlers:any[];
    public targets:any[];
    public isInvoking: boolean;
    private containCanceled: boolean;

    constructor(){
        this.handlers = [];
        this.targets = [];
        this.isInvoking = false;
        this.containCanceled = false; 
    }

    add(handler:MyEventHandler,target:any){
        this.handlers.push(handler);
        this.targets.push(target);
    }

    remove(index: number) {
        this.handlers.splice(index, 1);
        this.targets.splice(index, 1);
    }

    has(handler: MyEventHandler, target: any) {
        const handlers = this.handlers;
        const targets = this.targets;
        for (let i = handlers.length - 1; i >= 0; i--) {
            if (handlers[i] == handler && targets[i] == target) {
                return true;
            }
        }
        return false;
    }
    removeByHandler(handler: MyEventHandler | null) {
        const handlers = this.handlers;
        const targets = this.targets;
        for (let i = handlers.length - 1; i >= 0; i--) {
            if (handlers[i] == handler) {
                handlers.splice(i, 1);
                targets.splice(i, 1);
            }
        }
    }

    removeByTarget(target: any) {
        const targets = this.targets;
        const handlers = this.handlers;
        for (let i = targets.length - 1; i >= 0; i--) {
            if (targets[i] == target) {
                targets.splice(i, 1);
                handlers.splice(i, 1);
            }
        }
    }

    purgeCanceled() {
        if (this.containCanceled) {
            this.removeByHandler(null);
            this.containCanceled = false;
        }
    }

    isEmpty() {
        return this.handlers.length == 0;
    }

    cancelByTarget(target: any) {
        const targets = this.targets;
        const handlers = this.handlers;
        for (let i = targets.length - 1; i >= 0; i--) {
            if (targets[i] == target) {
                targets[i] = null;
                handlers[i] = null;
            }
        }
        this.containCanceled = true;
    }
}

export class EventMgr{
    private static instance:EventMgr;
    private eventMap:Map<string,MyEventListenners>;
    
    private constructor() {
        this.eventMap = new Map();
    }
    static getInstance():EventMgr{
        if(!this.instance)
            this.instance = new EventMgr();
        return this.instance;
    }

    addEventListener(event:string,handler:MyEventHandler,target:any){
        let listeners = this.eventMap.get(event);
        if(!listeners){
            listeners = new MyEventListenners();
            this.eventMap.set(event,listeners);
        }
        listeners.add(handler,target)
    }

    dispatchEvent(event:string,...params:any){
        const listeners = this.eventMap.get(event);
        if (!listeners || listeners.isEmpty()) {
            return;
        }
        //事件处理函数中可能会删除事件，导致循环出错
        listeners.isInvoking = true;
        const handlers = listeners.handlers;
        const targets = listeners.targets;

        for (let i = 0, len = handlers.length; i < len; i++) {
            const handler = handlers[i];
            const target = targets[i];
            if (!handler) {
                continue;
            }
            //如果target是cc.Component，则在其节点有效时才调用事件函数
            if (target != null && (<cc.Component>target).node != null) {
                const node = (target as cc.Component).node;
                if (node.isValid) {
                    handler.call(target, ...params);
                }
                else {
                    listeners.cancelByTarget(target);
                }
            }
            else {
                handler.call(target, ...params);
            }
        }
        //循环结束后再删除
        listeners.isInvoking = false;
        listeners.purgeCanceled();
    }

    removeByTarget(target: any) {
        this.eventMap.forEach((listeners, event) => {
            if (listeners.isEmpty()) {
                this.eventMap.delete(event);
                return;
            }
            if (listeners.isInvoking) {
                listeners.cancelByTarget(target);
            }
            else {
                listeners.removeByTarget(target);
            }

            if (listeners.isEmpty()) {
                this.eventMap.delete(event);
            }
        });
    }
}