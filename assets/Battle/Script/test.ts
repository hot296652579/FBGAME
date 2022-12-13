/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2022-12-12 11:47:07
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2022-12-13 14:57:18
 * @FilePath: \FBGAME\assets\Battle\Script\test.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { ccclass, property } = cc._decorator;


@ccclass('test')
export default class test extends cc.Component{
    @property({type:[cc.Node]})
    btnCards:cc.Node[] = [];

    @property(cc.Node)
    private spineNode:cc.Node = null;

    start(){
        
    }

    onLoad(){
        let spine = this.spineNode.getComponent(sp.Skeleton);
        // spine.defaultSkin = 'gun1';
        spine.setAnimation(0,'idle',true);
        spine.setSkin('gun0');

        this.spineNode.color = new cc.Color().fromHEX("#EE6C6C");
    }
}