/*
 * @Description: 资源加载管理器
 * @Author: Super_Javan
 * @Date: 2022-11-29 11:39:55
 * @LastEditTime: 2022-11-29 21:45:53
 * @LastEditors: Super_Javan
 */


/**
 * 资源类型
 */
 export enum ResType {

    ResType_UnKnow = 0,                    //位置类型 该种资源不处理
    ResType_SpriteFrame = 1,                //图片资源 输出类型为 spriteFrame
    ResType_SpriteAtlas = 2,                //图集资源 输出类型为 SpriteAtlas 通过->getSpriteFrame() 能够获取对应的SpriteFrame 要求图集 plist和png的名字除了后缀是一样的
    ResType_AudioClip = 3,                  //音频资源 输出类型为 AudioClip   
    ResType_Prefab = 4,                     //预制体   输出类型为 Prefab
    ResType_Spine = 5,                      //骨骼动画资源 输出类型为 sp.SkeletionnData 要求三种资源类型必须一致
    ResType_Fnt = 6,                        //字体资源类型 输出格式为 LabelAtlas 要求 字体 fnt文件和png文件的名字除了后缀必须一致
    ResType_Animation = 7,                  //动画资源   输出格式为AnimationClip

    //一下几种是需要扩展的，以后会用到的。但是本次不准备实现
    ResType_Material = 8,                  //材质
    ResType_Shader = 9,                     //shader 高级效果展示，资源缓存的时候暂时不处理

    //粒子特效  粒子特效也可以动态加载进去。
    ResType_Particle = 10,                  //粒子特效
}

export class ResMgr{
    private static instance: ResMgr;
    public static getInstance() {
        if (this.instance == null) {
            this.instance = new ResMgr();
        }
        // assetManager.downloader.maxConcurrency = 100;

        return this.instance;
    }
    /**
     * @description: 加载list里面对应的每个文件(预设,spriteFrame,图集,音频等)
     * @param {Map} list
     * @param {*} number
     * @param {Function} progressCb
     * @param {Function} completeCallBack
     * @param {*} resType
     * @param {*} boolean
     */
    public async preLoad(list: Map<string, number>, progressCb: Function, completeCallBack: Function, resType?: & Map<ResType, boolean>) {
        if (resType == null || resType == undefined) {
            resType = new Map<ResType, boolean>();
        }
        if (resType.size == 0) {
            resType!.set(ResType.ResType_Prefab, true);
            resType!.set(ResType.ResType_AudioClip, true);
        }
        this.preloadProgressCallBack = progressCb;
        this.preloadCompleteCallBack = completeCallBack;
        this.loadProgress = cc.js.createMap();
        let map = list;
        let idx = 0;
        for (let key of map.keys()) {
            idx++;
            if (map.get(key) == ResType.ResType_Prefab &&
                resType!.has(ResType.ResType_Prefab) &&
                resType!.get(ResType.ResType_Prefab)) {
                //加载 预制体 prefab
                this.loadProgress[key] = 0;
                setTimeout(() => {
                    this.preloadBundlePrefab(key);
                }, 0);
            }
            else if (map.get(key) == ResType.ResType_SpriteFrame &&
                resType!.has(ResType.ResType_SpriteFrame) &&
                resType!.get(ResType.ResType_SpriteFrame)) {
                //图片 spriteFrame
                this.loadProgress[key] = 0;
                setTimeout(() => {
                    this.preloadBunleSpriteFrame(key);
                }, 0);

            } else if (map.get(key) == ResType.ResType_SpriteAtlas &&
                resType!.has(ResType.ResType_SpriteAtlas) &&
                resType!.get(ResType.ResType_SpriteAtlas)
            ) {
                //图集 spriteAtlas
                this.loadProgress[key] = 0;
                setTimeout(() => {
                    // this.preloadBundleSpriteAtlas(key);
                }, 0);

            } else if (map.get(key) == ResType.ResType_AudioClip &&
                resType!.has(ResType.ResType_AudioClip) &&
                resType!.get(ResType.ResType_AudioClip)
            ) {
                //音频资源 AudioClip
                this.loadProgress[key] = 0;
                setTimeout(() => {
                    // this.preloadBundleAudioClip(key);
                }, 0);

            } else if (map.get(key) == ResType.ResType_Material &&
                resType!.has(ResType.ResType_Material) &&
                resType!.get(ResType.ResType_Material)
            ) {
                this.loadProgress[key] = 0;
                setTimeout(() => {
                    // this.preloadBundleMaterial(key);
                }, 0);

            } else if (map.get(key) == ResType.ResType_Particle &&
                resType!.has(ResType.ResType_Particle) &&
                resType!.get(ResType.ResType_Particle)
            ) {
                this.loadProgress[key] = 0;

                setTimeout(() => {
                    // this.preloadBundleParticleAsset(key);
                }, 0);
            }
        }
        setTimeout(() => {
            this.calProgress(1);
        }, 200);
    }

