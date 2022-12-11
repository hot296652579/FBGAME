/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2022-12-05 16:33:29
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2022-12-05 16:33:33
 * @FilePath: \FBGame\assets\Battle\Script\games\config\Config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default class Config {

    /**
     * 机器人相关的事件驱动
     */
    static AI_FIRE: string = "__AI__FIRE__";
    /**
     * 人类相关的事件驱动
     */
    static HUMAN_FIRE: string = "__HUMAN__FIRE__";
}

export class SpineConfig{
     static spinesConfig = {
        ['contra'] : {
            path:'',
            scale:1,
            guns:['gun0','gun1','gun2']
        }
    }
}
