class Rectangle
  constructor:(@_x,@_y,@_width,@_height)->

  _x = 0
  _y = 0
  _width = 0
  _height = 0
  
Rectangle::__defineGetter__ "x",->
  @_x

Rectangle::__defineSetter__ "x",(val)->
  @_x = val
    
Rectangle::__defineGetter__ "y",->
  @_y

Rectangle::__defineSetter__ "y",(val)->
  @_y = val

Rectangle::__defineGetter__ "width",->
  @_width

Rectangle::__defineSetter__ "width",(val)->
  @_width = val

Rectangle::__defineGetter__ "height",->
  @_height

Rectangle::__defineSetter__ "height",(val)->
  @_height = val