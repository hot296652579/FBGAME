/*
 * @Description: 按钮自定义 实现按下缩小 放开恢复
 * @Author: Super_Javan
 * @Date: 2022-11-29 22:42:36
 * @LastEditTime: 2022-11-29 22:43:59
 * @LastEditors: Super_Javan
 */
const { ccclass, property } = cc._decorator;
@ccclass("BtnCustom")
export class BtnCustom extends cc.Component {
    onLoad(): void {
        this.node.on('touchstart', function(){
            this.node.setScale(0.9);
        }, this);
        
        this.node.on('touchend', function(){
            this.node.setScale(1);
        }, this);
    }

}