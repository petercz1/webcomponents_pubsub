// this uses James Johnson's code as per here:
// http://jelly.codes/articles/javascript-es6-autobind-class/
//
// it autobinds 'this' to methods so I don't have to do it in every component

class RootElement extends HTMLElement {
  constructor() {
    super();
    this.__doBind(this);
  }

  __doBind(currCls) {
    if (currCls.__proto__) {
      var names = Object.getOwnPropertyNames(currCls.__proto__);
      for (var memberName of names) {
        // skip getters/setters
        var descriptor = Object.getOwnPropertyDescriptor(currCls.__proto__, memberName);
        if (descriptor && (descriptor.get || descriptor.set)) {
          continue;
        }

        if (typeof (this[memberName]) == "function" && memberName != "constructor") {
          this[memberName] = this[memberName].bind(this);
        }
      }

      if (currCls.constructor.name != "AutoBind") {
        this.__doBind(currCls.__proto__);
      }
    }
  }
}

export default RootElement;