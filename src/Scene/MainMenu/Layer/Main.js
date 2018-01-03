var MMMainLayer = cc.Layer.extend({
    actionDuration: 1,      // 时间基数，页面上所有节点运行的动作
    leaf2: null,
    leaf3: null,
    ctor: function () {
        this._super();

        // 加载 [冒险模式]、[BOSS模式]和[怪物窝] 菜单
        this.loadMenu();
        // 加载设置按钮
        this.loadSetting();
        // 加载帮助按钮
        this.loadHelp();
        // 加载云朵
        this.loadCloud();
        // 加载怪物1
        this.loadMonster();
        // 加载萝卜
        this.loadCarrot();
        // 加载 保卫萝卜 前景
        this.loadCarrotFantasy();
        // 加载前景
        this.loadForeground();
    },
    // 加载菜单
    loadMenu: function () {
        // 冒险模式
        var adventureNormal = new cc.Sprite("#btn_adventure_normal_CN.png");
        var adventurePress = new cc.Sprite("#btn_adventure_pressed_CN.png");
        var adventureDisabled = new cc.Sprite("#btn_adventure_normal_CN.png");

        var adventure = new cc.MenuItemSprite(
            adventureNormal,
            adventurePress,
            adventureDisabled,
            function () {
                cc.log("点击冒险模式按钮");
            }.bind(this)
        );
        adventure.setPosition(110, 45);

        // Boss模式
        var bossNormal = new cc.Sprite("#btn_boss_normal_CN.png");
        var bossPress = new cc.Sprite("#btn_boss_pressed_CN.png");
        var bossDisabled = new cc.Sprite("#btn_boss_normal_CN.png");

        var boss = new cc.MenuItemSprite(
            bossNormal,
            bossPress,
            bossDisabled,
            function () {
                cc.log("点击Boss模式按钮");
            }.bind(this)
        );
        boss.setPosition(310, 45);

        // 怪物窝
        var nestNormal = new cc.Sprite("#btn_nest_normal_CN.png");
        var nestPress = new cc.Sprite("#btn_nest_pressed_CN.png");
        var nestDisabled = new cc.Sprite("#btn_nest_normal_CN.png");

        var nest = new cc.MenuItemSprite(
            nestNormal,
            nestPress,
            nestDisabled,
            function () {
                cc.log("点击怪物窝按钮");
            }.bind(this)
        );
        nest.setPosition(510, 45);

        // 菜单
        var menu = new cc.Menu(adventure, boss, nest);
        this.addChild(menu);
        menu.setPosition(0, 0);

        // 锁
        var bossLocked = new cc.Sprite("#locked.png");
        var nestLocked = new cc.Sprite("#locked.png");

        this.addChild(bossLocked);
        this.addChild(nestLocked);

        bossLocked.setPosition(cc.winSize.width / 2 + 85, 35);
        nestLocked.setPosition(cc.winSize.width - 28, 35);
    },
    // 加载设置按钮
    loadSetting: function () {
        var settingNormal = new cc.Sprite("#btn_setting_normal.png");
        var settingPress = new cc.Sprite("#btn_setting_pressed.png");
        var settingDisabled = new cc.Sprite("#btn_setting_normal.png");

        var setting = new cc.MenuItemSprite(
            settingNormal,
            settingPress,
            settingDisabled,
            function () {
                cc.log("点击设置按钮");
            }.bind(this)
        );
        setting.setPosition(120, 145);

        var menu = new cc.Menu(setting);
        this.addChild(menu);
        menu.setPosition(0, 0);
    },
    // 加载帮助按钮
    loadHelp: function () {
        var helpNormal = new cc.Sprite("#btn_help_normal.png");
        var helpPress = new cc.Sprite("#btn_help_pressed.png");
        var helpDisabled = new cc.Sprite("#btn_help_normal.png");

        var help = new cc.MenuItemSprite(
            helpNormal,
            helpPress,
            helpDisabled,
            function () {
                cc.log("点击帮助按钮");
            }.bind(this)
        );
        help.setPosition(0, 145);
        // 帮助按钮动作
        var helpMoveBy1 = new cc.MoveBy(this.actionDuration, cc.p(cc.winSize.width - 120, 0));
        help.runAction(helpMoveBy1.easing(cc.easeBackOut()));

        var menu = new cc.Menu(help);
        this.addChild(menu);
        menu.setPosition(0, 0);

    },
    // 加载怪物
    loadMonster: function () {
        var bird = new cc.Sprite("#bird.png");
        this.addChild(bird);
        bird.setPosition(125, 310);

        // 怪物上下浮动动作
        var birdMoveBy = new cc.MoveBy(this.actionDuration * 1.5, cc.p(0, 25));
        var birdMoveByReverse = birdMoveBy.reverse();
        var birdSeq = new cc.sequence(birdMoveBy, birdMoveByReverse);
        bird.runAction(birdSeq.repeatForever());

    },
    // 加载云朵
    loadCloud: function () {
        var cloud1 = new cc.Sprite("#cloud1.png");
        var cloud2 = new cc.Sprite("#cloud2.png");

        this.addChild(cloud1);
        this.addChild(cloud2);

        cloud2.setPosition(-100, cc.winSize.height - 60);
        cloud1.setPosition(-100, cc.winSize.height - 100);

        // 云朵动作
        var cloud1Move = new cc.MoveTo(this.actionDuration * 20,cc.p(cc.winSize.width + 100,cc.winSize.height - 100));
        var cloud2Move = new cc.MoveTo(this.actionDuration * 20,cc.p(cc.winSize.width + 100,cc.winSize.height - 60));
        this.cloud2Action(cloud2,cloud2Move);
        this.scheduleOnce(function () {
            this.cloud1Action(cloud1,cloud1Move);
        },5);
    },
    // 云朵动作
    cloud2Action:function (cloud2,cloud2Move) {
        cloud2.runAction(new cc.sequence(
            cloud2Move,
            cc.delayTime(2),
            cc.callFunc(function () {
                cloud2.setPosition(-100,cc.winSize.height - 60);
                this.cloud2Action(cloud2,cloud2Move);
        },this)
        ));
    },
    cloud1Action:function (cloud1,cloud1Move) {
        cloud1.runAction(new cc.sequence(
           cloud1Move,
           cc.delayTime(2),
           cc.callFunc(function () {
               cloud1.setPosition(-100, cc.winSize.height - 100);
               this.cloud1Action(cloud1,cloud1Move);
           },this)
        ));
    },
    // 加载萝卜
    loadCarrot: function () {
        var carrot = new cc.Sprite("#carrot.png");
        var leaf1 = new cc.Sprite("#leaf-1.png");
        this.leaf2 = new cc.Sprite("#leaf-2.png");
        this.leaf3 = new cc.Sprite("#leaf-3.png");

        this.addChild(leaf1);
        this.addChild(this.leaf3);
        this.addChild(this.leaf2);
        this.addChild(carrot);

        carrot.setPosition(cc.winSize.width / 2, cc.winSize.height / 2 + 35);
        this.leaf2.setPosition(cc.winSize.width / 2, cc.winSize.height / 2 + 115);
        leaf1.setPosition(cc.winSize.width / 2 - 40, cc.winSize.height / 2 + 100);
        this.leaf3.setPosition(cc.winSize.width / 2 + 45, cc.winSize.height / 2 + 100);

        this.schedule(this.leafShake, 5, 16 * 1024, 1);

    },
    // 叶子抖动动作
    leafShake: function () {
        // 叶子动作
        var shakeAction = cc.shake(0.4, 25, 0);
        this.leaf2.runAction(new cc.sequence(shakeAction, cc.callFunc(function () {
            var shakeAction = cc.shake(0.4, 25, 0);
            this.leaf3.runAction(cc.sequence(cc.delayTime(1), shakeAction));
        }, this)));
    },
    // 加载萝卜右侧怪物2
    loadCarrotFantasy: function () {
        var carrotFantasy = new cc.Sprite("#mainbg_CN.png");
        this.addChild(carrotFantasy);

        carrotFantasy.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
    },
    // 加载前景
    loadForeground: function () {
        // 心
        var heartNormal = new cc.Sprite("#weiboicon03_normal.png");
        var heartPress = new cc.Sprite("#weiboicon03_press.png");
        var heartDisabled = new cc.Sprite("#weiboicon03_normal.png");

        var heart = new cc.MenuItemSprite(
            heartNormal,
            heartPress,
            heartDisabled,
            function () {
                cc.log("点击点心按钮");
            }.bind(this)
        );
        heart.setPosition(35, cc.winSize.height - 35);
        // 微博
        var weiboNormal = new cc.Sprite("#weiboicon01_normal.png");
        var weiboPress = new cc.Sprite("#weiboicon01_press.png");
        var weiboDisabled = new cc.Sprite("#weiboicon01_normal.png");

        var weibo = new cc.MenuItemSprite(
            weiboNormal,
            weiboPress,
            weiboDisabled,
            function () {
                cc.log("点击微博按钮");
            }.bind(this)
        );
        weibo.setPosition(90, cc.winSize.height - 35);
        // facebook
        var facebookNormal = new cc.Sprite("#weiboicon04_normal.png");
        var facebookPress = new cc.Sprite("#weiboicon04_press.png");
        var facebookDisabled = new cc.Sprite("#weiboicon04_normal.png");

        var facebook = new cc.MenuItemSprite(
            facebookNormal,
            facebookPress,
            facebookDisabled,
            function () {
                cc.log("点击facebook按钮");
            }.bind(this)
        );
        facebook.setPosition(145, cc.winSize.height - 35);
        // 超值活动
        var chaozhiNormal = new cc.Sprite("#chaozhi_normal.png");
        var chaozhiPress = new cc.Sprite("#chaozhi_pressed.png");
        var chaozhiDisabled = new cc.Sprite("#chaozhi_normal.png");

        var chaozhi = new cc.MenuItemSprite(
            chaozhiNormal,
            chaozhiPress,
            chaozhiDisabled,
            function () {
                cc.log("点击超值活动按钮");
            }.bind(this)
        );
        chaozhi.setPosition(215, cc.winSize.height - 35);
        // 更多游戏
        var moregameNormal = new cc.Sprite("#moregame_normal.png");
        var moregamePress = new cc.Sprite("#moregame_pressed.png");
        var moregameDisabled = new cc.Sprite("#moregame_normal.png");

        var moregame = new cc.MenuItemSprite(
            moregameNormal,
            moregamePress,
            moregameDisabled,
            function () {
                cc.log("点击更多游戏按钮");
            }.bind(this)
        );
        moregame.setPosition(310, cc.winSize.height - 35);
        // news
        var newsBg = new cc.Sprite("#btn_bg.png");
        this.addChild(newsBg);
        newsBg.setPosition(cc.winSize.width - 65, cc.winSize.height - 52);

        var newsNormal = new cc.Sprite("#news_normal.png");
        var newsPress = new cc.Sprite("#news_pressed.png");
        var newsDisabled = new cc.Sprite("#news_normal.png");

        var news = new cc.MenuItemSprite(
            newsNormal,
            newsPress,
            newsDisabled,
            function () {
                cc.log("点击新闻按钮");
            }.bind(this)
        );
        news.setPosition(cc.winSize.width - 32, cc.winSize.height - 35);

        var menu = new cc.Menu(heart, weibo, facebook, chaozhi, moregame, news);
        this.addChild(menu);
        menu.setPosition(0, 0);
    }
});


