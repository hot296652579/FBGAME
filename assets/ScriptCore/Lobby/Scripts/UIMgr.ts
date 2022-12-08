import { UIManager } from "../../UIFrame/UIManager";

/*
 * @Description: 大厅界面UI打开管理器
 * @Author: Super_Javan
 * @Date: 2022-11-29 21:39:07
 * @LastEditTime: 2022-12-03 14:48:07
 * @LastEditors: Super_Javan
 */
export class UIMgr{
    private static instance: UIMgr = new UIMgr();

    public static getInstance(): UIMgr {
        return this.instance;
    }

    /**
     * 打开大厅界面
     */
    public async showScreenLobby() {
        return await UIManager.getInstance().openScreen("Lobby/Prefabs/UILobby");
    }

    /**
     * 打开商店窗口
     */
    public async openUIShop() {
        return await UIManager.getInstance().openWin("Lobby/Prefabs/UIShop");
    }

    public async showLoading(){
        return await UIManager.getInstance().openWin("Lobby/Prefabs/Loading");
    }

    /**
     * 显示waiting
     */
    public async showWaiting() {
        return await UIManager.getInstance().openWait("Lobby/Prefabs/UIWaiting");
    }

    public async clearWaiting() {
        return await UIManager.getInstance().closeWaiting("Lobby/Prefabs/UIWaiting");
    }
    
}