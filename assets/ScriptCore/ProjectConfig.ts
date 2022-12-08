/*
 * @Description: 项目配置
 * @Author: Super_Javan
 * @Date: 2022-11-29 18:14:06
 * @LastEditTime: 2022-11-29 18:14:14
 * @LastEditors: Super_Javan
 */


export namespace ProjectConfig {

    //是否跳过登录界面直接登录
    export const IsJumpLogin = true;

    export const isDebug = true;

    //是否跳过热更新检查
    export const isJumpCheckUpdate = true;

    export const DesignScreenWidth = 720;
    export const DesignScreenHeight = 1280;

    //背景的宽度和高度
    export const BackDesignScreenWidth = 720;
    export const BackDesignScreenHeight = 1600;

    export const DesignScreenDirection = "landscape";
    export const DesignScreenFit = "fit-height";


    // 是否为本地开发测试.
    export const bIsLocalDevelop = true;
    // 默认配置为本地开发.
    export const AppId = "5c56d1644966f078bfb90c71";
    export const AuthKey = "www.jxjy.games.cn";

    export const HttpHost = "http://192.168.1.230/dbmis/public/game/api/";
    export const HttpHost_IP = "http://192.168.1.246/ip2region/public/";

    export const HotUpdateUrl = "http://192.168.1.9/vitetname/updatetips/versiontips.txt";                                    //热更新地址


    //渠道号
    export const Channel_ID: string = "0";

    //平台
    export const Platform_ID: string = "1";

    // Need initialized once.
    export function init(): void {
        // 如果标记为非本地开发, 走外网配置
        if (ProjectConfig.bIsLocalDevelop) {
            return;
        }

        // ProjectConfig.GameHost                      = CustomTypes.GameHostInfo.create("192.168.1.240", 11002);      // 外网
        // ProjectConfig.HttpHost                      = "http://192.168.1.230/dbmis/public/game/api/";
        // ProjectConfig.HttpHost_IP                   = "http://192.168.1.246/ip2region/public/";
    }

    //websocket的连接配置和端口  240 and port


   
    //内网测试
    //export const HOST = "192.168.10.240";

    //export const HOST = "192.168.10.233";

}

// 初始化项目配置.
//ProjectConfig.init();