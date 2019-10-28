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
/*! exports provided: default, createComponentInstance, callHook */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createComponentInstance", function() { return createComponentInstance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "callHook", function() { return callHook; });
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper */ "./packages/lone-logic/helper.js");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./events */ "./packages/lone-logic/events.js");
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./router */ "./packages/lone-logic/router.js");
/* harmony import */ var _schedule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./schedule */ "./packages/lone-logic/schedule.js");
var _class;





const componentStorage = new Map();
const init = Symbol('lone-logic:init');

let LogicComponent = Object(_events__WEBPACK_IMPORTED_MODULE_1__["default"])(_class = Object(_router__WEBPACK_IMPORTED_MODULE_2__["default"])(_class = class LogicComponent {
  constructor(id, options) {
    const vm = this;
    vm._id = id;
    vm[init](options);
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
    _schedule__WEBPACK_IMPORTED_MODULE_3__["slave"].send('logic:data', Object(_helper__WEBPACK_IMPORTED_MODULE_0__["getChannel"])(this._id), {
      id: this._id,
      data: Object.assign(oldData, data)
    });
  }

}) || _class) || _class;

function Component(name, options) {
  componentStorage.set(name, options);
}
function createComponentInstance(name, id) {
  const options = componentStorage.get(name);
  return new LogicComponent(id, options);
}
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
/*! exports provided: initOptions, handleError, initData, getChannel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initOptions", function() { return initOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handleError", function() { return handleError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initData", function() { return initData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getChannel", function() { return getChannel; });
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

function getChannel(componentId) {
  return componentId.split('_')[0];
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
/* harmony import */ var _schedule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schedule */ "./packages/lone-logic/schedule.js");
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./component */ "./packages/lone-logic/component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _component__WEBPACK_IMPORTED_MODULE_1__["default"]; });




/***/ }),

/***/ "./packages/lone-logic/router.js":
/*!***************************************!*\
  !*** ./packages/lone-logic/router.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return events; });
/* harmony import */ var _schedule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schedule */ "./packages/lone-logic/schedule.js");

function events(Lone) {
  const proto = Lone.prototype;
  proto.navigateTo = navigateTo;
  proto.redirectTo = redirectTo;
  proto.navigateBack = navigateBack;
}

function navigateTo(url) {
  _schedule__WEBPACK_IMPORTED_MODULE_0__["slave"].send('logic:navigateTo', null, {
    url
  });
}

function redirectTo(url) {
  _schedule__WEBPACK_IMPORTED_MODULE_0__["slave"].send('logic:redirectTo', null, {
    url
  });
}

function navigateBack(delta) {
  _schedule__WEBPACK_IMPORTED_MODULE_0__["slave"].send('logic:navigateBack', null, {
    delta
  });
}

/***/ }),

/***/ "./packages/lone-logic/schedule.js":
/*!*****************************************!*\
  !*** ./packages/lone-logic/schedule.js ***!
  \*****************************************/
/*! exports provided: instanceStorage, slave */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "instanceStorage", function() { return instanceStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "slave", function() { return slave; });
/* harmony import */ var lone_messenger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lone-messenger */ "./packages/lone-messenger/index.js");
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./component */ "./packages/lone-logic/component.js");
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helper */ "./packages/lone-logic/helper.js");



const instanceStorage = new Map();
const slave = new lone_messenger__WEBPACK_IMPORTED_MODULE_0__["Slave"]({
  env: 'postMessage',
  channel: 'logic'
});
const MESSENGER_EVENTS_UI = {
  'ui:inited': function ({
    name,
    id
  }) {
    const vm = Object(_component__WEBPACK_IMPORTED_MODULE_1__["createComponentInstance"])(name, id);
    instanceStorage.set(id, vm);
    slave.send('logic:data', Object(_helper__WEBPACK_IMPORTED_MODULE_2__["getChannel"])(id), {
      id,
      data: vm.data
    });
  },
  'ui:ready': function ({
    id
  }) {
    const vm = instanceStorage.get(id);
    Object(_component__WEBPACK_IMPORTED_MODULE_1__["callHook"])(vm, 'onReady');
    Object(_component__WEBPACK_IMPORTED_MODULE_1__["callHook"])(vm, 'mounted');
  }
};

