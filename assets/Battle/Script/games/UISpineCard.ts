const { ccclass, property } = cc._decorator;


@ccclass('UISpineCard')
export default class UISpineCard extends cc.Component{

    @property(cc.Node)
    private spineNode:cc.Node = null;

    onLoad(){
        let spine = this.spineNode.getComponent(sp.Skeleton);
        spine.setAnimation(0,'idle',true);
        spine.setSkin('gun0');
    }

    updateScaleByIndex(index){
        let col = index % 4;
        if(col == 0)
            this.spineNode.scaleX = -1;
    }

}