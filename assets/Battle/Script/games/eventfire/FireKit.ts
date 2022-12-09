import EventOnFire from "./EventOnFire";

/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2022-12-09 16:11:14
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2022-12-09 16:15:01
 * @FilePath: \FBGAME\assets\Battle\Script\games\eventfire\FireKit.ts
 * @Description: 归类 分开玩家和机器人的事件
 */
export default class FireKit{
    static fireDict:{[key:string]:EventOnFire} = {};

    static init(eventName:string){
        if(this.fireDict[eventName] == null){
            this.fireDict[eventName] = new EventOnFire();
        }
    }

    static use(eventName:string):EventOnFire{
        return FireKit.fireDict[eventName];
    }
}