for (const [event, fn] of Object.entries(MESSENGER_EVENTS_UI)) {
  slave.onmessage(event, fn);
}

slave.send('logic:inited');

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
  }

  onmessage(type, fn) {
    (this._messages[type] || (this._messages[type] = [])).push(fn);
  }

  send(type, channel, data) {
    this._postMessage(type, channel, data);
  }

  listen() {
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


class NativeMessenger extends _messenger__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
    this.listen();
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
  constructor() {
    super();
    this.listen();
  }

  _onmessage(fn) {
    window.addEventListener('message', function (evt) {
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Master; });
/* harmony import */ var _base_messenger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base/messenger */ "./packages/lone-messenger/base/messenger.js");
/* harmony import */ var _native_messenger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./native-messenger */ "./packages/lone-messenger/master/native-messenger.js");
/* harmony import */ var _post_messenger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./post-messenger */ "./packages/lone-messenger/master/post-messenger.js");



const connection = Symbol('messenger:master#connection');
class Master extends _base_messenger__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(options) {
    super();
    this.env = options.env;
    this.native = new _native_messenger__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this.post = new _post_messenger__WEBPACK_IMPORTED_MODULE_2__["default"]();
    this[connection]();
    this.listen();
  }

  [connection]() {
    if (this._isNative()) this.native.connection();
    this.post.connection();
  }

  listen() {
    this._onmessage(evt => {
      const cbs = this._messages[evt.type];
      if (!cbs) return;
      let i = cbs.length;

      while (i--) {
        cbs[i].call(evt, evt.channel, evt.data);
      }
    });
  }

  _onmessage(fn) {
    if (this._isNative()) this.native.onmessage(fn);
    this.post.onmessage(fn);
  }

  _postMessage(type, channel, data) {
    if (channel === 'logic' && this._isNative()) {
      return this.native.send(type, channel, data);
    }

    return this.post.send(type, channel, data);
  }

  _isNative() {
    return this.env !== 'postMessage';
  }

}

/***/ }),

/***/ "./packages/lone-messenger/master/native-messenger.js":
/*!************************************************************!*\
  !*** ./packages/lone-messenger/master/native-messenger.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lone_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lone-util */ "./packages/lone-util/index.js");


class NativeMessenger {
  connection() {
    window.senative.call('frontPageReady', '', function (code, msg, data) {});
  }

  send(type, channel, data) {
    if (!Object(lone_util__WEBPACK_IMPORTED_MODULE_0__["isObject"])(data)) throw new TypeError('data must be plain object.');
    const bag = JSON.stringify({
      type,
      data
    });
    window.senative.call('sendMessage', bag, (code, data, msg) => {});
  }

  onmessage(fn) {
    window.onSeNativeMessage = function (rawData) {
      const data = JSON.parse(rawData);
      fn(data);
    };
  }

}

/* harmony default export */ __webpack_exports__["default"] = (NativeMessenger);

/***/ }),

/***/ "./packages/lone-messenger/master/post-messenger.js":
/*!**********************************************************!*\
  !*** ./packages/lone-messenger/master/post-messenger.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const source = Symbol('messenger:master#connection');

class PostMessenger {
  constructor() {
    this[source] = Object.create(null);
  }

  connection() {
    const vm = this;
    vm.onmessage(function ({
      type,
      channel
    }) {
      if (type === 'connection') {
        vm[source][channel] = this.source;
      }
    });
  }

  onmessage(fn) {
    window.addEventListener('message', function (evt) {
      if (evt.origin !== location.origin) return;
      fn.call(evt, evt.data);
    });
  }

  send(type, channel, data) {
    const slave = this[source][channel];
    if (!slave) throw new Error('No Slave Source, please connection first!');
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
/* harmony import */ var lone_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lone-util */ "./packages/lone-util/index.js");