    private preloadProgressCallBack: Function | null = null;

    private preloadCompleteCallBack: Function | null = null;


    private subGameBundle:Map<string,cc.AssetManager.Bundle> = new Map<string,cc.AssetManager.Bundle>();
    /**
     * @description: 仅仅加载bunle。主要用途为：子游戏在进入之前，要先加载bundle，然后才能执行对应的逻辑
    大厅字游戏必须保证 大厅对子游戏没有资源和代码引用。
    子游戏可以引用大厅的逻辑代码和资源
     */    
    public preloadBundleOnly(bundleName:string):Promise<boolean>{
        return new Promise<boolean>((resolve, reject) => {
            if (this.subGameBundle.has(bundleName)) {
                resolve(true);
                return;
            }
            cc.assetManager.loadBundle(bundleName, (err, bundle: cc.AssetManager.Bundle) => {
                if (err != null) {
                    resolve(false);
                    return;
                }
                this.subGameBundle.set(bundleName, bundle);
                resolve(true);
            });
        });
    }

    /**
     * @description: 需要加载到内存中的  以后先从内存中获取
     */    
    //预设资源
    private loadPrefabWithBundleKey:Map<string,Map<string,cc.Prefab>> = new Map<string,Map<string,cc.Prefab>>();
    //SpriteFrame资源
    private loadSpriteFrameWithBundleKey:Map<string,Map<string,cc.SpriteFrame>> = new Map<string,Map<string,cc.SpriteFrame>>();
    //合图的图集资源
    private loadSpriteAtlasWithBundleKey: Map<string, Map<string, cc.SpriteAtlas>> = new Map<string, Map<string, cc.SpriteAtlas>>();
    //音频资源
    private loadAudioClipWithBundleKey: Map<string, Map<string, cc.AudioClip>> = new Map<string, Map<string, cc.AudioClip>>();
    private loadProgress :{[key:string]:number} = cc.js.createMap();
    /**
     * @description: 预加载bundle对应的 prefabs
     * @param {string} formName
     */    
    public async preloadBundlePrefab(formName:string){
        let data = this.splitFormName(formName);
        let bundleName = data.bundle;
        let prefabName = data.prefabName;
        if (this.loadPrefabWithBundleKey.has(bundleName) && this.loadPrefabWithBundleKey.get(bundleName)?.has(formName)) {
            this.loadProgress[formName] = 1;
            this.calProgress(2);
            return;
        }
        let bundle = this.subGameBundle.get(bundleName);
        if (bundle == undefined) {
            console.error(`${bundleName}不存在`);
            return;
        }
        if (!this.loadPrefabWithBundleKey.has(bundleName)) {
            this.loadPrefabWithBundleKey.set(bundleName, new Map<string, cc.Prefab>());
        }
        bundle!.load<cc.Prefab>(prefabName, (loadCnt: number, allCnt: number, item: cc.AssetManager.RequestItem) => {
            this.loadProgress[formName] = loadCnt / allCnt;
            this.calProgress(0);
        }, (err, prefab: cc.Prefab) => {
            if (err != null) {
                console.log(err);
                console.warn(`${formName}加载失败`);
            } else {
                this.loadProgress[formName] = 1;
                if (!this.loadPrefabWithBundleKey.has(bundleName)) {
                    this.loadPrefabWithBundleKey.set(bundleName, new Map<string, cc.Prefab>());
                }
                this.loadPrefabWithBundleKey.get(bundleName)!.set(formName, prefab);
                this.loadPrefabWithBundleKey.get(bundleName)!.get(formName)!.addRef();
                this.calProgress(1);
            }
        });
    }
    public getPrefabByPath(path: string): cc.Prefab | null {
        let data = this.splitFormName(path);
        let bundleName = data.bundle;
        if (this.loadPrefabWithBundleKey.has((bundleName)) && this.loadPrefabWithBundleKey.get(bundleName)!.has(path)) {
            this.loadPrefabWithBundleKey.get(bundleName)!.get(path)!.addRef();
            return this.loadPrefabWithBundleKey.get(bundleName)!.get(path)!;
        }
        return null;
    }

