/*
 * @Description: 战斗场景UI脚本
 * @Author: Super_Javan
 * @Date: 2022-11-29 17:52:12
 * @LastEditTime: 2022-12-03 22:51:51
 * @LastEditors: Super_Javan
 */
import { EventMgr } from "../../../ScriptCore/BaseManager/EventMgr";
import { LogicEvent } from "../../../ScriptCore/Games/LogicEvent";
import { UIScreen } from "../../../ScriptCore/UIFrame/UIForm";
const { ccclass, property } = cc._decorator;


@ccclass('UIBattleScene')
export class UIBattleScene extends UIScreen{

    @property(cc.Node)
    private btnBackHall:cc.Node = null;

    @property({type:[Node]})
    private cardsNode:Node[] = null;

    start(){}

    onLoad(): void {}

    async onShow(...params: any){
        this.init();
        this.eventRegister();
    }

    init(){
        
    }

    eventRegister(){

    }

    async onBtnBackLobby(){
        await this.closeSelf();
        EventMgr.getInstance().dispatchEvent(LogicEvent.ENTER_HALL_FROM_GAMES);
    }
}