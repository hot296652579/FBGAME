/*
 * @Description: 游戏UI管理器
 * @Author: Super_Javan
 * @Date: 2022-12-03 14:57:00
 * @LastEditTime: 2022-12-03 17:44:24
 * @LastEditors: Super_Javan
 */
import { UIManager } from "../ScriptCore/UIFrame/UIManager";
import { UIRoot } from "../ScriptCore/UIFrame/UIRoot";

export class FBGameUIMgr {
    private static intstance: FBGameUIMgr = new FBGameUIMgr();

    public static getInstance(): FBGameUIMgr {
        return this.intstance
    }

    //进入战斗场景
    public async showFBGame() {
        return await UIManager.getInstance().openScreen("Battle/Prefabs/UIBattleScene");
    }

    //打开loading界面
    public async showLoading() {
        return await UIManager.getInstance().openWin("Battle/Prefabs/Loading");
    }
}