    //销毁一个prefab
    public destoryPrefabByPath(path: string) {
        let data = this.splitFormName(path);
        let bundleName = data.bundle;
        if (this.loadPrefabWithBundleKey.has(bundleName) && this.loadPrefabWithBundleKey.get(bundleName)!.has(path)) {
            if (this.loadPrefabWithBundleKey.get(bundleName)!.get(path)!.refCount > 1) {
                this.loadPrefabWithBundleKey.get(bundleName)!.get(path)!.decRef();
            }
        }
    }

    public async preloadBunleSpriteFrame(filePath: string) {
        let data = this.splitFormName(filePath);
        let bundleName = data.bundle;
        //单个资源如果要读取到spriteFrame，必须后边加上spriteFrame路径
        let spriteFrameName = data.prefabName;


        if (this.loadSpriteFrameWithBundleKey.has(bundleName) && this.loadSpriteFrameWithBundleKey.get(bundleName)?.has(filePath)) {
            this.loadProgress[filePath] = 1;
            this.calProgress(2);
            return;
        }
        let bundle = this.subGameBundle.get(bundleName);
        if (bundle == undefined) {
            console.error(`${bundleName}不存在`);
            return;
        }
        if (!this.loadSpriteFrameWithBundleKey.has(bundleName)) {
            this.loadSpriteFrameWithBundleKey.set(bundleName, new Map<string, cc.SpriteFrame>());
        }
        bundle.load<cc.SpriteFrame>(spriteFrameName, (loadCnt: number, allCnt: number, item: cc.AssetManager.RequestItem) => {
            this.loadProgress[filePath] = loadCnt / allCnt;
            this.calProgress(0);
        }, (err, spriteFrame: cc.SpriteFrame) => {
            if (err != null) {
                console.log(err);
                console.error(`${filePath}加载失败`);
            } else {
                this.loadProgress[filePath] = 1;
                if (!this.loadSpriteFrameWithBundleKey.has(bundleName)) {
                    this.loadSpriteFrameWithBundleKey.set(bundleName, new Map<string, cc.SpriteFrame>());
                }
                this.loadSpriteFrameWithBundleKey.get(bundleName)!.set(filePath, spriteFrame);
                this.loadSpriteFrameWithBundleKey.get(bundleName)!.get(filePath)!.addRef();
                this.calProgress(1);
            }
        })
    }

    /**
     * @description: 计算加载进度 更新进度条
     * @param {number} state
     */
    public calProgress(state: number) {
        let progress = 0;
        let allCnt = 0;
        for (let key in this.loadProgress) {
            allCnt = allCnt + 1;
            progress = progress + this.loadProgress[key];
        }
        if (this.preloadProgressCallBack != null) {
            this.preloadProgressCallBack(progress / allCnt);
        }
        if (progress / allCnt == 1 && state == 1) {
            this.preloadProgressCallBack = null;
            if (this.preloadCompleteCallBack != null) {
                this.preloadCompleteCallBack();
                this.preloadCompleteCallBack = null;
            }
        }
    }

