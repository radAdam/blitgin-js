var Bootstrap, CollisionEngine, Game, GameError, Group, Input, Keyboard, Map, PhysicsEngine, Player, Point, Rectangle, RenderEngine, RenderObject, SoundEngine,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

Bootstrap = (function() {
  var _classes, _collection;

  function Bootstrap(name) {
    this.name = name;
  }

  _classes = ["Point", "Rectangle", "Keyboard", "Game", "GameError", "Group", "RenderEngine", "PhysicsEngine", "CollisionEngine", "SoundEngine", "Input", "Player", "RenderObject", "Map"];

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

CollisionEngine = (function() {

  function CollisionEngine() {}

  return CollisionEngine;

})();

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

GameError = (function() {

  function GameError(name) {
    this.name = name;
  }

  GameError.prototype.warnNotUsed = function(clazz, func) {
    return logger.warn("WARNING :: " + func + "  is not used by " + clazz + ". Stack is ");
  };

  return GameError;

})();

Group = (function() {
  var _independence, _positions, _type;

  function Group(name) {
    this.name = name;
  }

  _type = "";

  _positions = [];

  _independence = 0;

  return Group;

})();

Game.prototype.__defineGetter__("type", function() {
  return this._type;
});

Game.prototype.__defineSetter__("type", function(val) {
  return this._type = val;
});

Game.prototype.__defineGetter__("positions", function() {
  return this._positions;
});

Game.prototype.__defineSetter__("positions", function(val) {
  return this._positions = val;
});

Game.prototype.__defineGetter__("independence", function() {
  return this._independence;
});

Game.prototype.__defineSetter__("independence", function(val) {
  return this._independence = val;
});

Input = (function() {

  function Input() {}

  return Input;

})();

Keyboard = (function() {

  function Keyboard(name) {
    this.name = name;
  }

  return Keyboard;

})();

Keyboard.prototype.KEY_UP = "keyup";

Keyboard.prototype.KEY_DOWN = "keydown";

Keyboard.prototype.LEFT = "left";

Keyboard.prototype.RIGHT = "right";

Keyboard.prototype.SPACE = "space";

PhysicsEngine = (function() {

  function PhysicsEngine() {}

  return PhysicsEngine;

})();

Map = (function() {
  var _activeEnemies, _activeMapObjects, _backgroundAsset, _backgroundAssetClass, _collisionAsset, _collisionAssetClass, _collisionData, _enemies, _foregroundAsset, _foregroundAssetClass, _foregroundData, _friction, _gravity, _inactiveEnemies, _inactiveMapObjects, _mapObjects, _midgroundAsset, _midgroundAssetClass, _midgroundData, _nis, _paralaxing, _platform, _showCollisionMap, _sound, _soundLoops;

  __extends(Map, RenderObject);

  function Map(name) {
    this.name = name;
  }

  _paralaxing = false;

  _platform = false;

  _showCollisionMap = false;

  _gravity = 10;

  _friction = .25;

  _enemies = [];

  _mapObjects = [];

  _nis = [];

  _activeEnemies = [];

  _inactiveEnemies = [];

  _activeMapObjects = [];

  _inactiveMapObjects = [];

  _backgroundAssetClass = {};

  _midgroundAssetClass = {};

  _foregroundAssetClass = {};

  _collisionAssetClass = {};

  _backgroundAsset = {};

  _midgroundAsset = {};

  _foregroundAsset = {};

  _collisionAsset = {};

  _midgroundData = {};

  _foregroundData = {};

  _collisionData = {};

  _sound = {};

  _soundLoops = 0;

  return Map;

})();

Map.prototype.__defineSetter__("backgroundAssetClass", function(val) {
  return this._backgroundAssetClass = val;
});

Map.prototype.__defineGetter__("backgroundAssetClass", function() {
  return this._backgroundAssetClass;
});

Map.prototype.__defineSetter__("midgroundAssetClass", function(val) {
  return this._midgroundAssetClass = val;
});

Map.prototype.__defineGetter__("midgroundAssetClass", function() {
  return this._midgroundAssetClass;
});

Map.prototype.__defineSetter__("foregroundAssetClass", function(val) {
  return this._foregroundAssetClass = val;
});

Map.prototype.__defineGetter__("foregroundAssetClass", function() {
  return this._foregroundAssetClass;
});

Map.prototype.__defineSetter__("collisionAssetClass", function(val) {
  return this._collisionAssetClass = val;
});

Map.prototype.__defineGetter__("collisionAssetClass", function() {
  return this._collisionAssetClass;
});

Map.prototype.__defineSetter__("paralaxing", function(val) {
  return this._paralaxing = val;
});

Map.prototype.__defineGetter__("paralaxing", function() {
  return this._paralaxing;
});

Map.prototype.__defineSetter__("showCollisionMap", function(val) {
  return this._showCollisionMap = val;
});

Map.prototype.__defineGetter__("showCollisionMap", function() {
  return this._showCollisionMap;
});

Map.prototype.__defineSetter__("platform", function(val) {
  return this._platform = val;
});

Map.prototype.__defineGetter__("platform", function() {
  return this._platform;
});

Map.prototype.__defineSetter__("enemies", function(val) {
  return this._enemies = val;
});

Map.prototype.__defineGetter__("enemies", function() {
  return this._enemies;
});

Map.prototype.__defineGetter__("nis", function() {
  return this._nis;
});

Map.prototype.__defineSetter__("nis", function(val) {
  return this._nis = val;
});

Map.prototype.__defineSetter__("mapObjects", function(val) {
  return this._mapObjects = val;
});

Map.prototype.__defineGetter__("mapObjects", function() {
  return this._mapObjects;
});

Map.prototype.__defineGetter__("activeMapObjects", function() {
  return this._activeMapObjects;
});

Map.prototype.__defineGetter__("activeEnemies", function() {
  return this._activeEnemies;
});

Map.prototype.__defineGetter__("width", function() {
  return this._foregroundAsset.width;
});

Map.prototype.__defineSetter__("x", function(val) {
  if ((val >= 0) && (val <= this._foregroundAsset.width - Game.prototype.VIEWPORT_WIDTH)) {
    return this.x = val;
  } else if (val < 0) {
    return this.x = 0;
  } else if (val > 0) {
    return this.x = this._foregroundAsset.width - Game.prototype.VIEWPORT_WIDTH;
  }
});

Map.prototype.__defineSetter__("y", function(val) {
  if (val >= this._collisionData.height - Game.prototype.VIEWPORT_HEIGHT) {
    this.y = this._collisionData.height - Game.prototype.VIEWPORT_HEIGHT;
    return;
  }
  if (val < 0) {
    this.y = 0;
    return;
  }
  return this.y = val;
});

Map.prototype.__defineGetter__("collisionData", function() {
  return this._collisionData;
});

Map.prototype.__defineSetter__("gravity", function(val) {
  return this._gravity = val;
});

Map.prototype.__defineGetter__("gravity", function() {
  return this._gravity;
});

Map.prototype.__defineSetter__("friction", function(val) {
  return this._friction = val;
});

Map.prototype.__defineGetter__("friction", function() {
  return this._friction;
});

Map.prototype.__defineGetter__("rect", function() {
  return new Rectangle(0, 0, Game.prototype.VIEWPORT_WIDTH, Game.prototype.VIEWPORT_HEIGHT);
});

Map.prototype.__defineGetter__("point", function() {
  return new Point(0, 0);
});

Map.prototype.__defineGetter__("sound", function() {
  return this._sound;
});

Map.prototype.__defineSetter__("sound", function(val) {
  return this._sound = val;
});

Map.prototype.__defineGetter__("soundLoops", function() {
  return this._soundLoops;
});

Map.prototype.__defineSetter__("soundLoops", function(val) {
  return this._soundLoops = val;
});

Map.prototype.MANAGE_ENEMIES = "manageEnemies";

Map.prototype.MANAGE_MAP_OBJECTS = "manageMapObjects";

Point = (function() {
  var _x, _y;

  function Point(_x, _y) {
    this._x = _x;
    this._y = _y;
  }

  _x = 0;

  _y = 0;

  return Point;

})();

Point.prototype.__defineGetter__("x", function() {
  return this._x;
});

Point.prototype.__defineSetter__("x", function(val) {
  return this._x = val;
});

Point.prototype.__defineGetter__("y", function() {
  return this._y;
});

Point.prototype.__defineSetter__("y", function(val) {
  return this._y = val;
});

Player = (function() {

  function Player() {}

  return Player;

})();

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

RenderEngine = (function() {

  function RenderEngine() {}

  return RenderEngine;

})();

RenderObject = (function() {
  var _x, _y;

  function RenderObject(name) {
    this.name = name;
  }

  _x = 0;

  _y = 0;

  return RenderObject;

})();

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

SoundEngine = (function() {

  function SoundEngine() {}

  return SoundEngine;

})();
