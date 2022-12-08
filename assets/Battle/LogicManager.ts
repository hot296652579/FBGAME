/*
 * @Description: 注册管理器
 * @Author: Super_Javan
 * @Date: 2022-12-03 15:29:07
 * @LastEditTime: 2022-12-03 15:29:50
 * @LastEditors: Super_Javan
 */
import { BaseLogic } from "../ScriptCore/Games/BaseLogic";

export class LogicManager{

    private static instance:LogicManager|null = null;

    public static getInstance():LogicManager{
        if (this.instance == null){
            this.instance = new LogicManager();
        }
        return this.instance!;
    }



    private logics:BaseLogic[] = [];

    private logicTypes:any = [];


    /**
     * 主要子游戏存在就这里边就应该有
     * @param logicType 
     * @returns 
     */
    public registerLogicTypes(logicType:any){
        for (let i = 0;i<this.logicTypes.length;i++){
            if(this.logicTypes[i] == logicType){
                console.error(`重复添加${cc.js.getClassName(logicType)}`);
                return;
            }
        }
        this.logicTypes.push(logicType)
        let logic:BaseLogic = new logicType();
        this.logics.push(logic);
        logic.init();
    }




}