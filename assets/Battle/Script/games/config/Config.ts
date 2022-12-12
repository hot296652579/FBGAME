/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2022-12-05 16:33:29
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2022-12-12 17:16:58
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
        [0x00] : {
            spine:'contra',
            
            scale:1,
            skins:['gun0','gun1','gun2']
        },
        [0x01] : {
            spine:'contra2',
            
            scale:1,
            skins:['gun0','gun1','gun2']
        },
        [0x02] : {
            spine:'contra3',
            
            scale:1,
            skins:['gun0','gun1','gun2']
        },
        [0x03] : {
            spine:'contra4',
            
            scale:1,
            skins:['gun0','gun1','gun2']
        },
        [0x04] : {
            spine:'contra5',
            
            scale:1,
            skins:['gun0','gun1','gun2']
        },
        [0x05] : {
            spine:'enemy1',
            scale:1,
            skins:['enemy2']
        },
        [0x06] : {
            spine:'enemy3',
            scale:1,
            skins:['default']
        },
        [0x07] : {
            spine:'sniper',
            
            scale:1,
            skins:['default']
        },
        [0x10] : {
            spine:'contra',
            
            scale:1,
            skins:['gun0','gun1','gun2']
        },
        [0x11] : {
            spine:'contra2',
            
            scale:1,
            skins:['gun0','gun1','gun2']
        },
        [0x12] : {
            spine:'contra3',
            
            scale:1,
            skins:['gun0','gun1','gun2']
        },
        [0x13] : {
            spine:'contra4',
            
            scale:1,
            skins:['gun0','gun1','gun2']
        },
        [0x14] : {
            spine:'contra5',
            
            scale:1,
            skins:['gun0','gun1','gun2']
        },
        [0x15] : {
            spine:'enemy1',
            scale:1,
            skins:['enemy2']
        },
        [0x16] : {
            spine:'enemy3',
            scale:1,
            skins:['default']
        },
        [0x17] : {
            spine:'sniper',
            
            scale:1,
            skins:['default']
        }
    }
}
