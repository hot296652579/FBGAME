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

        this.scheduleOnce(function(){
            spine.setSkin('gun1')
        },1)
    }
}