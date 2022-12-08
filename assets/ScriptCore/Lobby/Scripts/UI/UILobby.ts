/*
 * @Description: 大厅场景脚本
 * @Author: Super_Javan
 * @Date: 2022-11-29 17:52:12
 * @LastEditTime: 2022-12-03 17:38:16
 * @LastEditors: Super_Javan
 */
import { FBGameUIMgr } from "../../../../Battle/FBGameUIMgr";
import { EventMgr } from "../../../BaseManager/EventMgr";
import { ResMgr } from "../../../BaseManager/ResMgr";
import { LogicEvent } from "../../../Games/LogicEvent";
import { UIScreen } from "../../../UIFrame/UIForm";
import { UIMgr } from "../UIMgr";
const { ccclass, property } = cc._decorator;


@ccclass('UILobby')
export class UILobby extends UIScreen{
    isEngross = true;

    @property(cc.Node)
    private btnFight:cc.Node = null;

    start(){}

    onLoad(): void {
        
    }

    async onShow(...params: any){
        this.init();
        this.eventRegister();
    }

    init(){
        
    }

    eventRegister(){
        this.btnFight.on(cc.Node.EventType.TOUCH_END,this.clickBtnFight,this);
    }

    async clickBtnFight(){
        //先异步加载ab包
        await ResMgr.getInstance().preloadBundleOnly('Battle');
        EventMgr.getInstance().dispatchEvent(LogicEvent.ENTER_FBGAME);
    }

    onBtnClickShop(){
        UIMgr.getInstance().openUIShop();
    }
}