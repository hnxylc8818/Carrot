var MMUnlockLayer = cc.LayerColor.extend({
    layout: null,
    ctor: function (data) {
        this._super();
        this.loadLayout();
        this.loadBackground();
        this.loadUnlockBtn(data);
    },
    // 加载布局
    loadLayout: function () {
        var node = new ccui.Layout();
        this.addChild(node);
        this.layout = node;
        node.setContentSize(cc.winSize);    // 设置内容大小
        node.setTouchEnabled(true);         // 开启触摸
        this.setOpacity(200);

        this.layout.addTouchEventListener(function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    sender.getParent().removeFromParent();
                    break;
            }
        });
    },
    // 加载背景
    loadBackground: function () {
        var node = new ccui.ImageView();
        node.loadTexture("checkcheck_bg.png", ccui.Widget.PLIST_TEXTURE);
        this.layout.addChild(node);
        this.background = node;
        node.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);

        var textNode = new ccui.ImageView();
        textNode.loadTexture("checkcheck_text_stage_2.png", ccui.Widget.PLIST_TEXTURE);
        node.addChild(textNode);
        textNode.setPosition(node.width / 2, node.height / 2 - 20);
    },
    // 加载解锁按钮
    loadUnlockBtn: function (data) {
        var node = new ccui.Button();
        this.background.addChild(node);
        node.loadTextures("checkcheck_pay_normal.png", "checkcheck_pay_pressed.png", "", ccui.Widget.PLIST_TEXTURE);
        node.setPosition(this.background.width / 2, this.background.height / 2 - 30);
        node.addTouchEventListener(function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_BEGAN:
                    cc.audioEngine.playEffect(res.Btn_Click_Effect_mp3);
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    var event = new cc.EventCustom(jf.EventName.UNLOCK);
                    event.setUserData({
                        isSuccess: true,
                        unLock:data
                    });
                    cc.eventManager.dispatchEvent(event);
                    break;
            }
        })
    }
});