/**
 * 自定义抖动动作
 */
var Shake = cc.ActionInterval.extend({
    //节点初始位置
    nodeInitialPos: null,
    //X轴抖动幅度
    nodeShakeStrengthX: 0,
    //Y轴抖动幅度
    nodeShakeStrengthY: 0,
    //抖动时间
    duration: 0,
    ctor: function (duration, shakeStrengthX, shakeStrengthY) {
        cc.ActionInterval.prototype.ctor.call(this);
        this.duration = duration;
        this.initWithDuration(duration, shakeStrengthX, shakeStrengthY);

    },
    //获取两个数间的随机值
    getRandomStrength: function (min, max) {
        return Math.random() * (max - min + 1) + min;
    },
    update: function (dt) {
        var randX = this.getRandomStrength(-this.nodeShakeStrengthX, this.nodeShakeStrengthX) * dt;
        var randY = this.getRandomStrength(-this.nodeShakeStrengthY, this.nodeShakeStrengthY) * dt;
//        cc.log("randX:"+randX+",randY="+randY);
        this.target.setPosition(cc.pAdd(this.nodeInitialPos, cc.p(randX, randY)));
    },
    initWithDuration: function (duration, shakeStrengthX, shakeStrengthY) {
        if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
            this.nodeShakeStrengthX = shakeStrengthX;
            this.nodeShakeStrengthY = shakeStrengthY == 'undefined' ? shakeStrengthX : shakeStrengthY;
            return true;
        }
        return false;
    },
    startWithTarget: function (target) {
        cc.ActionInterval.prototype.startWithTarget.call(this, target);
        this.nodeInitialPos = target.getPosition();
    },
    stop: function () {
        this.target.setPosition(this.nodeInitialPos);
    }
});
/**
 * 自定义抖动动作
 * @param {float}duration 抖动时间
 * @param {number}shakeStrengthX X轴抖动幅度
 * @param {number}shakeStrengthY Y轴抖动幅度
 * @returns {Shake}
 */
