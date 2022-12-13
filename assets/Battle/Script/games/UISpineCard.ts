import { ResMgr } from "../../../ScriptCore/BaseManager/ResMgr";
import Config, { SpineColor, SpineConfig } from "./config/Config";

/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2022-12-12 11:47:07
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2022-12-13 18:20:40
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

    updateScaleByIndex(index,card){
        let col = index % 4;
        let spine = this.spineNode.getComponent(sp.Skeleton);
        console.log('col ->' + col + ', card ::::: ' + (card & 0x0F));
        if(col == 0){
            if((card & 0x0F) > 5){
                this.spineNode.scaleX = -1;
            }
        }else if(col == 3){
            if((card & 0x0F) < 5){
                this.spineNode.scaleX = -1;
            }
        }
    }

    async refreshSpineByCard(card){
        let config = SpineConfig.spinesConfig[card];
        if(!config)return;

        let spine = this.spineNode.getComponent(sp.Skeleton);
        let spineName = config.spine;
        let spData = await ResMgr.getInstance().lazyLoadySpine(`Battle/Spines/${spineName}`);

        spine.skeletonData = spData;
        spine.setSkin(config.skins[0]);
        spine.setAnimation(0,'idle',true);

        let color = card >> 4;
        this.spineNode.color = color == 0 ? SpineColor.COLOR_RED : SpineColor.COLOR_BULE;

        spine.node.scale = SpineConfig.spinesConfig[card].scale;
    }

}