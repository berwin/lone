(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["logic"] = factory();
	else
		root["Lone"] = root["Lone"] || {}, root["Lone"]["logic"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./packages/lone-logic/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./packages/lone-logic/component.js":
/*!******************************************!*\
  !*** ./packages/lone-logic/component.js ***!
  \******************************************/
/*! exports provided: default, callHook */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "callHook", function() { return callHook; });
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper */ "./packages/lone-logic/helper.js");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./events */ "./packages/lone-logic/events.js");
/* harmony import */ var _schedule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./schedule */ "./packages/lone-logic/schedule.js");
var _class;




const init = Symbol('lone-logic:init');
let id = 0;

let LogicComponent = Object(_events__WEBPACK_IMPORTED_MODULE_1__["default"])(_class = class LogicComponent {
  constructor(options) {
    const vm = this;
    vm._id = id++;
    vm[init](options);
    console.log(vm);
  }

  [init](options) {
    const vm = this;
    vm._events = Object.create(null);
    vm.$options = Object(_helper__WEBPACK_IMPORTED_MODULE_0__["initOptions"])(options);
    callHook(vm, 'beforeCreate');
    Object(_helper__WEBPACK_IMPORTED_MODULE_0__["initData"])(vm);
    callHook(vm, 'created');
  }

  setData(data) {
    const oldData = this.data;
    _schedule__WEBPACK_IMPORTED_MODULE_2__["master"].send('logic:data', {
      id: this._id,
      data: Object.assign(oldData, data)
    });
  }

}) || _class;

/* harmony default export */ __webpack_exports__["default"] = (LogicComponent);
function callHook(vm, hook) {
  const handlers = vm.$options[hook];

  if (handlers) {
    for (let i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        Object(_helper__WEBPACK_IMPORTED_MODULE_0__["handleError"])(e, vm, `${hook} hook`);
      }
    }
  }

  vm.$emit('hook:' + hook);
}

/***/ }),

/***/ "./packages/lone-logic/events.js":
/*!***************************************!*\
  !*** ./packages/lone-logic/events.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return events; });
/* harmony import */ var lone_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lone-util */ "./packages/lone-util/index.js");
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helper */ "./packages/lone-logic/helper.js");


function events(Lone) {
  const proto = Lone.prototype;
  proto.$on = on;
  proto.$once = once;
  proto.$off = off;
  proto.$emit = emit;
}

function on(event, fn) {
  const vm = this;

  if (Object(lone_util__WEBPACK_IMPORTED_MODULE_0__["isArray"])(event)) {
    for (let i = 0, len = event.length; i < len; i++) {
      vm.$on(event[i], fn);
    }
  } else {
    // eslint-disable-next-line
    (vm._events[event] || (vm._events[event] = [])).push(fn);
  }
}

function once(event, fn) {
  const vm = this;

  function on() {
    vm.$off(event, on);
    fn.apply(vm, arguments);
  }

  on.fn = fn;
  vm.$on(event, on);
}

function off(event, fn) {
  const vm = this;

  if (!arguments.length) {
    vm._events = Object.create(null);
    return vm;
  }

  if (Object(lone_util__WEBPACK_IMPORTED_MODULE_0__["isArray"])(event)) {
    for (let i = 0, len = event.length; i < len; i++) {
      vm.$off(event[i], fn);
    }

    return vm;
  }

  const fns = vm._events[event];
  if (!fns) return vm;

  if (arguments.length === 1) {
    vm._events[event] = null;
  }

  if (fns) {
    let i = fns.length;

    while (i--) {
      if (fns[i] === fn || fns[i].fn === fn) {
        fns.splice(i, 1);
      }
    }
  }

  return vm;
}

function emit(event) {
  const vm = this;
  const events = vm._events[event];
  const slice = Array.prototype.slice;

  if (events) {
    const args = slice.call(arguments, 1);

    for (let i = 0, len = events.length; i < len; i++) {
      try {
        events[i].apply(vm, args);
      } catch (e) {
        Object(_helper__WEBPACK_IMPORTED_MODULE_1__["handleError"])(e, vm, `event handler for "${event}"`);
      }
    }
  }

  return vm;
}