cc.shake = function (duration, shakeStrengthX, shakeStrengthY) {
    return new Shake(duration, shakeStrengthX, shakeStrengthY);
};

/**
 * 自定义抖动效果，用于WEB和JSB环境
 * @param {float}duration 抖动时间
 * @param {number}shakeStrengthX X轴抖动幅度
 * @param {number}shakeStrengthY Y轴抖动幅度
 * @param {cc.Node}shakeNode 抖动节点
 * @param {string}key 唯一key(WEB环境)
 * @example:
 * var shakeAction = new Shake2(0.5,20,20,node,"shakeKey");
 * shakeAction.shake();
 */
var Shake2 = cc.Class.extend({
    //抖动时间
    duration: 0,
    //已抖动时间
    dtCost: 0,
    //X轴抖动范围
    shakeStrengthX: 0,
    shakeStrengthY: 0,
    //抖动节点
    shakeNode: null,
    //抖动节点初始位置
    nodeInitialPos: null,
    //定时器绑定回调
    bindCallback: null,
    //定时器唯一键(WEB)
    key: null,
    ctor: function (duration, shakeStrengthX, shakeStrengthY, shakeNode, key) {
        this.duration = duration;
        this.shakeStrengthX = shakeStrengthX;
        this.shakeStrengthY = shakeStrengthY;
        this.shakeNode = shakeNode;
        this.nodeInitialPos = shakeNode.getPosition();
        this.key = key;
    },
    shake: function () {
        this.bindCallback = this.doSchedule.bind(this);
        this.shakeNode.unschedule(this.bindCallback);
        if (cc.sys.isNative) {
            this.shakeNode.schedule(this.bindCallback, 0, cc.REPEAT_FOREVER, 0);
        } else {
            this.shakeNode.schedule(this.bindCallback, 0, cc.REPEAT_FOREVER, 0, this.key);
        }

    },
    doSchedule: function (dt) {
        var dt2 = dt * 50;
        var randX = this.getRandomStrength(-this.shakeStrengthX, this.shakeStrengthX) * dt2;
        var randY = this.getRandomStrength(-this.shakeStrengthY, this.shakeStrengthY) * dt2;
//        cc.log("randX:"+randX+",randY="+randY);
        this.shakeNode.setPosition(cc.pAdd(this.nodeInitialPos, cc.p(randX, randY)));
        this.dtCost += dt;
        if (this.dtCost >= this.duration) {
            this.shakeNode.unschedule(this.bindCallback);
            this.shakeNode.setPosition(this.nodeInitialPos);
        }
    },
    //获取两个数间的随机值
    getRandomStrength: function (min, max) {
        return Math.random() * (max - min + 1) + min;
    },
});