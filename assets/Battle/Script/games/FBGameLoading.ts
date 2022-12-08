/*
 * @Description: 
 * @Author: Super_Javan
 * @Date: 2022-12-03 15:04:15
 * @LastEditTime: 2022-12-03 17:42:34
 * @LastEditors: Super_Javan
 */
import { EventMgr } from "../../../ScriptCore/BaseManager/EventMgr";
import { UIWindow } from "../../../ScriptCore/UIFrame/UIForm";
import { FBGameEventName } from "../configs/FBGameEventName";


const { ccclass ,property} = cc._decorator;

@ccclass('FBGameLooading')
export class FBGameLooading extends UIWindow{
    @property(cc.Node)
    public progress: cc.Node | null = null;
    @property(cc.Node)
    public lblProTxt: cc.Node | null = null;

    //小车的动画
    @property(cc.Node)
    private duduChe: cc.Node = null;

    onShow(...params: any) {
        EventMgr.getInstance().addEventListener(FBGameEventName.GAME_LOAD_COMPLETE, this.onLoadCompeted, this);
        EventMgr.getInstance().addEventListener(FBGameEventName.GAME_LOAD_PROGRESS, this.onLoadProgress, this);
    }

    onHide() {
        EventMgr.getInstance().removeByTarget(this);
    }

    onLoadProgress(val: number) {
        this.lblProTxt!.getComponent(cc.Label)!.string = `${Math.round(val * 100)}/100`;
        this.progress!.getComponent(cc.ProgressBar)!.progress = val;

        this.calDuDuChePos();
    }

    calDuDuChePos(){
        let progress = this.progress!.getComponent(cc.ProgressBar)!.progress;
        let len = 578;
        let x = len * progress - len / 2;
        this.duduChe.setPosition(x, -500);
    }

    onLoadCompeted() {
        this.closeSelf();
    }
}
