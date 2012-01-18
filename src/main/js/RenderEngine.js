var RenderEngine;

RenderEngine = (function() {
  var _actionObjects, _collisionEngine, _map, _nis, _physicsEngine, _player, _scrn, _soundEngine;

  function RenderEngine(name) {
    this.name = name;
  }

  _actionObjects = [];

  _scrn = {};

  _map = {};

  _player = {};

  _nis = {};

  _soundEngine = {};

  _collisionEngine = {};

  _physicsEngine = {};

  RenderEngine.prototype.render = function(input) {
    var action, ctxMain, enemy, mapObj, _i, _j, _k, _len, _len2, _len3, _ref, _ref2;
    ctxMain = this.scrn.getContext('2d');
    ctxMain.clearRect(0, 0, Game.prototype.VIEWPORT_WIDTH, Game.prototype.VIEWPORT_HEIGHT);
    if (this.nis) {
      this.manageNIS(this.nis, input);
      return;
    }
    this.managePlayer(input);
    this.manageMap(input);
    this.paint(this.map, this.map.point);
    this.map.manageElements(Map.prototype.MANAGE_ENEMIES);
    _ref = this.map.activeEnemies;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      enemy = _ref[_i];
      this.manageEnemy(enemy);
      this.paint(enemy, enemy.point);
    }
    for (_j = 0, _len2 = _actionObjects.length; _j < _len2; _j++) {
      action = _actionObjects[_j];
      if (this.actionIsIdle(action)) continue;
      this.manageAction(action);
      this.paint(action, action.point);
    }
    _ref2 = this.map.activeMapObjects;
    for (_k = 0, _len3 = _ref2.length; _k < _len3; _k++) {
      mapObj = _ref2[_k];
      mapObj.frame++;
      this.manageMapObject(mapObj);
      this.paint(mapObj, mapObj.point);
    }
    this.paint(this.player, this.player.point);
    if (this.player.composite !== void 0) {
      this.player.composite.frame++;
      this.paint(this.player.composite, this.player.compositePoint);
    }
    if (this.player.emitter !== void 0 && this.player.emitter.hasParticles) {
      this.player.emitter.frame++;
      this.paint(this.player.emitter, this.player.point);
    }
    return Game.prototype.instance.notifySubscribers(this.map, this.player, this.actionObjects);
  };

  RenderEngine.prototype.paint = function(obj, point) {
    var asset, ctxMain, d, _i, _len, _ref, _results;
    ctxMain = this.scrn.getContext('2d');
    d = obj.bitmapData;
    if (d.player) {
      return ctxMain.drawImage(d.player, d.rect.x, d.rect.y, d.rect.width, d.rect.height, obj.point.x, obj.point.y, d.rect.width, d.rect.height);
    } else {
      _ref = d.map;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        asset = _ref[_i];
        if (asset.data !== void 0) {
          _results.push(ctxMain.drawImage(asset.data, asset.rect.x, asset.rect.y, asset.rect.width, asset.rect.height, obj.point.x, obj.point.y, asset.rect.width, asset.rect.height));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    }
  };

  RenderEngine.prototype.managePlayer = function(input) {
    this.physicsEngine.adjustPlayerVerically(this.player, this.map);
    if (input.direction !== 0) {
      this.physicsEngine.applyPlayerInput(this.player, input);
      this.player.frame++;
    } else if ((input.direction === 0) && (!this.player.isBusy)) {
      this.player.frame = 0;
    }
    return this.physicsEngine.adjustPlayerHorizontally(this.player, this.map);
  };

  RenderEngine.prototype.manageMap = function(input) {
    this.soundEngine.checkPlayback(this.map);
    return this.physicsEngine.adjustMapVerically(this.map, this.player);
  };

  RenderEngine.prototype.dispose = function() {
    _actionObjects = void 0;
    this.scrn = void 0;
    this.map.dispose();
    this.map = void 0;
    this.player.dispose();
    this.player = void 0;
    this.soundEngine = void 0;
    return this.collisionEngine = void 0;
  };

  return RenderEngine;

})();

RenderEngine.prototype.__defineGetter__("scrn", function() {
  return this._scrn;
});

RenderEngine.prototype.__defineSetter__("scrn", function(val) {
  return this._scrn = val;
});

RenderEngine.prototype.__defineGetter__("map", function() {
  return this._map;
});

RenderEngine.prototype.__defineSetter__("map", function(val) {
  if (this._map) this.soundEngine.removeSound(this._map.sound);
  this.collisionEngine.map = val;
  return this._map = val;
});

RenderEngine.prototype.__defineGetter__("player", function() {
  return this._player;
});

RenderEngine.prototype.__defineSetter__("player", function(val) {
  this.collisionEngine.player = val;
  return this._player = val;
});

RenderEngine.prototype.__defineGetter__("soundEngine", function() {
  return this._soundEngine;
});

RenderEngine.prototype.__defineSetter__("soundEngine", function(val) {
  return this._soundEngine = val;
});

RenderEngine.prototype.__defineGetter__("collisionEngine", function() {
  return this._collisionEngine;
});

RenderEngine.prototype.__defineSetter__("collisionEngine", function(val) {
  return this._collisionEngine = val;
});

RenderEngine.prototype.__defineGetter__("physicsEngine", function() {
  return this._physicsEngine;
});

RenderEngine.prototype.__defineSetter__("physicsEngine", function(val) {
  this._physicsEngine = val;
  return this.collisionEngine.physicsEngine = val;
});
