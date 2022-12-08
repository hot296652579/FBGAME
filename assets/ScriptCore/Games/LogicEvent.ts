/*
 * @Description: 
 * @Author: Super_Javan
 * @Date: 2022-12-03 14:11:38
 * @LastEditTime: 2022-12-03 16:39:37
 * @LastEditors: Super_Javan
 */

export enum LogicEvent{
    //进入指定场景完成
    ENTER_COMPLETE = "LOGIC_EVENT_ENTER_COMPLETE",
    //进入大厅
    ENTER_HALL = "LOGIC_EVENT_ENTER_HALL",

    //进入游戏
    ENTER_FBGAME = "ENTER_FBGAME",
    //从子游戏返回大厅
    ENTER_HALL_FROM_GAMES = "ENTER_HALL_FROM_GAMES",
}


export class LogicEventData{
    public data:any;
    constructor(data?:any){
        this.data = data
    }
}