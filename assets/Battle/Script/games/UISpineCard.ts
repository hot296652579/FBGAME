import { ResMgr } from "../../../ScriptCore/BaseManager/ResMgr";
import Config, { SpineConfig } from "./config/Config";

/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2022-12-12 11:47:07
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2022-12-12 17:29:49
 * @FilePath: \FBGAME\assets\Battle\Script\games\UISpineCard.ts
 * @Description: spine脚本组件
 */
const { ccclass, property } = cc._decorator;


@ccclass('UISpineCard')
export default class UISpineCard extends cc.Component{

    @property(cc.Node)
    private spineNode:cc.Node = null;

    onLoad(){

    }

    updateScaleByIndex(index){
        let col = index % 4;
        if(col == 0)
            this.spineNode.scaleX = -1;
    }

    async refreshSpineByCard(card){
        let config = SpineConfig.spinesConfig[card];
        let spine = this.spineNode.getComponent(sp.Skeleton);
        let spineName = config.spine;
        let spData = await ResMgr.getInstance().lazyLoadySpine(`Battle/Spines/${spineName}`);
        console.log('skin:'+config.skins[0]);

        spine.skeletonData = spData;
        spine.setSkin(config.skins[0]);
        spine.setAnimation(0,'idle',true);
    }

}