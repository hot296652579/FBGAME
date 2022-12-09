/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2022-12-09 15:52:03
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2022-12-09 16:17:32
 * @FilePath: \FBGAME\assets\Battle\Script\games\events\FBGameEvent.ts
 * @Description: 游戏事件
 */
export default class FBGameEvent{
    /**
     * 坐下事件
     */
    static SIT_DOWN: string = "__SIT_DOWN__";
    /**
     * 开始游戏
     */
    static START_GAME: string = "__START_GAME__";
    /**
     * 显示
     */
    static OPEN_RESULT: string = "__SHOW_RESULT__";
    /**
     * 确认颜色
     */
    static CONFIRM_COLOR: string = "__CONFIRM_COLOR__";
    /**
     * 操作通知
     */
    static OPERATION_NOTIFY: string = "__OPERATION_NOTIFY__";
    /**
     * 移动
     */
    static MOVE_RESULT: string = "__MOVE_RESULT__";
    /**
     * 结束游戏
     */
    static END_GAME: string = "__END_GAME__";
}