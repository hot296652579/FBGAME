/*
 * @Description: 战旗游戏网络事件注册
 * @Author: Super_Javan
 * @Date: 2022-12-03 14:24:43
 * @LastEditTime: 2022-12-03 14:28:12
 * @LastEditors: Super_Javan
 */
export class FBGameNet{
    private static instance : FBGameNet | null = null;
    public static getInstance() {
        if (this.instance == null) {
            this.instance = new FBGameNet();
        }
        return this.instance;
    }

    public static destory(){
        if (this.instance != null) {
            this.instance.unregister();
        }
        this.instance = null;
    }

    /**
     * @description: 游戏的网络消息从这开始注册
     */    
    public register(){

    }

    //取消注册
    private unregister() {

    }
    
}