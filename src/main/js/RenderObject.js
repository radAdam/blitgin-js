var RenderObject;

RenderObject = (function() {
  var _asset, _assetClass, _assetData, _cellHeight, _cellWidth, _colorConstant, _direction, _duration, _easeCoefficient, _frame, _frameBuffer, _height, _index, _lifeSpan, _transparency, _velocityX, _velocityY, _width, _workbench, _x, _y;

  function RenderObject(name) {
    this.name = name;
    this.x = 0;
    this.y = 0;
  }

  _transparency = false;

  _colorConstant = "#000000";

  _workbench = {};

  _x = 0;

  _y = 0;

  _width = 0;

  _height = 0;

  _duration = 0;

  _frame = 0;

  _frameBuffer = 0;

  _velocityX = 0;

  _velocityY = 0;

  _easeCoefficient = 0;

  _index = 0;

  _lifeSpan = 0;

  _cellWidth = 0;

  _cellHeight = 0;

  _direction = 1;

  _assetClass = "";

  _asset = {};

  _assetData = {};

  RenderObject.prototype.initialize = function() {
    if ((void 0 !== this.assetClass) && (0 !== this.cellHeight) && (0 !== this.cellWidth)) {
      this._asset = new Image();
      this.assetData = new Image();
      this._asset.onload = this.assetLoadComplete.bind(this);
      this._asset.src = this.assetClass;
      return this.workbench = document.createElement("canvas");
    } else {
      return console.log("Set a cellwidth , cellheight , and assetClass before calling initialize.");
    }
  };

  RenderObject.prototype.assetLoadComplete = function() {
    if (this.transparency) {
      this.assetData = this.asset;
    } else {
      this.removeColorConstantAndCache(this.asset, this.assetData);
    }
    this.x = 0;
    return this.y = 0;
  };

  RenderObject.prototype.removeColorConstantAndCache = function(asset, targetData) {
    var a, b, ctx, g, imageData, index, parsed, r, val, xpos, ypos, _ref, _ref2;
    if (this.colorConstant === void 0) {
      console.log("Error : You need to set a hex value for colorConstant , or set tranparency true if no color is to be sampled out.");
    }
    this.workbench.width = asset.width;
    this.workbench.height = asset.height;
    ctx = this.workbench.getContext('2d');
    ctx.drawImage(asset, 0, 0);
    imageData = ctx.getImageData(0, 0, this.workbench.width, this.workbench.height);
    parsed = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.colorConstant);
    r = parseInt(parsed[1], 16);
    g = parseInt(parsed[2], 16);
    b = parseInt(parsed[3], 16);
    val = r + g + b;
    for (xpos = 0, _ref = imageData.width - 1; 0 <= _ref ? xpos <= _ref : xpos >= _ref; 0 <= _ref ? xpos++ : xpos--) {
      for (ypos = 0, _ref2 = imageData.height - 1; 0 <= _ref2 ? ypos <= _ref2 : ypos >= _ref2; 0 <= _ref2 ? ypos++ : ypos--) {
        index = 4 * (ypos * imageData.width + xpos);
        r = imageData.data[index];
        g = imageData.data[index + 1];
        b = imageData.data[index + 2];
        a = imageData.data[index + 3];
        if (r + g + b === val) imageData.data[index + 3] = 0;
      }
    }
    ctx.putImageData(imageData, 0, 0);
    targetData.src = null;
    targetData.src = this.workbench.toDataURL();
    return ctx.clearRect(0, 0, asset.width, asset.height);
  };

  RenderObject.prototype.copyPixels = function(asset, rect) {
    var ctx, imageData;
    ctx = this.workbench.getContext('2d');
    ctx.clearRect(0, 0, asset.width, asset.height);
    if (this.workbench.width < asset.width) this.workbench.width = asset.width;
    if (this.workbench.height < asset.height) this.workbench.height = asset.height;
    ctx.drawImage(asset, 0, 0);
    imageData = ctx.getImageData(rect.x, rect.y, rect.width, rect.height);
    return ctx.putImageData(imageData, 0, 0);
  };

  RenderObject.prototype.dispose = function() {
    _assetClass = void 0;
    return _asset = void 0;
  };

  return RenderObject;

})();

