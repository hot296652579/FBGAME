/*
 * @Description: 商店窗口脚本
 * @Author: Super_Javan
 * @Date: 2022-11-29 17:52:12
 * @LastEditTime: 2022-12-03 22:52:19
 * @LastEditors: Super_Javan
 */
import { UIScreen, UIWindow } from "../../../UIFrame/UIForm";
const { ccclass, property } = cc._decorator;


@ccclass('UIShop')
export class UIShop extends UIWindow{
    async onShow(...params: any){
        //这里面写初始化和注册监听
    }

    clickCloseSelf(){
        this.closeSelf();
    }
}