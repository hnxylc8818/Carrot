
var MainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var backgroundLayer = new MMBackgroundLayer();
        this.addChild(backgroundLayer);

        var mainLayer = new MMMainLayer();
        this.addChild(mainLayer);

        // 加载摇杆
        // this.loadRocker();

    },
    // 加载摇杆
    loadRocker: function () {
        var rocker = new Rocker(res.ROCKER_png, res.ROCKER_HANDLE_png, ROCKER_TYPE.DEFAULT);
        this.addChild(rocker);
        rocker.setCallback(function (vec) {
            cc.log("--------------");
            cc.log("速度，x：", vec.x, " y：", vec.y);
            cc.log("角度：",rocker._angle);
            cc.log("方向：",rocker._direction);
        }.bind(this));
        rocker.setPosition(cc.winSize.width / 2,cc.winSize.height / 2);
    }
});