/***/ }),

/***/ "./packages/lone-logic/helper.js":
/*!***************************************!*\
  !*** ./packages/lone-logic/helper.js ***!
  \***************************************/
/*! exports provided: initOptions, handleError, initData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initOptions", function() { return initOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handleError", function() { return handleError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initData", function() { return initData; });
/* harmony import */ var lone_util_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lone-util/constants */ "./packages/lone-util/constants.js");
/* harmony import */ var lone_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lone-util */ "./packages/lone-util/index.js");


function initOptions(options) {
  normalizeHooks(options);
  return options;
}

function normalizeHooks(options) {
  for (const key in options) {
    if (lone_util_constants__WEBPACK_IMPORTED_MODULE_0__["LIFECYCLE_HOOKS"].includes(key)) {
      options[key] = Object(lone_util__WEBPACK_IMPORTED_MODULE_1__["isArray"])(options[key]) ? options[key] : [options[key]];
    }
  }
}

function handleError() {}
function initData(vm) {
  const data = vm.$options.data;
  vm.data = Object(lone_util__WEBPACK_IMPORTED_MODULE_1__["isFunction"])(data) ? getData(data, vm) : data;
}

function getData(data, vm) {
  try {
    return data.call(vm, vm);
  } catch (e) {
    handleError(e, vm, 'data()');
    return {};
  }
}

/***/ }),

/***/ "./packages/lone-logic/index.js":
/*!**************************************!*\
  !*** ./packages/lone-logic/index.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component */ "./packages/lone-logic/component.js");
/* harmony import */ var _schedule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./schedule */ "./packages/lone-logic/schedule.js");


/* harmony default export */ __webpack_exports__["default"] = (function (options) {
  const component = new _component__WEBPACK_IMPORTED_MODULE_0__["default"](options);
  Object(_schedule__WEBPACK_IMPORTED_MODULE_1__["addComponent"])(component._id, component);
  return component;
});

/***/ }),

/***/ "./packages/lone-logic/schedule.js":
/*!*****************************************!*\
  !*** ./packages/lone-logic/schedule.js ***!
  \*****************************************/
/*! exports provided: componentStorage, master, addComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "componentStorage", function() { return componentStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "master", function() { return master; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addComponent", function() { return addComponent; });
/* harmony import */ var lone_messenger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lone-messenger */ "./packages/lone-messenger/index.js");
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./component */ "./packages/lone-logic/component.js");


const componentStorage = new Map();
const master = new lone_messenger__WEBPACK_IMPORTED_MODULE_0__["Master"]({
  env: 'postMessage'
});
function addComponent(id, component) {
  componentStorage.set(id, component);
}
const MESSENGER_EVENTS_UI = {
  'ui:inited': function ({
    id
  }) {
    const vm = componentStorage.get(id);
    master.send('logic:data', {
      id,
      data: vm.data
    });
  },
  'ui:ready': function ({
    id
  }) {
    const vm = componentStorage.get(id);
    Object(_component__WEBPACK_IMPORTED_MODULE_1__["callHook"])(vm, 'onReady');
    Object(_component__WEBPACK_IMPORTED_MODULE_1__["callHook"])(vm, 'mounted');
  }
};

for (const [event, fn] of Object.entries(MESSENGER_EVENTS_UI)) {
  master.onmessage(event, fn);
}

/***/ }),

