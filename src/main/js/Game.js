var Game;

Game = (function() {
  var _activeMap, _activePlayer, _collisionEngineClass, _customKey, _customKeys, _downKeys, _input, _jumpKeys, _leftKeys, _maps, _movement, _parent, _pause, _physicsEngineClass, _players, _renderEngine, _renderEngineClass, _rightKeys, _screen, _soundEngine, _subscribers, _timer, _upKeys;

  function Game() {
    this.keyboard = new Keyboard();
  }

  _subscribers = [];

  _pause = false;

  _activeMap = 0;

  _activePlayer = 0;

  _customKey = 0;

  _players = [];

  _maps = [];

  _leftKeys = [];

  _rightKeys = [];

  _upKeys = [];

  _downKeys = [];

  _jumpKeys = [];

  _customKeys = [];

  _parent = {};

  _screen = {};

  _renderEngineClass = {};

  _collisionEngineClass = {};

  _physicsEngineClass = {};

  _renderEngine = {};

  _soundEngine = {};

  _movement = {};

  _input = {};

  _timer = {};

  Game.prototype.render = function() {
    if (this._pause) return;
    return alert("render");
  };

  Game.prototype.start = function() {
    return _timer = setInterval(this.render.bind(this), 2500);
  };

  Game.prototype.preinitialize = function(parent, width, height) {
    _parent = parent;
    this.ViewportHeight = height;
    this.ViewportWidth = width;
    this._screen = document.createElement("canvas");
    this._screen.setAttribute("width", this.ViewportWidth);
    this._screen.setAttribute("height", this.ViewportHeight);
    this._screen.setAttribute("tabIndex", 0);
    document.body.appendChild(this._screen);
    return this.initialize();
  };

  Game.prototype.initialize = function() {
    var map, player;
    if (!this._renderEngineClass) {
      _renderEngine = new RenderEngine();
    } else {
      _renderEngine = new _renderEngineClass();
    }
    if (!this._collisionEngineClass) {
      _renderEngine.collisionEngine = new CollisionEngine();
    } else {
      _renderEngine.collisionEngine = new _collisionEngineClass();
    }
    if (!this._physicsEngineClass) {
      _renderEngine.physicsEngine = new PhysicsEngine();
    } else {
      _renderEngine.physicsEngine = new _physicsEngineClass();
    }
    if (this._maps.length === 0) {
      console.log("Blitgin_as :: [ERROR] :: you need at least one map.");
    }
    if (this._players.length === 0) {
      console.log("Blitgin_as :: [ERROR] :: you need at least one player.");
    }
    _soundEngine = new SoundEngine();
    _renderEngine.soundEngine = this._soundEngine;
    map = this._maps[_activeMap];
    player = this._players[_activePlayer];
    _renderEngine.screen = this._screen;
    _renderEngine.map = new map();
    _renderEngine.player = new player();
    _input = new Input();
    _input.direction = 0;
    _input.jump = 0;
    _input.jumpLock = false;
    _input.customKey = 0;
    return this.addListeners();
  };

  Game.prototype.addListeners = function() {
    document.onkeydown = this.manageMovement.bind(this);
    document.onkeyup = this.manageMovement.bind(this);
    return this._screen.focus();
  };

  Game.prototype.removeListeners = function() {
    document.onkeydown = void 0;
    return document.onkeyup = void 0;
  };

  Game.prototype.manageMovement = function(e) {
    var key;
    if (_input.disabled) return;
    if (window.event) {
      key = window.event.keyCode;
    } else {
      key = e.keyCode;
    }
    if (e.type === Keyboard.prototype.KEY_UP) {
      _input.direction = this.checkKey(this._leftKeys, key) ? 0 : _input.direction;
      _input.direction = this.checkKey(this._rightKeys, key) ? 0 : _input.direction;
      _input.vDirection = this.checkKey(this._upKeys, key) ? 0 : _input.vDirection;
      _input.vDirection = this.checkKey(this._downKeys, key) ? 0 : _input.vDirection;
      _input.jump = this.checkKey(this._jumpKeys, key) ? 0 : _input.jump;
      _input.customKey = this.checkKey(this._customKeys, key) ? 0 : _input.customKey;
    } else {
      _input.direction = this.checkKey(this._leftKeys, key) ? -1 : _input.direction;
      _input.direction = this.checkKey(this._rightKeys, key) ? 1 : _input.direction;
      _input.vDirection = this.checkKey(this._upKeys, key) ? -1 : _input.direction;
      _input.vDirection = this.checkKey(this._downKeys, key) ? 1 : _input.direction;
      _input.jump = this.checkKey(this._jumpKeys, key) ? 1 : _input.jump;
    }
    if (this.checkKey(_customKeys, key)) {
      return _input.customKey = _customKeys[_customKey];
    }
  };

  Game.prototype.checkKey = function(arr, keyCode) {
    var index;
    if (!arr) return;
    index = arr.indexOf(keyCode, 0);
    _customKey = index;
    return index !== -1;
  };

  Game.prototype.dispose = function() {
    removeListeners();
    this._players = void 0;
    this._maps = void 0;
    this._leftKeys = void 0;
    this._rightKeys = void 0;
    this._upKeys = void 0;
    this._downKeys = void 0;
    this._jumpKeys = void 0;
    this._customKeys = void 0;
    this._renderEngineClass = void 0;
    this._renderEngine.dispose();
    this._soundEngine = void 0;
    this._movement = void 0;
    this._input = void 0;
    this._subscribers = void 0;
    this._screen.bitmapData.dispose();
    return this._screen = void 0;
  };

  Game.prototype.notifySubscribers = function(map, player, actions) {
    var subscriber, _i, _len, _ref, _results;
    _ref = this._subscribers;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      subscriber = _ref[_i];
      _results.push(subscriber.notify(map, player, actions));
    }
    return _results;
  };

  Game.prototype.subscribe = function(subscriber) {
    return _subscribers[subscriber] = subscriber;
  };

  Game.prototype.unsubscribe = function(subscriber) {
    return _subscriber.slice(this._subscribers.indexOf(subscriber), this._subscribers.indexOf(subscriber) + 1 || 9e9);
  };

  return Game;

})();

