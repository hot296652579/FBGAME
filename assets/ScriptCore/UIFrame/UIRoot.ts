import { UIMgr } from "../Lobby/Scripts/UIMgr";
import { ProjectConfig } from "../ProjectConfig";
import { SysDefine } from "./config/SysDefine";
import { UIManager } from "./UIManager";

const { ccclass, property } = cc._decorator


/**
 * 应用从这里开始启动
 */
@ccclass("UIRoot")
export class UIRoot extends cc.Component {
    private static instance: UIRoot;

    public static getInstance(): UIRoot {
        return this.instance;
    }

    public async start() {
        cc.view.setResizeCallback(() => {
            console.log("大小发生了改变=====");

            if (this.rotationCallBack != null) {
                this.rotationCallBack();
                this.rotationCallBack = null;
            }
            this.doAdapter();
        });
        UIRoot.instance = this;
        this.doAdapter();
        this.onGameInit();
    }


    private minWidth = 1280;
    private minHeight = 720;
    private maxWidth = 1600;
    private maxHeight = 720;



    //初始的屏幕朝向
    private targetDiction: number = cc.macro.ORIENTATION_PORTRAIT;

    //获取当前屏幕的朝向
    public getCurScreenDirection():number{
        return this.targetDiction
    }


    //转动结束的回调方法
    private rotationCallBack: Function = null;


    //将所有节点的大小重新定义一下
    private doReSizeAllNode() {
        let rootNode = this.node.parent;
        if (this.targetDiction == cc.macro.ORIENTATION_LANDSCAPE) {
            //横屏
            //Root节点
            rootNode.setContentSize(ProjectConfig.DesignScreenHeight, ProjectConfig.DesignScreenWidth);
            this.node.getChildByName(SysDefine.SYS_FIXED_NODE).setContentSize(ProjectConfig.DesignScreenHeight, ProjectConfig.DesignScreenWidth);
            //UIPopup节点
            this.node.getChildByName(SysDefine.SYS_POPUP_NODE).setContentSize(ProjectConfig.DesignScreenHeight, ProjectConfig.DesignScreenWidth);
            //UIFloat节点
            this.node.getChildByName(SysDefine.SYS_FLOAT_NODE).setContentSize(ProjectConfig.DesignScreenHeight, ProjectConfig.DesignScreenWidth);
            //UIWin节点
            this.node.getChildByName(SysDefine.SYS_WIN_NODE).setContentSize(ProjectConfig.DesignScreenHeight, ProjectConfig.DesignScreenWidth);
            //UILoading节点
            this.node.getChildByName(SysDefine.SYS_LOADING_NODE).setContentSize(ProjectConfig.DesignScreenHeight, ProjectConfig.DesignScreenWidth);
        } else {
            //Root节点
            rootNode.setContentSize(ProjectConfig.DesignScreenWidth, ProjectConfig.DesignScreenHeight);
            this.node.getChildByName(SysDefine.SYS_FIXED_NODE).setContentSize(ProjectConfig.DesignScreenWidth, ProjectConfig.DesignScreenHeight);
            //UIPopup节点
            this.node.getChildByName(SysDefine.SYS_POPUP_NODE).setContentSize(ProjectConfig.DesignScreenWidth, ProjectConfig.DesignScreenHeight);
            //UIFloat节点
            this.node.getChildByName(SysDefine.SYS_FLOAT_NODE).setContentSize(ProjectConfig.DesignScreenWidth, ProjectConfig.DesignScreenHeight);
            //UIWin节点
            this.node.getChildByName(SysDefine.SYS_WIN_NODE).setContentSize(ProjectConfig.DesignScreenWidth, ProjectConfig.DesignScreenHeight);
            //UILoading节点
            this.node.getChildByName(SysDefine.SYS_LOADING_NODE).setContentSize(ProjectConfig.DesignScreenWidth, ProjectConfig.DesignScreenHeight);

            //UIBubble节点

            //全局屏蔽层节点
        }
    }

    /**
     * 
     * 当前的适配策略
     * 1：默认启动使用 竖屏 设计分辨率为 720 x 1280 
     * 2：当进行屏幕旋转的时候执行 1280 X 720 的设计分辨率
     * 
     * 暂时不测试 适配 的问题。
     */
    public doAdapter() {
        let isLandscape = this.targetDiction == cc.macro.ORIENTATION_LANDSCAPE;
        if (isLandscape) {
            console.log("当前为横屏xxx  固定高度");
            cc.view.setDesignResolutionSize(ProjectConfig.DesignScreenHeight, ProjectConfig.DesignScreenWidth, cc.ResolutionPolicy.FIXED_HEIGHT);
        } else {
            console.log("当前为竖屏 固定宽度");
            cc.view.setDesignResolutionSize(ProjectConfig.DesignScreenWidth, ProjectConfig.DesignScreenHeight, cc.ResolutionPolicy.FIXED_WIDTH);
        }
        //this.doReSizeAllNode();
    }

    clearAllNodes() {
        this.node.getChildByName(SysDefine.SYS_SCREEN_NODE)!.destroyAllChildren();
        this.node.getChildByName(SysDefine.SYS_FIXED_NODE)!.destroyAllChildren();
        this.node.getChildByName(SysDefine.SYS_POPUP_NODE)!.destroyAllChildren();
        this.node.getChildByName(SysDefine.SYS_FLOAT_NODE)!.destroyAllChildren();
        this.node.getChildByName(SysDefine.SYS_WIN_NODE)!.destroyAllChildren();
        this.node.getChildByName(SysDefine.SYS_BUBBLE_NODE).destroyAllChildren();
        this.node.getChildByName(SysDefine.SYS_LOADING_NODE).destroyAllChildren();
        this.node.getChildByName(SysDefine.SYS_BLOCK_NODE).destroyAllChildren();
    }


    
    public async onGameInit() {
        //初始化UIManager中的Node。所有节点都在 UIManager中操作
        this.clearAllNodes();
        //先清空
        UIManager.destory();
        UIManager.getInstance().init(this.node.getChildByName(SysDefine.SYS_SCREEN_NODE),
            this.node.getChildByName(SysDefine.SYS_FIXED_NODE),
            this.node.getChildByName(SysDefine.SYS_POPUP_NODE),
            this.node.getChildByName(SysDefine.SYS_FLOAT_NODE),
            this.node.getChildByName(SysDefine.SYS_WIN_NODE),
            this.node.getChildByName(SysDefine.SYS_LOADING_NODE),
            this.node.parent.parent.parent.getChildByName("node_3d"),
            this.node.getChildByName("UI2dOn3D"),
            this.node.getChildByName(SysDefine.SYS_BUBBLE_NODE),
            this.node.getChildByName(SysDefine.SYS_BLOCK_NODE)
        );

        UIMgr.getInstance().showScreenLobby();
        // let updateRes = await ResMgr.getInstance().preloadLoading("Core/hotupdate/UIUpdate");
        // let result = await ResMgr.getInstance().preloadLoading("Core/UILoading");
        // if (result && updateRes){
        //     UIMgr.getInstance().showUILoading();
        // }else{
        //     console.error("loading节点初始化失败");
        // }

        //UIMgr.getInstance().showLoading()\
        //第一步 展示 loading页面 当然有些默认就是loading页面

        //第二步 初始化游戏（Manager config sdks）

        //第三步 构建场景(加载必要的prefab 音频 texture)

        //第四步 加载主界面ui 关掉loading 正式进入游戏
    }

    //注册底层事件
    private async registerEvent() {
    }
}
