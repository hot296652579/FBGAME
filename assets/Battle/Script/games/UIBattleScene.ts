/*
 * @Description: 战斗场景UI脚本
 * @Author: Super_Javan
 * @Date: 2022-11-29 17:52:12
 * @LastEditTime: 2022-12-13 18:18:47
 * @LastEditors: super_javan 296652579@qq.com
 */
import { EventMgr } from "../../../ScriptCore/BaseManager/EventMgr";
import { ResMgr } from "../../../ScriptCore/BaseManager/ResMgr";
import { LogicEvent } from "../../../ScriptCore/Games/LogicEvent";
import { UIScreen } from "../../../ScriptCore/UIFrame/UIForm";
import Config from "./config/Config";
import FBGameConfig from "./config/FBGameConfig";
import MoveCardDTO from "./dto/MoveCardDTO";
import OpenCardDTO from "./dto/OpenCardDTO";
import EventOnFire from "./eventfire/EventOnFire";
import FireKit from "./eventfire/FireKit";
import FBGameEvent from "./events/FBGameEvent";
import FBGameEngine from "./FBGameEngine";
import HumanPlayer from "./HumanPlayer";
import PlayerManager from "./manager/PlayerManager";
import UISpineCard from "./UISpineCard";
import TweenUtil from "./utils/TweenUtil";
import ConfirmColorVO from "./vo/ConfirmColorVO";
import MoveResultVO from "./vo/MoveResultVO";
import OpenCardVO from "./vo/OpenCardVO";
import SitDownVO from "./vo/SitDownVO";
import StartGameVO from "./vo/StartGameVO";
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
    /**
     * 自己的编号
     */
    private _meChair: number;
    /**所有人座椅*/
    private chairIds: { [chair: number]: number } = {};
    /**
     * 当前牌面的牌
     */
    private cards: number[] = null; 
    /**
     * 锁定状态
     */
    private _locked: boolean = true;

    private _engine:FBGameEngine;

    private fromIndex:number;

    private _meColor:number;

    start(){}

    onLoad(): void {

    }

    async onShow(...params: any){
        this.init();
        this.eventRegister();

        this._engine.enter(PlayerManager.ins().creatorPlayer(new HumanPlayer(this._meId,'鸡哥')));
    }

    init(){
        this._engine = new FBGameEngine();
    }

    eventRegister(){
        FireKit.use(Config.HUMAN_FIRE).onGroup(FBGameEvent.SIT_DOWN,this.sitDownLogic,this);
        FireKit.use(Config.HUMAN_FIRE).onGroup(FBGameEvent.START_GAME,this.startGameLogic,this);
        FireKit.use(Config.HUMAN_FIRE).onGroup(FBGameEvent.CONFIRM_COLOR,this.confirmColorLogic,this);
        FireKit.use(Config.HUMAN_FIRE).onGroup(FBGameEvent.OPEN_RESULT,this.openResultLogic,this);
        FireKit.use(Config.HUMAN_FIRE).onGroup(FBGameEvent.MOVE_RESULT,this.moveResultLogic,this);
    }

    sitDownLogic(siwDownVo:SitDownVO){
        this.chairIds[siwDownVo.chair] = siwDownVo.userId;
        if(siwDownVo.userId == this._meId){
            this._meChair = siwDownVo.chair;
        }
        // console.log(this._meId);
    }

    startGameLogic(startGameVo:StartGameVO){
        this.cards = startGameVo.cards;
        this._locked = startGameVo.chair != this._meChair;
        for (let index = 0; index < this.btnCards.length; index++) {
            let clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = this.node;
            clickEventHandler.component = 'UIBattleScene';
            clickEventHandler.handler = 'callback';
            clickEventHandler.customEventData = String(index);

            let button = this.btnCards[index].addComponent(cc.Button);
            button.clickEvents.push(clickEventHandler);
        }
    }

    callback(event, customEventData){
        let node = event.target;
        let button = node.getComponent(cc.Button);
        let index = customEventData;
        let row = Math.floor(index / 4);
        let col = index % 4;
        console.log('row:' + row + ',col:' + col);
        console.log(this._locked)
        if(!this._locked){
            let card = this.cards[index];
            console.log('card:' + card);
            let color = card >> 4;//判断花色
            console.log('card >> 4' + color);

            if(color === FBGameEngine.DARK){
                this._engine.open(new OpenCardDTO(this._meChair,index,card));
            }else{
                if(this.fromIndex == FBGameEngine.INVALID_INDEX){
                    if(color == this._meColor){
                        // 选中了自己添加选中状态
                        this.updateAndSelectStyle(index);
                        this.fromIndex = index;
                    }
                }else{
                    if(this._engine.canMove(this.fromIndex,index,this.cards)){
                        this._engine.move(new MoveCardDTO(this._meChair, this.fromIndex, index));
                        this.fromIndex = FBGameEngine.INVALID_INDEX;
                        this.clearSelectStyle();    // 清除选中状态
                    }else{
                        //选中后 再切换到别的牌
                        if(color == this._meColor){
                            this.updateAndSelectStyle(index);
                            this.fromIndex = index;
                        }
                    }
                }
            }
        }
    }

    confirmColorLogic(confirmColorVO: ConfirmColorVO){
        if(this._meChair == confirmColorVO.chair){
            this._meColor = confirmColorVO.color;
            console.log('如果是0表示红色  confirmColorVO.color :' + confirmColorVO.color);
        }
    }

    /**
     *
     * @param openResultVO
     */
    openResultLogic = (openResultVO: OpenCardVO) => {
        // console.log('开牌时cards: ' + this.cards)
        console.log(openResultVO);
        this.cards[openResultVO.index] = openResultVO.card;
        this.clearSelectStyle();
        this.updateOpenCard(openResultVO);
        this.updateAndSelectStyle(openResultVO.index);
        this.fromIndex = FBGameEngine.INVALID_INDEX;
    };
    clearSelectStyle(){

    }
    async updateOpenCard(openResultVO){
        let card = openResultVO.card;
        let index = openResultVO.index;
        let cardTemp = this.getCardItemTemp(index);
        
        await TweenUtil.flip(cardTemp, 1, () => {
            this.updateStyle(index,card);
        });
    }
    private updateStyle(index,card){
        let cardTemp = this.getCardItemTemp(index);
        if(cardTemp.getChildByName('spinePrefab')){
            let spinePrefab = cardTemp.getChildByName('spinePrefab');
            spinePrefab.removeFromParent();
        }
        let spinePrefab = ResMgr.getInstance().getPrefabByPath('Battle/Prefabs/SpinePrefab');
        let pb = cc.instantiate(spinePrefab);
        cardTemp.addChild(pb);
        pb.name = 'spinePrefab';

        let noCard = cardTemp.getChildByName('NoCard');
        noCard.active = false;

        let comp = pb.getComponent(UISpineCard);
        comp.refreshSpineByCard(card);
        comp.updateScaleByIndex(index,card);
    }
    getCardItemTemp(index:any){
        for (let i = 0; i < this.btnCards.length; i++) {
            const element = this.btnCards[i];
            if(i == Number(index))
                return element;
        }
    }
    /**
     * 增加选择状态
     * @param index
     */
    private updateAndSelectStyle(index: number) {
        this.clearSelectStyle();            // 先清除选中

    }

    async onBtnBackLobby(){
        await this.closeSelf();
        EventMgr.getInstance().dispatchEvent(LogicEvent.ENTER_HALL_FROM_GAMES);
    }

    /**
     *
     * @param moveResultVO
     */
    moveResultLogic = (moveResultVO: MoveResultVO) => {
        let fromIndex = moveResultVO.fromIndex;
        let toIndex = moveResultVO.toIndex;
        let fromCard = moveResultVO.fromCard;
        let toCard = moveResultVO.toCard;
        this.cards[fromIndex] = fromCard;
        this.cards[toIndex] = toCard;
        this.updateStyle(fromIndex,fromCard);
        this.updateStyle(toIndex,toCard);
        if (this.cards[toIndex] != FBGameEngine.NONE_CARD) {
            this.updateAndSelectStyle(toIndex);
        }
        this.fromIndex = FBGameEngine.INVALID_INDEX;
    };
}