class NativeMessenger extends _base_native_messenger__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(options) {
    super();
    this.channel = options.channel;
  }

  _postMessage(type, channel, data) {
    if (!Object(lone_util__WEBPACK_IMPORTED_MODULE_1__["isObject"])(data)) throw new TypeError('data must be plain object.');
    const bag = JSON.stringify({
      type,
      channel,
      data
    });
    window.senative.call('sendMessage', bag, (code, data, msg) => {});
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

class PostMessenger extends _base_post_messenger__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(options) {
    super();
    this.channel = options.channel;
    this[connection]();
  }

  [connection]() {
    this._postMessage('connection', this.channel);
  }

  _postMessage(type, channel, data) {
    const slave = window.parent;
    slave.postMessage({
      type,
      channel,
      data
    }, slave.origin);
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
/*! exports provided: isString, isObject, isBoolean, isArray, isFunction, noop, camelize, no, cached, extend, toObject, makeMap, isBuiltInTag, warn, tip, isUnaryTag, canBeLeftOpenTag, isNonPhrasingTag, genStaticKeys, isDef */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isString", function() { return isString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObject", function() { return isObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isBoolean", function() { return isBoolean; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArray", function() { return isArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFunction", function() { return isFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noop", function() { return noop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "camelize", function() { return camelize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "no", function() { return no; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cached", function() { return cached; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extend", function() { return extend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toObject", function() { return toObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeMap", function() { return makeMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isBuiltInTag", function() { return isBuiltInTag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "warn", function() { return warn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tip", function() { return tip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isUnaryTag", function() { return isUnaryTag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canBeLeftOpenTag", function() { return canBeLeftOpenTag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNonPhrasingTag", function() { return isNonPhrasingTag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "genStaticKeys", function() { return genStaticKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDef", function() { return isDef; });
const toString = Object.prototype.toString;
const isString = s => toString.call(s) === '[object String]';
const isObject = o => toString.call(o) === '[object Object]';
const isBoolean = b => toString.call(b) === '[object Boolean]';
const isArray = a => toString.call(a) === '[object Array]';
const isFunction = f => toString.call(f) === '[object Function]';
function noop() {}
/**
 * Camelize a hyphen-delimited string.
 */

const camelizeRE = /-(\w)/g;
const camelize = cached(str => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '');
});
/**
 * Always return false.
 */

const no = _ => false;
/**
 * Create a cached version of a pure function.
 */

function cached(fn) {
  const cache = Object.create(null);
  return function cachedFn(str) {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
/**
 * Mix properties into target object.
 */

function extend(to, _from) {
  for (const key in _from) {
    to[key] = _from[key];
  }

  return to;
}
/**
 * Merge an Array of Objects into a single Object.
 */

function toObject(arr) {
  const res = {};

  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }

  return res;
}
/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */

function makeMap(str, expectsLowerCase) {
  const map = Object.create(null);
  const list = str.split(',');

  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }

  return expectsLowerCase ? val => map[val.toLowerCase()] : val => map[val];
}
/**
 * Check if a tag is a built-in tag.
 */

const isBuiltInTag = makeMap('slot,component', true);
const warn = noop;
const tip = noop;
const isUnaryTag = makeMap('area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' + 'link,meta,param,source,track,wbr'); // Elements that you can, intentionally, leave open
// (and which close themselves)

const canBeLeftOpenTag = makeMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'); // HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content

const isNonPhrasingTag = makeMap('address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' + 'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' + 'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' + 'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' + 'title,tr,track');
/**
 * Generate a static keys string from compiler modules.
 */

function genStaticKeys(modules) {
  return modules.reduce((keys, m) => {
    return keys.concat(m.staticKeys || []);
  }, []).join(',');
}
function isDef(v) {
  return v !== undefined && v !== null;
}

/***/ })

/******/ })["default"];
});
//# sourceMappingURL=Lone.logic.js.map