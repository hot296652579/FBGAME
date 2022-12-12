/*
 * @Description: 
 * @Author: Super_Javan
 * @Date: 2022-12-03 14:19:21
 * @LastEditTime: 2022-12-12 17:19:43
 * @LastEditors: super_javan 296652579@qq.com
 */
import { EventMgr } from "../ScriptCore/BaseManager/EventMgr";
import { ResMgr, ResType } from "../ScriptCore/BaseManager/ResMgr";
import { BaseLogic } from "../ScriptCore/Games/BaseLogic";
import { LogicEvent, LogicEventData } from "../ScriptCore/Games/LogicEvent";
import { UIMgr } from "../ScriptCore/Lobby/Scripts/UIMgr";
import { FBGameUIMgr } from "./FBGameUIMgr";
import { LogicManager } from "./LogicManager";
import { reslist } from "./reslist";
import { FBGameEventName } from "./Script/configs/FBGameEventName";
import { FBGameNet } from "./Script/net/FBGameNet";

export class FBGameLogic extends BaseLogic{
    public init(): void {
        EventMgr.getInstance().addEventListener(LogicEvent.ENTER_FBGAME, this.onStartEnter.bind(this), this);
        EventMgr.getInstance().addEventListener(LogicEvent.ENTER_HALL_FROM_GAMES, this.onBackHall.bind(this), this);
    }

    //从子游戏返回到大厅了
    public onBackHall(data: LogicEventData) {
        super.onBackHall(data);
        console.log("返回大厅，需要释放资源");
        setTimeout(() => {
            //清除消息注册
            FBGameNet.destory();

            //释放对应bundle中的资源 如果是从
            ResMgr.getInstance().releaseAllResByList(reslist);
        });
    }

    async onStartEnter(data: LogicEventData): Promise<void> {
        await super.onStartEnter(data);
        FBGameNet.getInstance().register();
        this.startLoadGame();
    }

    /**
     * @description: 开始加载游戏资源
     */    
    async startLoadGame(){
        let list = reslist;
        await UIMgr.getInstance().clearWaiting();
        await FBGameUIMgr.getInstance().showLoading();
        let resType: Map<ResType, boolean> = new Map();
        resType.set(ResType.ResType_Prefab, true);
        resType.set(ResType.ResType_SpriteAtlas, true);
        resType.set(ResType.ResType_AudioClip, true);
        resType.set(ResType.ResType_SpriteFrame, true);

        ResMgr.getInstance().preLoad(list, this.onLoadResourceProgress.bind(this), this.onLoadResourceComplete.bind(this), resType);
    }

    //加载资源进度
    protected onLoadResourceProgress(process: number) {
        console.log("游戏资源进度", process, "=====");
        EventMgr.getInstance().dispatchEvent(FBGameEventName.GAME_LOAD_PROGRESS, process);
    }

    //加载资源完成
    protected onLoadResourceComplete(err: any) {
        EventMgr.getInstance().dispatchEvent(FBGameEventName.GAME_LOAD_COMPLETE);
        UIMgr.getInstance().clearWaiting();
        FBGameUIMgr.getInstance().showFBGame();
    }
}
LogicManager.getInstance().registerLogicTypes(FBGameLogic);