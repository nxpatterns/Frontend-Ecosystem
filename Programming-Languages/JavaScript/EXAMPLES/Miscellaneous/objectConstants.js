var constant = (function(){
  var constants = {},
  i = 0,
  ownProp = Object.prototype.hasOwnProperty,
  allowed = {
    string: true,
    number: true,
    boolean: true
  },
  prefix = (Math.random()+'_').slice(2); // delete first 2 characters

  return {
    set: function (name,value) {
      if (this.isDefined(name)) {
        return false;
      }

      if (!ownProp.call(allowed, typeof value)) {
        return false;
      }

      constants[prefix + name] = value;
      console.log(constants);
      return true;
    },
    isDefined: function (name) {
      i++;
      console.log(i,prefix+name);
      return ownProp.call(constants, prefix + name);
    },
    get: function (name) {
      if (this.isDefined(name)){
        return constants [prefix + name];
      }
      return null;
    }
  };

}());


  constant.isDefined ('maxWidth');   // false
  constant.set('maxWidth', 480);     // true
  // e.g. { '13702937294496964_maxWidth': 480 }
  constant.isDefined ('maxWidth');   // true
  constant.set('maxWidth', 320);     // false
  constant.get('maxWidth');           // 480
