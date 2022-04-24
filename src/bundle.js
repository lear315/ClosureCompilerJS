(function () {
    'use strict';

    var Scene = Laya.Scene;
    var REG = Laya.ClassUtils.regClass;
    var ui;
    (function (ui) {
        var test;
        (function (test) {
            class TestSceneUI extends Scene {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("test/TestScene");
                }
            }
            test.TestSceneUI = TestSceneUI;
            REG("ui.test.TestSceneUI", TestSceneUI);
        })(test = ui.test || (ui.test = {}));
    })(ui || (ui = {}));

    var RenderTextureFormat;
    (function (RenderTextureFormat) {
        RenderTextureFormat[RenderTextureFormat["R8G8B8"] = 0] = "R8G8B8";
        RenderTextureFormat[RenderTextureFormat["R8G8B8A8"] = 1] = "R8G8B8A8";
        RenderTextureFormat[RenderTextureFormat["Alpha8"] = 2] = "Alpha8";
        RenderTextureFormat[RenderTextureFormat["R16G16B16A16"] = 14] = "R16G16B16A16";
        RenderTextureFormat[RenderTextureFormat["Depth"] = 15] = "Depth";
        RenderTextureFormat[RenderTextureFormat["ShadowMap"] = 16] = "ShadowMap";
    })(RenderTextureFormat || (RenderTextureFormat = {}));
    class GameUI extends ui.test.TestSceneUI {
        constructor() {
            super();
            this.curscene = Laya.stage.addChild(new Laya.Scene3D());
            this.curscene.ambientMode = Laya.AmbientMode.SolidColor;
            this.curscene.ambientColor = new Laya.Vector3(0.5490196168422699, 0.5490196168422699, 0.5490196168422699);
            var camera = (this.curscene.addChild(new Laya.Camera(0, 0.1, 100)));
            camera.transform.translate(new Laya.Vector3(0, 3, 3));
            camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
            var directionLight = this.curscene.addChild(new Laya.DirectionLight());
            directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
            directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));
            let demoIndex = 0;
            switch (demoIndex) {
                case 0:
                    this.loadZip0();
                    break;
                case 1:
                    this.loadZip1();
                    break;
                case 2:
                    this.loadZip2();
                    break;
                case 3:
                    this.loadZip3();
                    break;
                case 4:
                    this.loadZip4();
                    break;
                case 5:
                    this.loadZip5();
                    break;
                case 6:
                    this.loadZip6();
                    break;
                case 7:
                    this.loadZip7();
                    break;
                default:
                    break;
            }
        }
        loadZip0() {
            Laya.loader.create([{ url: "res/zip/player.zip", type: LayaZip.ZIP }], Laya.Handler.create(this, () => {
                let player1 = Laya.loader.getRes("res/zip/player/PeasantMale06.lh").clone();
                this.curscene.addChild(player1);
            }));
        }
        loadZip1() {
            Laya.loader.create([{ url: "res/zip/player.zip", type: LayaZip.ZIP, constructParams: ["Others/AngelMale01.lh", "Others/Knight Female Knight 06.lh"] }], Laya.Handler.create(this, () => {
                let player1 = Laya.loader.getRes("res/zip/player/Others/AngelMale01.lh").clone();
                player1.transform.localPosition = new Laya.Vector3();
                this.curscene.addChild(player1);
                let player2 = Laya.loader.getRes("res/zip/player/Others/Knight Female Knight 06.lh").clone();
                player2.transform.localPosition = new Laya.Vector3(0, 0, -2);
                this.curscene.addChild(player2);
            }));
        }
        loadZip2() {
            Laya.loader.create([{ url: "res/zip/player.zip", type: LayaZip.ZIP, propertyParams: ["Others/"] }], Laya.Handler.create(this, () => {
                let player2 = Laya.loader.getRes("res/zip/player/Others/Knight Female Knight 06.lh").clone();
                player2.transform.localPosition = new Laya.Vector3(0, 0, 0);
                this.curscene.addChild(player2);
            }));
        }
        loadZip3() {
            LayaZip.LazyMode = true;
            Laya.loader.create([{ url: "res/zip/player.zip", type: LayaZip.ZIP }], Laya.Handler.create(this, () => {
                let player2 = Laya.loader.getRes("res/zip/player/Others/AngelMale01.lh").clone();
                player2.transform.localPosition = new Laya.Vector3(0, 0, -1);
                this.curscene.addChild(player2);
            }));
        }
        loadZip4() {
            LayaZip.BasePathMode = 1;
            Laya.loader.create([{ url: "res/zip/player.zip", type: LayaZip.ZIP }], Laya.Handler.create(this, () => {
                let player2 = Laya.loader.getRes("res/zip/PeasantMale06.lh").clone();
                player2.transform.localPosition = new Laya.Vector3(0, 0, -1);
                this.curscene.addChild(player2);
            }));
        }
        loadZip5() {
            LayaZip.BasePathMode = 2;
            Laya.loader.create([{ url: "res/zip/player.zip", type: LayaZip.ZIP }], Laya.Handler.create(this, () => {
                let player2 = Laya.loader.getRes("PeasantMale06.lh").clone();
                player2.transform.localPosition = new Laya.Vector3(0, 0, -1);
                this.curscene.addChild(player2);
            }));
        }
        loadZip6() {
            Laya.loader.create([{ url: "res/zip/player.zip", type: LayaZip.ZIP }], Laya.Handler.create(this, () => {
                let json = Laya.loader.getRes("res/zip/player/GoodAttr.json");
                let text = new Laya.Text();
                text.width = 500;
                text.color = "#FF0000";
                text.wordWrap = true;
                text.text = JSON.stringify(json);
                Laya.stage.addChild(text);
            }));
        }
        loadZip7() {
            Laya.loader.create([{ url: "res/zip/player.zip", type: LayaZip.ZIP }], Laya.Handler.create(this, () => {
                let img = new Laya.Image("res/zip/player/layabox.png");
                Laya.stage.addChild(img);
            }));
        }
    }

    class GameConfig {
        constructor() { }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("script/GameUI.ts", GameUI);
        }
    }
    GameConfig.width = 640;
    GameConfig.height = 1136;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "test/TestScene.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    class Main {
        constructor() {
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.alertGlobalError(true);
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            LayaZip.Init();
            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
        }
    }
    new Main();

}());