    //将prefab的路径分隔为 bundle 和 prefabName
    public splitFormName(formName: string): { bundle: string, prefabName: string } {
        let result = { bundle: "", prefabName: "" };
        let arr = formName.split('/');
        if (arr.length <= 0) {
            return result;
        }
        let bundleName = arr[0];
        let prefabName: string = "";
        for (let k = 1; k < arr.length; k++) {
            prefabName = prefabName + arr[k] + "/";
        }
        prefabName = prefabName.substr(0, prefabName.length - 1);
        result.bundle = bundleName;
        result.prefabName = prefabName;
        return result;
    }

    /**
     * 1:优先判定常驻窗体中有没有节点
     * 需要先判定对应的bundle是否加载了
     * 切割formName为 bundleName prefabName
     * todo dev 这里以后配置成远程包的时候还需要处理为 远程资源的加载
     * @param formName 
     */
     public async loadForm(formName: string): Promise<cc.Prefab | null> {
        return new Promise((resolve, reject) => {

            if (!formName || formName.length <= 0) {
                resolve(null);
            }
            let data = this.splitFormName(formName);
            let bundleName = data.bundle;
            let prefabName = data.prefabName;

            //如果缓存中有 则直接从缓存中获取，一般情况就是到这里就返回了。因为进入 字游戏或者大厅的时候就会预加载的
            if (this.loadPrefabWithBundleKey.has(bundleName) && this.loadPrefabWithBundleKey.get(bundleName)!.has(formName)) {
                resolve(this.loadPrefabWithBundleKey.get(bundleName)!.get(formName)!)
                return;
            }

            cc.assetManager.loadBundle(bundleName, (err, bundle: cc.AssetManager.Bundle) => {
                if (err != null) {
                    cc.error(`${bundleName}加载失败`);
                    resolve(null);
                    return;
                }
                this.subGameBundle.set(bundleName, bundle);
                if (!this.loadPrefabWithBundleKey.has(bundleName)) {
                    this.loadPrefabWithBundleKey.set(bundleName, new Map<string, cc.Prefab>());
                }
                bundle.load<cc.Prefab>(prefabName, (err, prefab: cc.Prefab) => {
                    if (err != null) {
                        cc.error(`${prefabName}加载失败`);
                        resolve(null);
                        return;
                    }
                    //每加载一次prefab就保存一下。
                    //this.prefabs[formName] = prefab;
                    if (!this.loadPrefabWithBundleKey.has(bundleName)) {
                        this.loadPrefabWithBundleKey.set(bundleName, new Map<string, cc.Prefab>());
                    }
                    this.loadPrefabWithBundleKey.get(bundleName)?.set(formName, prefab);
                    prefab.addRef();
                    resolve(prefab);
                });
            });
        });
    }

