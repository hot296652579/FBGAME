/*
 * @Description: 定义场景 窗口面板类
 * @Author: Super_Javan
 * @Date: 2022-11-29 17:28:19
 * @LastEditTime: 2022-12-02 20:06:59
 * @LastEditors: Super_Javan
 */
import { FormType } from "./config/SysDefine";
import { ModalType } from "./Struct";
import { UIBase } from "./UIBase";
import { UIManager } from "./UIManager";

export class UIScreen extends UIBase {
    formType = FormType.FormType_Screen;
    willDestory = true;
    //是否独占。如果UIScreen设置该属性，则打开该窗体，其他screen都会被关闭，否则不关闭
    public isEngross: boolean = false;
    public is3d: boolean = false;
    public params: any;

    public isOnleyEngross: boolean = false;


    //覆盖父类方法全屏不展示出现效果
    public async showEffect(): Promise<boolean> {
        return true;
    }

    public async hideEffect(): Promise<boolean> {
        return true;
    }

    public onShow(...params: any): void {
        super.onShow(...params);
    }


    public reShow() {
        super.reShow();
    }

    public onHide(): void {
        super.onHide();
    }
}

export class UIWindow extends UIBase {
    formType = FormType.FormType_Win;
    modalType = new ModalType();
    priority = 0;


    public onShow(...params: any): void {
        super.onShow(...params);
    }

    public onHide(): void {
        super.onHide();
    }

    //打开界面的效果。这里做默认效果。如果个别页面有特殊需求，则各自实现
    public async showEffect(): Promise<boolean> {
        cc.Tween.stopAllByTarget(this.node);
        this.node.setScale(new cc.Vec3(0, 0, 1));
        return new Promise<boolean>((resolve, reject) => {
            cc.tween(this.node).to(0.5, { scale:1}, { easing: "backOut" }).call(() => {
                resolve(true);
            }).start();
        });

    }

    public async hideEffect(): Promise<boolean> {
        cc.Tween.stopAllByTarget(this.node);
        return new Promise<boolean>((resolve, reject) => {
            cc.tween(this.node).to(0.3, { scale: 0 }, { easing: "backIn" }).call(() => {
                resolve(true);
            }).start();
        });

    }

}

export class UIPopup extends UIBase {
    formType = FormType.FormType_Popup;

    modalType = new ModalType();


    //是否可拖动
    protected isDragable: boolean = false;
    //是否拖拽过
    protected isDraged: boolean = false;
    protected startX: number = 0;
    protected startY: number = 0;

    private touchSX: number | null = null;
    private touchSY: number | null = null;

    public onShow(...params: any): void {
        super.onShow(...params);
        //这里可能需要修改哪里可以拖拽 todo dev
        if (this.isDragable) {
            this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart.bind(this));
            this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoved.bind(this));
            this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnded.bind(this));
            this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancelled.bind(this));
        }
    }


    public onDisable() {
        if (this.isDragable) {
            this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart.bind(this));
            this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoved.bind(this));
            this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnded.bind(this));
            this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancelled.bind(this));
        }
    }

    //按下
    onTouchStart(event) {
        this.touchSX = event.getUILocation().x;
        this.touchSY = event.getUILocation().y;
        this.isDraged = false;
    }
    //移动
    onTouchMoved(event) {
        if (this.touchSX != null && this.touchSY != null) {
            let offx = event.getUILocation().x - this.touchSX;
            let offy = event.getUILocation().y - this.touchSY;
            this.node.setPosition(new cc.Vec2(this.startX + offx, this.startY + offy));
            if (Math.sqrt(offx * offx + offy * offy) >= 20) {
                this.isDraged = true;
            }
        }
    }
    //松开
    onTouchEnded() {
        this.touchSX = null;
        this.touchSY = null;
        this.startX = this.node.position.x;
        this.startY = this.node.position.y;
        UIManager.getInstance().reSortPopup(this);
    }
    //取消
    onTouchCancelled() {
        this.touchSX = null;
        this.touchSY = null;
        this.startX = this.node.position.x;
        this.startY = this.node.position.y;
    }


    public onHide(): void {
        super.onHide();
    }


    public getShowEffectTime(): number {
        return 0.5;
    }

    public getHideEffectTime(): number {
        return 0.3;
    }

    public async showEffect(): Promise<boolean> {
        return new Promise<boolean>((resolve,reject) => {
            resolve(true);
        });
        // this.node.setScale(new Vec3(0, 0, 1));
        // Tween.stopAllByTarget(this.node);
        // return new Promise<boolean>((resolve, reject) => {
        //     tween(this.node).to(0.5, { scale: new Vec3(1, 1, 1) }, { easing: "backOut" }).call(() => {
        //         resolve(true);
        //     }).start();
        // });
    }

    public async hideEffect(): Promise<boolean> {
        return new Promise<boolean>((resolve,reject) => {
            resolve(true);
        });
        // this.node.setScale(new Vec3(1, 1, 1));
        // Tween.stopAllByTarget(this.node);
        // return new Promise<boolean>((resolve, reject) => {
        //     tween(this.node).to(0.3, { scale: new Vec3(0, 0, 1) }, { easing: "backIn" }).call(() => {
        //         resolve(false);
        //     }).start();
        // });
    }

}