Game.prototype.__defineGetter__("renderEngineClass", function() {
  return this._renderEngineClass;
});

Game.prototype.__defineSetter__("renderEngineClass", function(val) {
  return this._renderEngineClass = val;
});

Game.prototype.__defineGetter__("collisionEngineClass", function() {
  return this._collisionEngineClass;
});

Game.prototype.__defineSetter__("collisionEngineClass", function(val) {
  return this._collisionEngineClass = val;
});

Game.prototype.__defineGetter__("physicsEngineClass", function() {
  return this._physicsEngineClass;
});

Game.prototype.__defineSetter__("physicsEngineClass", function(val) {
  return this._physicsEngineClass = val;
});

Game.prototype.__defineGetter__("players", function() {
  return this._players;
});

Game.prototype.__defineSetter__("players", function(val) {
  return this._players = val;
});

Game.prototype.__defineGetter__("maps", function() {
  return this._maps;
});

Game.prototype.__defineSetter__("maps", function(val) {
  return this._maps = val;
});

Game.prototype.__defineGetter__("activeMap", function() {
  return this._activeMap;
});

Game.prototype.__defineSetter__("activeMap", function(val) {
  return this._activeMap = val;
});

Game.prototype.__defineSetter__("activePlayer", function(val) {
  return this._activePlayer = val;
});

Game.prototype.__defineGetter__("activePlayer", function() {
  return this._activePlayer;
});

Game.prototype.__defineGetter__("leftKeys", function() {
  return this._leftKeys;
});

Game.prototype.__defineSetter__("leftKeys", function(val) {
  return this._leftKeys = val;
});

Game.prototype.__defineGetter__("rightKeys", function() {
  return this._rightKeys;
});

Game.prototype.__defineSetter__("rightKeys", function(val) {
  return this._rightKeys = val;
});

Game.prototype.__defineGetter__("upKeys", function() {
  return this._upKeys;
});

Game.prototype.__defineSetter__("upKeys", function(val) {
  return this._upKeys = val;
});

Game.prototype.__defineGetter__("downKeys", function() {
  return this._downKeys;
});

Game.prototype.__defineSetter__("downKeys", function(val) {
  return this._downKeys = val;
});

Game.prototype.__defineGetter__("jumpKeys", function() {
  return this._jumpKeys;
});

Game.prototype.__defineSetter__("jumpKeys", function(val) {
  return this._jumpKeys = val;
});

Game.prototype.__defineGetter__("customKeys", function() {
  return this._customKeys;
});

Game.prototype.__defineSetter__("customKeys", function(val) {
  return this._customKeys = val;
});

Game.prototype.__defineGetter__("pause", function() {
  return this._pause;
});

Game.prototype.__defineSetter__("pause", function(val) {
  return this._pause = val;
});

Game.prototype.__defineGetter__("keyboard", function() {
  return this._keyboard;
});

Game.prototype.__defineSetter__("keyboard", function(val) {
  return this._keyboard = val;
});
