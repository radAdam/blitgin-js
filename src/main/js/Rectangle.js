var Rectangle;

Rectangle = (function() {
  var _height, _width, _x, _y;

  function Rectangle(_x, _y, _width, _height) {
    this._x = _x;
    this._y = _y;
    this._width = _width;
    this._height = _height;
  }

  _x = 0;

  _y = 0;

  _width = 0;

  _height = 0;

  return Rectangle;

})();

Rectangle.prototype.name = "Rectangle";

Rectangle.prototype.intersects = function(rect) {
  var lateral, vertical;
  lateral = (this.left < rect.left && rect.left < this.right) || (this.left < rect.right && rect.right < this.right);
  vertical = (this.top < rect.top && rect.top < this.bottom) || (this.top < rect.bottom && rect.bottom < this.bottom);
  return lateral || vertical;
};

Rectangle.prototype.intersection = function(rect) {
  return Rectangle(Math.max(rect.left, this.left), Math.max(rect.top, this.top), Math.min(rect.right, this.right), Math.min(rect.bottom, this.bottom));
};

Rectangle.prototype.__defineGetter__("x", function() {
  return this._x;
});

Rectangle.prototype.__defineSetter__("x", function(val) {
  return this._x = val;
});

Rectangle.prototype.__defineGetter__("y", function() {
  return this._y;
});

Rectangle.prototype.__defineSetter__("y", function(val) {
  return this._y = val;
});

Rectangle.prototype.__defineGetter__("width", function() {
  return this._width;
});

Rectangle.prototype.__defineSetter__("width", function(val) {
  return this._width = val;
});

Rectangle.prototype.__defineGetter__("height", function() {
  return this._height;
});

Rectangle.prototype.__defineSetter__("height", function(val) {
  return this._height = val;
});

Rectangle.prototype.__defineGetter__("left", function() {
  return this._x;
});

Rectangle.prototype.__defineGetter__("top", function() {
  return this._y;
});

Rectangle.prototype.__defineGetter__("right", function() {
  return this._x + this._width;
});

Rectangle.prototype.__defineGetter__("bottom", function() {
  return this._y + this._height;
});