/***/ "./packages/lone-messenger/base/messenger.js":
/*!***************************************************!*\
  !*** ./packages/lone-messenger/base/messenger.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Messenger {
  constructor() {
    if (new.target === Messenger) {
      throw new TypeError('Messenger is only used for inheritance, not allowed to use directly.');
    }

    this._messages = Object.create(null);

    this._listen();
  }

  onmessage(type, fn) {
    (this._messages[type] || (this._messages[type] = [])).push(fn);
  }

  send(type, data) {
    this._postMessage(type, data);
  }

  _listen() {
    this._onmessage(evt => {
      const cbs = this._messages[evt.type];
      if (!cbs) return;
      let i = cbs.length;

      while (i--) {
        cbs[i].call(evt, evt.data);
      }
    });
  }

  _postMessage() {
    throw new TypeError('Subclass of Messenger doesn\'t provide the \'_postMessage\' method.');
  }

  _onmessage() {
    throw new TypeError('Subclass of Messenger doesn\'t provide the \'_onmessage\' method.');
  }

}

/* harmony default export */ __webpack_exports__["default"] = (new Proxy(Messenger, {
  apply() {
    throw new TypeError('Messenger is only used for inheritance, not allowed to use directly.');
  }

}));

/***/ }),

/***/ "./packages/lone-messenger/base/native-messenger.js":
/*!**********************************************************!*\
  !*** ./packages/lone-messenger/base/native-messenger.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _messenger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./messenger */ "./packages/lone-messenger/base/messenger.js");
/* harmony import */ var lone_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lone-util */ "./packages/lone-util/index.js");



class NativeMessenger extends _messenger__WEBPACK_IMPORTED_MODULE_0__["default"] {
  _postMessage(type, data) {
    if (!Object(lone_util__WEBPACK_IMPORTED_MODULE_1__["isObject"])(data)) throw new TypeError('data must be plain object.');
    const bag = JSON.stringify({
      type,
      data
    });
    window.senative.call('sendMessage', bag, (code, data, msg) => {});
  }

  _onmessage(fn) {
    window.onSeNativeMessage = function (rawData) {
      const data = JSON.parse(rawData);
      fn(data);
    };
  }

}

/* harmony default export */ __webpack_exports__["default"] = (NativeMessenger);

/***/ }),

/***/ "./packages/lone-messenger/base/post-messenger.js":
/*!********************************************************!*\
  !*** ./packages/lone-messenger/base/post-messenger.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _messenger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./messenger */ "./packages/lone-messenger/base/messenger.js");


class PostMessenger extends _messenger__WEBPACK_IMPORTED_MODULE_0__["default"] {
  _onmessage(fn) {
    window.addEventListener('message', function (evt) {
      if (evt.origin !== location.origin) return;
      fn.call(evt, evt.data);
    });
  }

}

/* harmony default export */ __webpack_exports__["default"] = (PostMessenger);

/***/ }),

/***/ "./packages/lone-messenger/index.js":
/*!******************************************!*\
  !*** ./packages/lone-messenger/index.js ***!
  \******************************************/
/*! exports provided: Master, Slave */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _master__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./master */ "./packages/lone-messenger/master/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Master", function() { return _master__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _slave__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./slave */ "./packages/lone-messenger/slave/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Slave", function() { return _slave__WEBPACK_IMPORTED_MODULE_1__["default"]; });





/***/ }),

/***/ "./packages/lone-messenger/master/index.js":
/*!*************************************************!*\
  !*** ./packages/lone-messenger/master/index.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _base_native_messenger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base/native-messenger */ "./packages/lone-messenger/base/native-messenger.js");
/* harmony import */ var _post_messenger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./post-messenger */ "./packages/lone-messenger/master/post-messenger.js");


/* harmony default export */ __webpack_exports__["default"] = (new Proxy(class Master {}, {
  construct(trapTarget, argumentList) {
    const options = argumentList[0];
    return Reflect.construct(options.env && options.env === 'postMessage' ? _post_messenger__WEBPACK_IMPORTED_MODULE_1__["default"] : _base_native_messenger__WEBPACK_IMPORTED_MODULE_0__["default"], argumentList);
  }

}));

/***/ }),

/***/ "./packages/lone-messenger/master/post-messenger.js":
/*!**********************************************************!*\
  !*** ./packages/lone-messenger/master/post-messenger.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _base_post_messenger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base/post-messenger */ "./packages/lone-messenger/base/post-messenger.js");

const connection = Symbol('messenger:slave#connection');

