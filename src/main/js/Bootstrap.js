var Bootstrap;

Bootstrap = (function() {
  var _classes, _collection;

  function Bootstrap(name) {
    this.name = name;
  }

  _classes = ["Game", "RenderEngine", "PhysicsEngine", "CollisionEngine", "SoundEngine", "Input", "Player", "Map"];

  _collection = [];

  Bootstrap.prototype.start = function(callback, basePath) {
    var clazz, _i, _len;
    for (_i = 0, _len = _classes.length; _i < _len; _i++) {
      clazz = _classes[_i];
      _collection[_i] = this.prepare(clazz, basePath);
    }
    return this.load(callback);
  };

  Bootstrap.prototype.prepare = function(clazz, basePath) {
    return basePath + clazz + ".js";
  };

  Bootstrap.prototype.load = function(callback) {
    return $LAB.script(_collection).wait(callback);
  };

  return Bootstrap;

})();
