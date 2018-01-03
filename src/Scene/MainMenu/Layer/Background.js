var MMBackgroundLayer = cc.Layer.extend({
    ctor: function () {
        this._super();

        // 初始化资源
        cc.spriteFrameCache.addSpriteFrames(res.MMainScene_plist);

        // 加载背景
        this.loadBackground();

        return true;

    },
    loadBackground: function () {
        var node = new cc.Sprite("#mainbg.png");
        this.addChild(node);
        node.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
    }
});