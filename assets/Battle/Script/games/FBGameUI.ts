/*
 * @Description: 战斗场景UI脚本
 * @Author: Super_Javan
 * @Date: 2022-11-29 17:52:12
 * @LastEditTime: 2022-12-09 17:22:21
 * @LastEditors: super_javan 296652579@qq.com
 */
import { EventMgr } from "../../../ScriptCore/BaseManager/EventMgr";
import { LogicEvent } from "../../../ScriptCore/Games/LogicEvent";
import { UIScreen } from "../../../ScriptCore/UIFrame/UIForm";
import Config from "./config/Config";
import EventOnFire from "./eventfire/EventOnFire";
import FireKit from "./eventfire/FireKit";
import FBGameEvent from "./events/FBGameEvent";
import FBGameEngine from "./FBGameEngine";
import HumanPlayer from "./HumanPlayer";
import PlayerManager from "./manager/PlayerManager";
const { ccclass, property } = cc._decorator;


@ccclass('UIBattleScene')
export class UIBattleScene extends UIScreen{

    @property(cc.Node)
    private btnBackHall:cc.Node = null;

    @property({type:[cc.Node]})
    btnCards:cc.Node[] = [];
    /**
     * 自己的游戏ID
     */
    private _meId: number = 1001;

    private _engine:FBGameEngine;

    start(){}

    onLoad(): void {

    }

    async onShow(...params: any){
        this.init();
        this.eventRegister();

        // this._engine.enter(PlayerManager.ins().creatorPlayer(new HumanPlayer(this._meId,'鸡哥')));
    }

    init(){
        this._engine = new FBGameEngine();
    }

    eventRegister(){
        FireKit.use(Config.HUMAN_FIRE).onGroup(FBGameEvent.SIT_DOWN,this.sitDownLogic,this);
        FireKit.use(Config.HUMAN_FIRE).onGroup(FBGameEvent.SIT_DOWN,this.startGameLogic,this);
    }

    sitDownLogic(){

    }

    startGameLogic(){
        for (let index = 0; index < this.btnCards.length; index++) {
            let button = this.btnCards[index].addComponent(cc.Button);
            let clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = this.node;
            clickEventHandler.component = 'FBGameUI';
            clickEventHandler.handler = 'cardClickHandler';
            clickEventHandler.customEventData = String(index);
            button.clickEvents.push(clickEventHandler);
        }
    }

    cardClickHandler(index){
        console.log('++++++++++++++++++++++++++++++++++++++++');
    }

    async onBtnBackLobby(){
        await this.closeSelf();
        EventMgr.getInstance().dispatchEvent(LogicEvent.ENTER_HALL_FROM_GAMES);
    }
}