RenderObject.prototype.__defineGetter__("bitmapData", function() {
  var ctx, keyFrame;
  this.workbench.width = this._asset.width;
  this.workbench.height = this._asset.height;
  ctx = workbench.getContext('2d');
  keyFrame = Math.floor(this._frame) * this._cellWidth;
  ctx.drawImage(this._asset, keyFrame, 0);
  return ctx.getImageData(0, 0, this.width, this.height);
});

RenderObject.prototype.__defineGetter__("x", function() {
  return this._x;
});

RenderObject.prototype.__defineSetter__("x", function(val) {
  return this._x = val;
});

RenderObject.prototype.__defineGetter__("y", function() {
  return this._y;
});

RenderObject.prototype.__defineSetter__("y", function(val) {
  return this._y = val;
});

RenderObject.prototype.__defineGetter__("width", function() {
  return this.cellWidth;
});

RenderObject.prototype.__defineGetter__("height", function() {
  return this.cellHeight;
});

RenderObject.prototype.__defineGetter__("cellWidth", function() {
  return this._cellWidth;
});

RenderObject.prototype.__defineSetter__("cellWidth", function(val) {
  return this._cellWidth = val;
});

RenderObject.prototype.__defineGetter__("cellHeight", function() {
  return this._cellHeight;
});

RenderObject.prototype.__defineSetter__("cellHeight", function(val) {
  return this._cellHeight = val;
});

RenderObject.prototype.__defineSetter__("velocityX", function(val) {
  return this._velocityX = val;
});

RenderObject.prototype.__defineGetter__("velocityX", function() {
  return this._velocityX;
});

RenderObject.prototype.__defineSetter__("velocityY", function(val) {
  return this._velocityY = val;
});

RenderObject.prototype.__defineGetter__("velocityY", function() {
  return this._velocityY;
});

RenderObject.prototype.__defineSetter__("direction", function(val) {
  return this._direction = val;
});

RenderObject.prototype.__defineGetter__("direction", function() {
  return this._direction;
});

RenderObject.prototype.__defineSetter__("easeCoefficient", function(val) {
  return this._easeCoefficient = val;
});

RenderObject.prototype.__defineGetter__("easeCoefficient", function() {
  return this._easeCoefficient;
});

RenderObject.prototype.__defineSetter__("frame", function(val) {
  return this._frame = val;
});

RenderObject.prototype.__defineGetter__("frame", function() {
  return this._frame;
});

RenderObject.prototype.__defineSetter__("frameBuffer", function(val) {
  return this._frameBuffer = val;
});

RenderObject.prototype.__defineGetter__("frameBuffer", function() {
  return this._frameBuffer;
});

RenderObject.prototype.__defineSetter__("duration", function(val) {
  return this._duration = val;
});

RenderObject.prototype.__defineGetter__("duration", function() {
  return this._duration;
});

RenderObject.prototype.__defineGetter__("rect", function() {
  return new Rectangle(0, 0, this.width, this.height);
});

RenderObject.prototype.__defineGetter__("point", function() {
  return new Point(this._x, this._y);
});

RenderObject.prototype.__defineSetter__("tranparency", function(val) {
  return this._transparency = val;
});

RenderObject.prototype.__defineGetter__("transparency", function() {
  return this._transparency;
});

RenderObject.prototype.__defineSetter__("colorConstant", function(val) {
  return this._colorConstant = val;
});

RenderObject.prototype.__defineGetter__("colorConstant", function() {
  return this._colorConstant;
});

RenderObject.prototype.__defineGetter__("asset", function() {
  return this._asset;
});

RenderObject.prototype.__defineGetter__("assetClass", function() {
  return this._assetClass;
});

RenderObject.prototype.__defineSetter__("assetClass", function(val) {
  return this._assetClass = val;
});

RenderObject.prototype.__defineGetter__("assetData", function() {
  return this._assetData;
});

RenderObject.prototype.__defineSetter__("assetData", function(val) {
  return this._assetData = val;
});

RenderObject.prototype.__defineGetter__("workbench", function() {
  return this._workbench;
});

RenderObject.prototype.__defineSetter__("workbench", function(val) {
  return this._workbench = val;
});
