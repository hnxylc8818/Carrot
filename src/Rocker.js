// 摇杆类型
var ROCKER_TYPE = ROCKER_TYPE || {};
ROCKER_TYPE.DEFAULT = "DEFAULT";    // 默认类型
ROCKER_TYPE.AUTO = "AUTO";          // 自动类型
ROCKER_TYPE.HIDE = "HIDE";          // 隐藏类型
ROCKER_TYPE.OPACITY = "255";        // 不透明类型

// 摇杆方向
var ROCKER_DIRECTION = ROCKER_DIRECTION || {};
ROCKER_DIRECTION.RIGHT = "RIGHT";           // 向右
ROCKER_DIRECTION.RIGHT_UP = "RIGHT_UP";     // 右上
ROCKER_DIRECTION.UP = "UP";                 // 向上
ROCKER_DIRECTION.LEFT_UP = "LEFT_UP";       // 左上
ROCKER_DIRECTION.LEFT = "LEFT";             // 向左
ROCKER_DIRECTION.LEFT_DOWN = "LEFT_DOWN";   // 左下
ROCKER_DIRECTION.DOWN = "DOWN";             // 向下
ROCKER_DIRECTION.RIGHT_DOWN = "RIGHT_DOWN"; // 右下
ROCKER_DIRECTION.ORIGIN = "ORIGIN";         // 原点
// 方向数组
var ROCKER_DIRECTION_ARRAY = [
    ROCKER_DIRECTION.RIGHT,
    ROCKER_DIRECTION.RIGHT_UP,
    ROCKER_DIRECTION.UP,
    ROCKER_DIRECTION.LEFT_UP,
    ROCKER_DIRECTION.LEFT,
    ROCKER_DIRECTION.LEFT_DOWN,
    ROCKER_DIRECTION.DOWN,
    ROCKER_DIRECTION.RIGHT_DOWN,
    ROCKER_DIRECTION.ORIGIN
];
// 8个方向的角度数组
var ROCKER_ANGLE_ARRAY = [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5];


// 摇杆精灵
var Rocker = cc.Sprite.extend({
    _baseNode: null,         // 底盘
    _knobNode: null,         // 把手
    _touchListener: null,    // 触摸事件
    _radius: 0,              // 摇杆的可移动半径
    _angle: 0,               // 角度
    _velocity: cc.p(0, 0),    // 速度
    _callback: null,         // 回调函数
    _direction: ROCKER_DIRECTION.ORIGIN,  // 方向
    _type: ROCKER_TYPE.DEFAULT,          // 摇杆类型
    ctor: function (baseTexture, knobTexture, type) {
        this._super();

        this.loadBaseAndKnob(baseTexture, knobTexture);
        this.loadConfig(type);

        return true;
    },
    onEnter: function () {
        this._super();

        this.registerEvent();
    },
    onExit: function () {
        this._super();
        this.unRegisterEvent();
    },
    getCallback: function () {
        return this._callback;
    },
    setCallback: function (callback) {
        this._callback = callback;
    },
    // 加载摇杆底图和把手精灵
    loadBaseAndKnob: function (baseTexture, knobTexture) {
        this._baseNode = new cc.Sprite(baseTexture);
        this._knobNode = new cc.Sprite(knobTexture);

        this.addChild(this._baseNode);
        this.addChild(this._knobNode);
    },
    // 加载配置 半径和类型等
    loadConfig: function (type) {
        this._radius = this._baseNode.getContentSize().width / 2;
        if (type !== undefined) {
            if (isNaN(type)) {
                this._type = type;
                if (this._type === ROCKER_TYPE.HIDE) {
                    this.setVisible(false);
                }
            } else {
                // 数字
                this._type = ROCKER_TYPE.OPACITY;
                this.setCascadeOpacityEnabled(true);    // 开启子节点透明度关联
                this.setOpacity(type);
            }
        }
    },
    // 注册 触摸事件监听器
    registerEvent: function () {
        this._touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            target: this,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        });
        cc.eventManager.addListener(this._touchListener, this);
    },
    // 卸载 触摸事件监听器
    unRegisterEvent: function () {
        cc.eventManager.removeListener(this._touchListener);
    },
    onTouchBegan: function (touch, event) {
        var target = this.target;
        var knob = target._knobNode;    // 获取把手
        var locationInNode = knob.convertToNodeSpace(touch.getLocation());
        var size = knob.getContentSize();
        var rect = cc.rect(0, 0, size.width, size.height);
        if (target._type === ROCKER_TYPE.DEFAULT) {
            // 如果是默认类型
            if (!cc.rectContainsPoint(rect, locationInNode)) {
                return false;
            }
        } else {
            // 非默认类型
            if (target._type === ROCKER_TYPE.AUTO) {
                target.setVisible(true);
            }
            target.setPosition(touch.getLocation());
        }
        return true;
    },
    onTouchMoved: function (touch, event) {
        // 节点获取
        var target = this.target;
        var knob = target._knobNode;
        // 触摸点转换为摇杆的本地坐标
        var locationInNode = target.convertToNodeSpace(touch.getLocation());
        target.onUpdate(locationInNode);    // 角度、方向、速度等更新
        // 长度获取，当前触摸点相对摇杆中心点
        var length = cc.pLength(locationInNode);
        var radians = cc.degreesToRadians(target._angle);
        // 限制把手和原点的距离不能超过摇杆的半径
        if (length > target._radius) {
            var x = Math.cos(radians) * target._radius;
            var y = Math.sin(radians) * target._radius;
            knob.setPosition(cc.p(x, y));
        } else {
            knob.setPosition(locationInNode);
        }
    },
    // 更新 角度、方向、速度
    onUpdate: function (pos) {
        this.onUpdateAngle(pos);
        this.onUpdateDirection();
        this.onUpdateVelocity();
        this.update();
    },
    // 更新角度
    onUpdateAngle: function (pos) {
        this._angle = cc.radiansToDegrees(cc.pToAngle(pos));
        if (this._angle < 0) {
            this._angle += 360;
        }
    },
    // 更新方向
    onUpdateDirection: function () {
        for (var i = 0; i < ROCKER_ANGLE_ARRAY.length; i++) {
            this._direction = ROCKER_DIRECTION_ARRAY[0];    // 默认取第一个向右
            if (this._angle >= ROCKER_ANGLE_ARRAY[i - 1] &&
                this._angle < ROCKER_ANGLE_ARRAY[i]) {
                this._direction = ROCKER_DIRECTION_ARRAY[i];
                break;
            }
        }
    },
    // 更新速度
    onUpdateVelocity: function () {
        this._velocity.x = this._knobNode.getPositionX();
        this._velocity.y = this._knobNode.getPositionY();
    },
    onTouchEnded: function (touch, event) {
        var target = this.target;
        if (target._type === ROCKER_TYPE.AUTO) {
            target.setVisible(false);
        }
        target.reset();         // 重置
        target.onCallback();    // 触发回调函数
    },
    // 重置
    reset: function () {
        cc.log("重置...");
        this._knobNode.setPosition(0, 0);
        this._angle = 0;
        this._velocity = cc.p(0, 0);
        this._direction = ROCKER_DIRECTION.ORIGIN;
    },
    // 触发 回调函数
    onCallback: function () {
        (this._callback && typeof(this._callback) === "function") && this._callback(this._velocity);
    },
    update: function (dt) {
        this._super();

        if (this._direction !== ROCKER_DIRECTION.ORIGIN) {
            this.onCallback();  // 触发回调函数
        }
    }
});

var _p = Rocker.prototype;
cc.defineGetterSetter(_p, "callback", _p.getCallback, _p.setCallback);
_p._callback;