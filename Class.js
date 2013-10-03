var Class;
Class = (function() {
    function Class() { }
    // Creates a new class, using the given prototype, and starts the inheritance chain
    Class.prototype.create = function(_prototype) {
        // Basic constructor, calls the init function of the base prototype
        function _class() {
            this.init.apply(this, arguments);
          }
        // Inheritance method, copies the prototype to the sub-class and extends/overrides
        // more methods and properties
        function _extend(_overrides) {
            var _proto = this.prototype;
            var _parent = this;
            function _super() { 
                this.constructor = _child;
              }
            // Creates the subclass constructor, and calls the base class, 
            // so we can call the init() prototype method
            function _child() { 
                _parent.apply(this, arguments);
              }
            _super.prototype = _proto;
            _child.prototype = new _super();
            // Inherits/overrides the properties of the base class
            // also create a _super() function, which can access the base class method from the inherited one
            for(var func in _overrides) {
                if(_child.prototype[func] !== 'undefined' && typeof(_child.prototype[func]) == 'function') {
                    // When method exists in the parent class, overrides and create a reference to the original method
                    _child.prototype[func] = (function(baseFn, fn){
                        return function() {
                            this._super = baseFn;
                            var ret = fn.apply(this, arguments);
                            return ret;
                          };
                      })(_child.prototype[func], _overrides[func]);
                  }
                else {
                    // Otherwise, just adds the method to the sub-class prototype
                    _child.prototype[func] = _overrides[func];
                  }
              }
            _child.extend = _parent.extend;
            return _child;
          }
        // Creates the prototype of the sub-class, and adds the extend functionality
        _class.prototype = _prototype;
        _class.extend = _extend;
        return _class;
      };
    return new Class();
  })();
