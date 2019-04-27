// this uses James Johnson's code as per here:
// http://jelly.codes/articles/javascript-es6-autobind-class/
// but with a couple of changes:
// 1) currCls.__proto__ is deprecated in favor of Object.getPrototypeOf(currCls)
// 2) Object.getPrototypeOf(currCls) needs to be checked for null/undefined, hence the check on line 16
//
// The code autobinds 'this' to methods so I don't have to do it in every component

class RootElement extends HTMLElement {
  constructor() {
    super();
    this.__doBind(this);
  }

  __doBind(currCls) {
    if (Object.getPrototypeOf(currCls)) {
      var names = Object.getOwnPropertyNames(Object.getPrototypeOf(currCls));
      for (var memberName of names) {
        // skip getters/setters
        var descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(currCls), memberName);
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