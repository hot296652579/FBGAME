/*
 * @Description: 面板基类
 * @Author: Super_Javan
 * @Date: 2022-11-29 17:29:27
 * @LastEditTime: 2022-12-02 20:06:03
 * @LastEditors: Super_Javan
 */

import { FormType } from './config/SysDefine';
import { IFormData } from './Struct';
import { UIManager } from './UIManager';
const { ccclass, property } = cc._decorator;



export class UIBase extends cc.Component {
    //窗体id 该窗体的唯一标识，请不要对这个值复制
    public fid!: string;

    public formData!: IFormData;

    public formType: FormType = FormType.FormType_Screen;

    public willDestory = false;

    private inited: boolean = false;

    public static prefabPath = "";


    // public static async openView(params?:any,formData?:IFormData):Promise<UIBase>{
    //     return await UIManager.getInstance().openForm(this.prefabPath,params,formData);
    // }

    // public static async closeView():Promise<boolean>{
    //     return await UIManager.getInstance().closeForm(this.prefabPath);
    // }

    public view!: cc.Component;

    //保存参数
    public params: any;

    /**
     * 该功能等待扩展
     * @returns 
     */
    public async preInit() {
        if (this.inited) {
            return;
        }
        this.inited = true;
        //this.view = this.getComponent(`${this.node.name}_Auto`);


    }

    public async load(): Promise<string> {
        return new Promise<string>((resolve, reject) => {

        });
    }

    public onInit() {

    }
    //界面参数从这里获取
    public onShow(...params: any) {
        this.params = params;
    }

    //界面重新被激活 也就是重新active
    public reShow() {

    }

    //隐藏的时候执行一些清理操作 并没有真正关闭界面
    public onHide() {

    }

    public async closeSelf(): Promise<boolean> {
        return await UIManager.getInstance().closeForm(this.fid);
    }

    public async showEffect(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            resolve(true);
        });
        // this.node.setScale(new Vec3(0,0,1));
        // return new Promise<boolean>((resolve,reject)=>{
        //     tween(this.node).to(0.3,{scale:new Vec3(1,1,1)}).call(()=>{
        //         resolve(true);
        //     }).start();
        // });
    }

    public async hideEffect(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            resolve(true);
        });
    }

    public getShowEffectTime(): number {
        return 0.5;
    }

    public getHideEffectTime(): number {
        return 0.3;
    }

}
