/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2022-12-05 15:42:34
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2022-12-05 15:52:02
 * @FilePath: \FBGame\assets\Battle\Script\games\dto\SitDownDTO.ts
 * @Description: 坐下动作
 */
export default class SitDownDTO{
    userId:number;
    /**椅子编号*/
    chair:number;
    /**玩家昵称*/
    nickName:string;

    constructor(userId:number,chair:number,nickName:string){
        this.userId = userId;
        this.chair = chair;
        this.nickName = nickName;
    }
}