class PostMessenger extends _base_post_messenger__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
    this[connection]();
  }

  [connection]() {
    this._postMessage('connection');
  }

  _postMessage(type, data) {
    const slave = window.parent;
    slave.postMessage({
      type,
      data
    }, slave.origin);
  }

}

/* harmony default export */ __webpack_exports__["default"] = (PostMessenger);

/***/ }),

/***/ "./packages/lone-messenger/slave/index.js":
/*!************************************************!*\
  !*** ./packages/lone-messenger/slave/index.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _native_messenger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./native-messenger */ "./packages/lone-messenger/slave/native-messenger.js");
/* harmony import */ var _post_messenger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./post-messenger */ "./packages/lone-messenger/slave/post-messenger.js");


/* harmony default export */ __webpack_exports__["default"] = (new Proxy(class Slave {}, {
  construct(trapTarget, argumentList) {
    const options = argumentList[0];
    return Reflect.construct(options.env && options.env === 'postMessage' ? _post_messenger__WEBPACK_IMPORTED_MODULE_1__["default"] : _native_messenger__WEBPACK_IMPORTED_MODULE_0__["default"], argumentList);
  }

}));

/***/ }),

/***/ "./packages/lone-messenger/slave/native-messenger.js":
/*!***********************************************************!*\
  !*** ./packages/lone-messenger/slave/native-messenger.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _base_native_messenger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base/native-messenger */ "./packages/lone-messenger/base/native-messenger.js");

const connection = Symbol('messenger:slave#connection');

class NativeMessenger extends _base_native_messenger__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
    this[connection]();
  }

  [connection]() {
    window.senative.call('frontPageReady', '', function (code, msg, data) {});
  }

}

/* harmony default export */ __webpack_exports__["default"] = (NativeMessenger);

/***/ }),

/***/ "./packages/lone-messenger/slave/post-messenger.js":
/*!*********************************************************!*\
  !*** ./packages/lone-messenger/slave/post-messenger.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _base_post_messenger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base/post-messenger */ "./packages/lone-messenger/base/post-messenger.js");

const connection = Symbol('messenger:slave#connection');
const source = Symbol('messenger:slave#connection');

class PostMessenger extends _base_post_messenger__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
    this[source] = null;
    this[connection]();
  }

  [connection]() {
    const vm = this;

    vm._onmessage(function (data) {
      if (data.type === 'connection') {
        vm[source] = this.source;
      }
    });
  }

  _postMessage(type, data) {
    const master = this[source];
    master.postMessage({
      type,
      data
    }, master.origin);
  }

}

/* harmony default export */ __webpack_exports__["default"] = (PostMessenger);

/***/ }),

/***/ "./packages/lone-util/constants.js":
/*!*****************************************!*\
  !*** ./packages/lone-util/constants.js ***!
  \*****************************************/
/*! exports provided: LIFECYCLE_HOOKS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LIFECYCLE_HOOKS", function() { return LIFECYCLE_HOOKS; });
const LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed', 'activated', 'deactivated', 'errorCaptured', 'onHide', 'onLoad', 'onReady', 'onShow', 'onUnload'];

/***/ }),

/***/ "./packages/lone-util/index.js":
/*!*************************************!*\
  !*** ./packages/lone-util/index.js ***!
  \*************************************/
/*! exports provided: isString, isObject, isBoolean, isArray, isFunction, noop */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isString", function() { return isString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObject", function() { return isObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isBoolean", function() { return isBoolean; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArray", function() { return isArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFunction", function() { return isFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noop", function() { return noop; });
const toString = Object.prototype.toString;
const isString = s => toString.call(s) === '[object String]';
const isObject = o => toString.call(o) === '[object Object]';
const isBoolean = b => toString.call(b) === '[object Boolean]';
const isArray = a => toString.call(a) === '[object Array]';
const isFunction = f => toString.call(f) === '[object Function]';
function noop() {}

/***/ })

/******/ })["default"];
});
//# sourceMappingURL=Lone.logic.js.map