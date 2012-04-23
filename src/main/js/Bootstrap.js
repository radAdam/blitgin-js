var Bootstrap;

Bootstrap = (function() {
  var callBack, createAccessors, hasCustomAccessors, _classes, _collection, _ref;

  function Bootstrap(name) {
    this.name = name;
    this.checkForIE();
    this.checkExt();
    this.checkBind();
    this.checkAccessors();
  }

  _classes = ["Point", "Rectangle", "Keyboard", "Game", "GameError", "Group", "RenderObject", "Action", "RenderEngine", "Composite", "State", "PhysicsEngine", "CollisionEngine", "SoundEngine", "Input", "Player", "Map", "MapObject", "MapObjectGroup", "Nis", "NisCondition", "NisGoal", "Particle", "Emitter", "Enemy", "EnemyGroup"];

  _collection = [];

  _ref = Bootstrap;

  _ref.getters = {};

  _ref.setters = {};

  hasCustomAccessors = false;

  callBack = {};

  Bootstrap.prototype.FULL = "full";

  Bootstrap.prototype.IS_IE = false;

  Bootstrap.prototype.checkForIE = function() {
    var all, div, i, undef, v;
    undef = "not ie";
    v = 8;
    div = document.createElement('div');
    all = div.getElementsByTagName('i');
    for (i = v; v <= 11 ? i <= 11 : i >= 11; v <= 11 ? i++ : i--) {
      div.innerHTML = "<!--[if gt IE " + v + "]><i></i><![endif]-->";
      if (div.innerHTML === "") break;
      v = i;
    }
    if (v > 8) {
      return Bootstrap.prototype.IS_IE = true;
    } else {
      return Boostrap.prototype.IS_IE = false;
    }
  };

  Bootstrap.prototype.checkExt = function() {
    if (window.ext === void 0) {
      return window.ext = function(superClass, subClass) {
        var tmp;
        tmp = function() {};
        tmp.prototype = superClass.prototype;
        subClass.prototype = new tmp();
        subClass.prototype.constructor = subClass;
        return subClass;
      };
    }
  };

  Bootstrap.prototype.checkBind = function() {
    if (!Function.bind) {
      return Function.prototype.bind = function(bind) {
        var self;
        self = this;
        return function() {
          var args;
          args = Array.prototype.slice.call(arguments);
          return self.apply(bind || null, args);
        };
      };
    }
  };

  Bootstrap.prototype.checkAccessors = function() {
    if (!Object.__defineGetter__) {
      hasCustomAccessors = true;
      Object.prototype.__defineGetter__ = function(prop, func) {
        if (!_ref.getters[this.name]) _ref.getters[this.name] = {};
        _ref.getters[this.name]["name"] = this.name;
        return _ref.getters[this.name][prop] = func;
      };
    }
    if (!Object.__defineSetter__) {
      return Object.prototype.__defineSetter__ = function(prop, func) {
        if (!_ref.setters[this.name]) _ref.setters[this.name] = {};
        _ref.setters[this.name]["name"] = this.name;
        return _ref.setters[this.name][prop] = func;
      };
    }
  };

  Bootstrap.prototype.start = function(callback, basePath, mode) {
    var clazz, _i, _len;
    if (mode === Bootstrap.prototype.FULL) {
      for (_i = 0, _len = _classes.length; _i < _len; _i++) {
        clazz = _classes[_i];
        _collection[_i] = this.prepare(clazz, basePath);
      }
    }
    return this.load(callback);
  };

  Bootstrap.prototype.prepare = function(clazz, basePath) {
    return basePath + clazz + ".js";
  };

  Bootstrap.prototype.load = function(callback) {
    callBack = callback;
    if (_collection.length === 0) {
      Bootstrap.prototype.checkForWeave();
      return;
    }
    return $LAB.script(_collection).wait(function() {
      return Bootstrap.prototype.checkForWeave();
    });
  };

  Bootstrap.prototype.checkForWeave = function() {
    var clazz, tmp, _i, _len;
    if (hasCustomAccessors) {
      for (_i = 0, _len = _classes.length; _i < _len; _i++) {
        clazz = _classes[_i];
        tmp = {};
        tmp.name = clazz;
        Bootstrap.prototype.weave(tmp);
      }
      return callBack();
    } else {
      return callBack();
    }
  };

  Bootstrap.prototype.weave = function(target) {
    var obj, prop, _results;
    for (obj in _ref.getters) {
      if (obj !== "__defineGetter__" && obj !== "__defineSetter__" && _ref.getters[obj].name === target.name) {
        for (prop in _ref.getters[obj]) {
          if (prop !== "__defineGetter__" && prop !== "__defineSetter__" && prop !== "name") {
            if (_ref.setters[target.name][prop]) {
              createAccessors(target, prop, _ref.getters[target.name][prop], _ref.setters[target.name][prop]);
            } else {
              createAccessors(target, prop, _ref.getters[target.name][prop], function(val) {});
            }
          }
        }
      }
    }
    _results = [];
    for (obj in _ref.setters) {
      if (obj !== "__defineGetter__" && obj !== "__defineSetter__" && _ref.setters[obj].name === target.name) {
        _results.push((function() {
          var _results2;
          _results2 = [];
          for (prop in _ref.setters[obj]) {
            if (prop !== "__defineGetter__" && prop !== "__defineSetter__" && prop !== "name") {
              if (_ref.getters[target.name][prop]) {
                _results2.push(createAccessors(target, prop, _ref.getters[target.name][prop], _ref.setters[target.name][prop]));
              } else {
                _results2.push(createAccessors(target, prop, (function() {}), _ref.setters[target.name][prop]));
              }
            } else {
              _results2.push(void 0);
            }
          }
          return _results2;
        })());
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  createAccessors = function(obj, prop, getter, setter) {
    var tar;
    tar = eval(obj.name);
    return Object.defineProperty(tar.prototype, prop, {
      configurable: true,
      get: getter,
      set: setter
    });
  };

  return Bootstrap;

})();
