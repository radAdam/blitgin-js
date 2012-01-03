class Bootstrap  
  constructor: (@name) ->

  _classes = ["Keyboard","Game","RenderEngine","PhysicsEngine","CollisionEngine","SoundEngine","Input","Player","Map"]
  _collection = []
    
  start: (callback,basePath) ->
   _collection[_i] = @prepare clazz,basePath for clazz in _classes
   @load callback

  prepare: (clazz,basePath) ->
    basePath + clazz + ".js"
  
  load: (callback) ->
    $LAB.script(_collection).wait(callback);