     /**
      * @description:释放当前bundle中的所有动态加载的资源
      */
     public releaseAllResByList(list: Map<string, number>) {

        let bName = "";
        for (let key of list.keys()) {
            let resData = this.splitFormName(key);
            let bundleName = resData.bundle;
            bName = bundleName;
            if (list.get(key) == ResType.ResType_SpriteFrame) {
                if (!this.loadSpriteFrameWithBundleKey.has(bundleName)) {
                    continue;
                }

                if (!this.loadSpriteFrameWithBundleKey.get(bName)!.has(key)) {
                    continue;
                }
                while (this.loadSpriteFrameWithBundleKey.get(bName)!.get(key)!.refCount > 0) {
                    this.loadSpriteFrameWithBundleKey.get(bName)!.get(key)!.decRef();
                }
                this.loadSpriteFrameWithBundleKey.get(bName)!.delete(key);
            } else if (list.get(key) == ResType.ResType_SpriteAtlas) {
                // 释放图集资源
                // if (!this.loadSpriteAtlasWithBundleKey.has(bundleName)) {
                //     continue;
                // }
                // if (!this.loadSpriteAtlasWithBundleKey.get(bName)!.has(key)) {
                //     continue;
                // }
                // while (this.loadSpriteAtlasWithBundleKey.get(bName)!.get(key)!.refCount > 0) {
                //     this.loadSpriteAtlasWithBundleKey.get(bName)!.get(key)!.decRef();
                // }
                // this.loadSpriteAtlasWithBundleKey.get(bName)!.delete(key);
            } else if (list.get(key) == ResType.ResType_Prefab) {
                //预制体资源
                if (!this.loadPrefabWithBundleKey.has(bundleName)) {
                    continue;
                }
                if (!this.loadPrefabWithBundleKey.get(bName)!.has(key)) {
                    continue;
                }
                while (this.loadPrefabWithBundleKey.get(bName)!.get(key)!.refCount > 0) {
                    this.loadPrefabWithBundleKey.get(bName)!.get(key)!.decRef();
                }
                this.loadPrefabWithBundleKey.get(bName)!.delete(key);
            } else if (list.get(key) == ResType.ResType_AudioClip) {
                //音频资源
                // if (!this.loadAudioClipWithBundleKey.has(bundleName)) {
                //     continue;
                // }
                // bName = bundleName;
                // if (!this.loadAudioClipWithBundleKey.get(bName)!.has(key)) {
                //     continue;
                // }
                // while (this.loadAudioClipWithBundleKey.get(bName)!.get(key)!.refCount > 0) {
                //     this.loadAudioClipWithBundleKey.get(bName)!.get(key)!.decRef();
                // }
                // this.loadAudioClipWithBundleKey.get(bName)!.delete(key);
            }

        }
        if (bName != "") {
            this.loadPrefabWithBundleKey.delete(bName);
            this.loadAudioClipWithBundleKey.delete(bName);
            this.loadSpriteFrameWithBundleKey.delete(bName);
            this.loadSpriteAtlasWithBundleKey.delete(bName);

            if (this.subGameBundle.has(bName)) {
                this.subGameBundle.delete(bName);
            }
            //调用了 releaseAll 应该不需要再 desRef() 方法了。源码中tryRelease就是将
            //这里releaaseAll还不能调用，如果调用，第二次加载sprite的时候还是有问题的。 暂时不调用，但是回头要处理一下
            //需要调用releaseAll否则有的资源释放不掉
            cc.assetManager.getBundle(bName)!.releaseAll();
            cc.assetManager.removeBundle(cc.assetManager.getBundle(bName)!);

            console.log("releaseAll执行了-----", bName);
        }
    }

    //#region spriteFrame的处理 加载 获取 销毁
    public getSpriteFrameByPath(path: string): cc.SpriteFrame | null {
        let data = this.splitFormName(path);
        let bundleName = data.bundle;
        if (this.loadSpriteFrameWithBundleKey.has(bundleName) && this.loadSpriteFrameWithBundleKey.get(bundleName)!.has(path)) {
            this.loadSpriteFrameWithBundleKey.get(bundleName)!.get(path)!.addRef();
            return this.loadSpriteFrameWithBundleKey.get(bundleName)!.get(path)!;
        }
        return null;
    }

    //销毁一个form对应的一个资源
    public destoryForm(formName: string) {
        if (formName == null || formName == undefined || formName.length <= 0) {
            return;
        }
        console.log(`destoryForm${formName}`);
        let data = this.splitFormName(formName);
        if (this.loadPrefabWithBundleKey.has(data.bundle) && this.loadPrefabWithBundleKey.get(data.bundle)!.has(formName)) {
            //窗体被销毁减少引用计数
            if (this.loadPrefabWithBundleKey.get(data.bundle)!.get(formName)!.refCount > 1) {
                this.loadPrefabWithBundleKey.get(data.bundle)!.get(formName)!.decRef();
            }
        }
    }
}