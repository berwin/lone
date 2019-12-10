var Lone = typeof Lone === "object" ? Lone : {}; Lone["logic"] =
/******/ (function(modules) { // webpackBootstrap
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

/***/ "./packages/lone-logic/component/events.js":
/*!*************************************************!*\
  !*** ./packages/lone-logic/component/events.js ***!
  \*************************************************/
/*! exports provided: default, initEvents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return events; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initEvents", function() { return initEvents; });
/* harmony import */ var lone_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lone-util */ "./packages/lone-util/index.js");
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper */ "./packages/lone-logic/helper.js");
/* harmony import */ var _schedule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../schedule */ "./packages/lone-logic/schedule.js");



function events(Lone) {
  const proto = Lone.prototype;
  proto.$on = on;
  proto.$once = once;
  proto.$off = off;
  proto.$emit = emit;
}
function initEvents(vm) {
  const parentListeners = vm.$options.parentListeners;
  let i = parentListeners.length;

  while (i--) {
    const name = parentListeners[i];
    vm.$on(name, function (data) {
      _schedule__WEBPACK_IMPORTED_MODULE_2__["slave"].send('component:triggerParentEvent', vm._id, {
        name,
        data
      });
    });
  }
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

/***/ "./packages/lone-logic/component/index.js":
/*!************************************************!*\
  !*** ./packages/lone-logic/component/index.js ***!
  \************************************************/
/*! exports provided: default, createComponentInstance, callHook */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createComponentInstance", function() { return createComponentInstance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "callHook", function() { return callHook; });
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper */ "./packages/lone-logic/helper.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ "./packages/lone-logic/component/state.js");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./events */ "./packages/lone-logic/component/events.js");
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./router */ "./packages/lone-logic/component/router.js");
/* harmony import */ var _schedule__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../schedule */ "./packages/lone-logic/schedule.js");
/* harmony import */ var _observer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./observer */ "./packages/lone-logic/component/observer.js");
var _class;







const componentStorage = new Map();
const init = Symbol('lone-logic:init');

let LogicComponent = Object(_events__WEBPACK_IMPORTED_MODULE_2__["default"])(_class = Object(_router__WEBPACK_IMPORTED_MODULE_3__["default"])(_class = class LogicComponent {
  constructor(id, options) {
    const vm = this;
    vm._id = id;
    vm[init](options);
  }

  [init](options) {
    const vm = this;
    vm._events = Object.create(null);
    vm.$options = Object(_helper__WEBPACK_IMPORTED_MODULE_0__["initOptions"])(options);
    Object(_events__WEBPACK_IMPORTED_MODULE_2__["initEvents"])(vm);
    callHook(vm, 'beforeCreate');
    Object(_state__WEBPACK_IMPORTED_MODULE_1__["default"])(vm);
    callHook(vm, 'created');
    Object(_helper__WEBPACK_IMPORTED_MODULE_0__["sendInitCommandToPageComponent"])(vm);
  }

  setData(data) {
    const oldData = this.data;
    this.data = Object.assign({}, oldData, data);
    Object(_observer__WEBPACK_IMPORTED_MODULE_5__["notifyPropsObserver"])(this, oldData, this.data);
    _schedule__WEBPACK_IMPORTED_MODULE_4__["slave"].send('component:data', this._id, this.data);
  }

}) || _class) || _class;

function Component(name, options) {
  componentStorage.set(name, options);
}
function createComponentInstance(name, id, otherOptions) {
  const options = Object.assign(componentStorage.get(name), otherOptions);
  options.name = name;
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

/***/ "./packages/lone-logic/component/observer.js":
/*!***************************************************!*\
  !*** ./packages/lone-logic/component/observer.js ***!
  \***************************************************/
/*! exports provided: notifyPropsObserver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "notifyPropsObserver", function() { return notifyPropsObserver; });
function notifyPropsObserver(vm, oldData, newData) {
  const propsOptions = vm.$options.props;

  for (const key in newData) {
    if (key in propsOptions) {
      const cur = newData[key];
      const old = oldData[key];
      const observer = propsOptions[key].observer;

      if (JSON.stringify(cur) !== JSON.stringify(old)) {
        observer && observer.call(vm, cur, old);
      }
    }
  }

  for (const key in oldData) {
    if (!(key in newData)) {
      const old = oldData[key];
      const observer = propsOptions[key].observer;
      observer && observer.call(vm, null, old);
    }
  }
}

/***/ }),

/***/ "./packages/lone-logic/component/router.js":
/*!*************************************************!*\
  !*** ./packages/lone-logic/component/router.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return events; });
/* harmony import */ var _schedule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../schedule */ "./packages/lone-logic/schedule.js");

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

/***/ "./packages/lone-logic/component/state.js":
/*!************************************************!*\
  !*** ./packages/lone-logic/component/state.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return initState; });
/* harmony import */ var lone_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lone-util */ "./packages/lone-util/index.js");
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper */ "./packages/lone-logic/helper.js");


function initState(vm) {
  vm.data = Object.create(null);
  initProps(vm);
  initData(vm);
}

function initData(vm) {
  const rawData = vm.$options.data;
  const data = Object(lone_util__WEBPACK_IMPORTED_MODULE_0__["isFunction"])(rawData) ? getData(rawData, vm) : rawData;

  for (const name in data) {
    if (name in vm.data) {
      Object(_helper__WEBPACK_IMPORTED_MODULE_1__["warn"])('"data.' + name + '": already exists, Props and data are not recommended to have the same name', vm);
    }

    if (!(name in vm.data)) {
      vm.data[name] = data[name];
    }
  }
}

function getData(data, vm) {
  try {
    return data.call(vm, vm);
  } catch (e) {
    Object(_helper__WEBPACK_IMPORTED_MODULE_1__["handleError"])(e, vm, 'data()');
    return {};
  }
}

function initProps(vm) {
  const propsOptions = vm.$options.props;
  if (!propsOptions) return;

  for (const key in propsOptions) {
    const propsData = vm.$options.propsData;
    const value = validateProp(key, propsOptions, propsData, vm);
    vm.data[key] = value;
  }
}

function validateProp(key, propsOptions, propsData, vm) {
  const prop = propsOptions[key];
  const absent = !(key in propsData);
  let value = propsData[key];

  if (isType(Boolean, prop.type)) {
    if (absent && !('default' in prop)) {
      // absent = false
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === Object(lone_util__WEBPACK_IMPORTED_MODULE_0__["hyphenate"])(key))) {
      // '' = true
      value = true;
    }
  } // check default value


  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
  }

  assertProp(prop, key, value, vm, absent);
  return value;
}
/**
 * Get the default value of a prop.
 */


function getPropDefaultValue(vm, prop, key) {
  // no default, return undefined
  if (!('default' in prop)) {
    return undefined;
  }

  const def = prop.default; // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context

  return typeof def === 'function' && getType(prop.type) !== 'Function' ? def.call(vm) : def;
}

function assertProp(prop, name, value, vm, absent) {
  if (prop.required && absent) {
    Object(_helper__WEBPACK_IMPORTED_MODULE_1__["warn"])('Missing required prop: "' + name + '"', vm);
    return undefined;
  }

  if (value == null && !prop.required) {
    return undefined;
  }

  let type = prop.type;
  let valid = !type || type === true;

  if (type) {
    if (!Object(lone_util__WEBPACK_IMPORTED_MODULE_0__["isArray"])(type)) {
      type = [type];
    }

    for (let i = 0; i < type.length && !valid; i++) {
      const toString = Object.prototype.toString;
      valid = toString.call(value) === toString.call(type[i]());
    }
  }

  if (!valid) {
    Object(_helper__WEBPACK_IMPORTED_MODULE_1__["warn"])(`Invalid prop: type check failed for prop "${name}".`, vm);
    return undefined;
  }

  const validator = prop.validator;

  if (validator) {
    if (!validator(value)) {
      Object(_helper__WEBPACK_IMPORTED_MODULE_1__["warn"])('Invalid prop: custom validator check failed for prop "' + name + '".', vm);
    }
  }
}
/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */


function getType(fn) {
  const match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : '';
}

function isType(type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type);
  }

  for (let i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true;
    }
  }

  return false;
}

/***/ }),

/***/ "./packages/lone-logic/helper.js":
/*!***************************************!*\
  !*** ./packages/lone-logic/helper.js ***!
  \***************************************/
/*! exports provided: initOptions, warn, handleError, sendInitCommandToPageComponent, triggerEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initOptions", function() { return initOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "warn", function() { return warn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handleError", function() { return handleError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendInitCommandToPageComponent", function() { return sendInitCommandToPageComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "triggerEvent", function() { return triggerEvent; });
/* harmony import */ var lone_util_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lone-util/constants */ "./packages/lone-util/constants.js");
/* harmony import */ var lone_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lone-util */ "./packages/lone-util/index.js");
/* harmony import */ var _schedule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./schedule */ "./packages/lone-logic/schedule.js");



function initOptions(options) {
  normalizeHooks(options);
  normalizePropsData(options);
  return options;
}

function normalizeHooks(options) {
  for (const key in options) {
    if (lone_util_constants__WEBPACK_IMPORTED_MODULE_0__["LIFECYCLE_HOOKS"].includes(key)) {
      options[key] = Object(lone_util__WEBPACK_IMPORTED_MODULE_1__["isArray"])(options[key]) ? options[key] : [options[key]];
    }
  }
}

function normalizePropsData(options) {
  const props = options.props;
  const res = {};
  let i, val, name;

  if (Object(lone_util__WEBPACK_IMPORTED_MODULE_1__["isArray"])(props)) {
    i = props.length;

    while (i--) {
      val = props[i];

      if (typeof val === 'string') {
        name = Object(lone_util__WEBPACK_IMPORTED_MODULE_1__["camelize"])(val);
        res[name] = {
          type: null
        };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (Object(lone_util__WEBPACK_IMPORTED_MODULE_1__["isPlainObject"])(props)) {
    for (const key in props) {
      val = props[key];
      name = Object(lone_util__WEBPACK_IMPORTED_MODULE_1__["camelize"])(key);
      res[name] = Object(lone_util__WEBPACK_IMPORTED_MODULE_1__["isPlainObject"])(val) ? val : {
        type: val
      };
    }
  }

  options.props = res;
}

function warn(msg, vm) {
  console.error(`[${vm ? vm.$options.name + ' ' : ''}warn]: ${msg}`);
}
function handleError(err, vm, info) {
  console.error(`[warn]: ${`Error in ${info}: "${err.toString()}"`}`);
}
function sendInitCommandToPageComponent(vm) {
  const reservedWords = [...lone_util_constants__WEBPACK_IMPORTED_MODULE_0__["LIFECYCLE_HOOKS"], 'data', 'methods'];
  _schedule__WEBPACK_IMPORTED_MODULE_2__["slave"].send('component:inited', vm._id, {
    data: vm.data || {},
    methods: [...Object.keys(vm.$options).filter(key => !reservedWords.includes(key)), ...Object.keys(vm.$options.methods || {})]
  });
}
function triggerEvent(vm, method, event) {
  const handler = vm.$options[method] || vm.$options.methods[method];

  try {
    handler.call(vm, event);
  } catch (e) {
    handleError(e, vm, `"${method}" event handler`);
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
/* harmony import */ var _schedule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schedule */ "./packages/lone-logic/schedule.js");
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./component */ "./packages/lone-logic/component/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _component__WEBPACK_IMPORTED_MODULE_1__["default"]; });




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
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./component */ "./packages/lone-logic/component/index.js");
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helper */ "./packages/lone-logic/helper.js");



const instanceStorage = new Map();
const slave = new lone_messenger__WEBPACK_IMPORTED_MODULE_0__["Slave"]({
  env: 'worker',
  channel: 'logic'
});
const MESSENGER_EVENTS_UI = {
  'ui:inited': function ({
    name,
    id,
    propsData,
    parentListeners
  }) {
    const vm = Object(_component__WEBPACK_IMPORTED_MODULE_1__["createComponentInstance"])(name, id, {
      propsData,
      parentListeners
    });
    instanceStorage.set(id, vm);
  },
  'ui:ready': function ({
    id
  }) {
    const vm = instanceStorage.get(id);
    Object(_component__WEBPACK_IMPORTED_MODULE_1__["callHook"])(vm, 'onReady');
    Object(_component__WEBPACK_IMPORTED_MODULE_1__["callHook"])(vm, 'mounted');
  },
  'ui:triggerEvent': function ({
    id,
    method,
    event
  }) {
    const vm = instanceStorage.get(id);
    Object(_helper__WEBPACK_IMPORTED_MODULE_2__["triggerEvent"])(vm, method, event);
  },
  'ui:data': function ({
    id,
    data
  }) {
    const vm = instanceStorage.get(id);
    vm.setData(data);
  }
};

for (const [event, fn] of Object.entries(MESSENGER_EVENTS_UI)) {
  slave.onmessage(event, fn);
}

slave.send('logic:inited');

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
/* harmony import */ var _native_messenger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./native-messenger */ "./packages/lone-messenger/master/native-messenger.js");
/* harmony import */ var _post_messenger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./post-messenger */ "./packages/lone-messenger/master/post-messenger.js");
/* harmony import */ var _worker_messenger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./worker-messenger */ "./packages/lone-messenger/master/worker-messenger.js");



const connection = Symbol('messenger:master#connection');
class Master {
  constructor(options) {
    this._messages = Object.create(null);
    this.options = options;
    this.native = new _native_messenger__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.post = new _post_messenger__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this.worker = new _worker_messenger__WEBPACK_IMPORTED_MODULE_2__["default"]();
    this[connection]();
    this.listen();
  }

  [connection]() {
    if (this.options.env === 'native') this.native.connection();
    if (this.options.env === 'worker') this.worker.connection(this.options.worker);
    this.post.connection();
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
        cbs[i].call(evt, evt.channel, evt.data);
      }
    });
  }

  _onmessage(fn) {
    if (this.options.env === 'native') this.native.onmessage(fn);
    if (this.options.env === 'worker') this.worker.onmessage(fn);
    this.post.onmessage(fn);
  }

  _postMessage(type, channel, data) {
    if (channel === 'logic') {
      if (this.options.env === 'native') return this.native.send(type, data);
      if (this.options.env === 'worker') return this.worker.send(type, data);
    }

    return this.post.send(type, channel, data);
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

  send(type, data) {
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
      channel,
      data
    }, slave.origin);
  }

}

/* harmony default export */ __webpack_exports__["default"] = (PostMessenger);

/***/ }),

/***/ "./packages/lone-messenger/master/worker-messenger.js":
/*!************************************************************!*\
  !*** ./packages/lone-messenger/master/worker-messenger.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class WorkerMessenger {
  connection(source) {
    this.source = source;
  }

  onmessage(fn) {
    this.source.onmessage = function (evt) {
      fn.call(evt, evt.data);
    };
  }

  send(type, data) {
    this.source.postMessage({
      type,
      data
    });
  }

}

/* harmony default export */ __webpack_exports__["default"] = (WorkerMessenger);

/***/ }),

/***/ "./packages/lone-messenger/slave/base.js":
/*!***********************************************!*\
  !*** ./packages/lone-messenger/slave/base.js ***!
  \***********************************************/
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
/* harmony import */ var _worker_messenger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./worker-messenger */ "./packages/lone-messenger/slave/worker-messenger.js");



const slaveMap = {
  postMessage: _post_messenger__WEBPACK_IMPORTED_MODULE_1__["default"],
  native: _native_messenger__WEBPACK_IMPORTED_MODULE_0__["default"],
  worker: _worker_messenger__WEBPACK_IMPORTED_MODULE_2__["default"]
};
/* harmony default export */ __webpack_exports__["default"] = (new Proxy(class Slave {}, {
  construct(trapTarget, argumentList) {
    const options = argumentList[0];
    return Reflect.construct(slaveMap[options.env], argumentList);
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
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ "./packages/lone-messenger/slave/base.js");
/* harmony import */ var lone_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lone-util */ "./packages/lone-util/index.js");



class NativeMessenger extends _base__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ "./packages/lone-messenger/slave/base.js");

const connection = Symbol('messenger:slave#connection');

class PostMessenger extends _base__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(options) {
    super();
    this.channel = options.channel;
    this.listen();
    this[connection]();
  }

  [connection]() {
    this._postMessage('connection', this.channel);
  }

  _onmessage(fn) {
    const vm = this;
    window.addEventListener('message', function (evt) {
      if (evt.data.channel === vm.channel) {
        fn.call(evt, evt.data);
      }
    });
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

/***/ "./packages/lone-messenger/slave/worker-messenger.js":
/*!***********************************************************!*\
  !*** ./packages/lone-messenger/slave/worker-messenger.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ "./packages/lone-messenger/slave/base.js");


class WorkerMessenger extends _base__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
    this.listen();
  }

  _postMessage(type, channel, data) {
    self.postMessage({
      type,
      channel,
      data
    });
  }

  _onmessage(fn) {
    self.onmessage = function (evt) {
      fn.call(evt, evt.data);
    };
  }

}

/* harmony default export */ __webpack_exports__["default"] = (WorkerMessenger);

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
/*! exports provided: isString, isObject, isBoolean, isArray, isFunction, noop, toString, isPlainObject, camelize, no, cached, extend, toObject, makeMap, isBuiltInTag, warn, tip, isUnaryTag, canBeLeftOpenTag, isNonPhrasingTag, genStaticKeys, isDef, def, hyphenate, emptyObject, proxy, looseEqual, looseIndexOf */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isString", function() { return isString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObject", function() { return isObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isBoolean", function() { return isBoolean; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArray", function() { return isArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFunction", function() { return isFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noop", function() { return noop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toString", function() { return toString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPlainObject", function() { return isPlainObject; });
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "def", function() { return def; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hyphenate", function() { return hyphenate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emptyObject", function() { return emptyObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "proxy", function() { return proxy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "looseEqual", function() { return looseEqual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "looseIndexOf", function() { return looseIndexOf; });
const _toString = Object.prototype.toString;
const isString = s => _toString.call(s) === '[object String]';
const isObject = o => _toString.call(o) === '[object Object]';
const isBoolean = b => _toString.call(b) === '[object Boolean]';
const isArray = a => _toString.call(a) === '[object Array]';
const isFunction = f => _toString.call(f) === '[object Function]';
function noop() {}
/**
 * Convert a value to a string that is actually rendered.
 */

function toString(val) {
  return val == null ? '' : Array.isArray(val) || isPlainObject(val) && val.toString === _toString ? JSON.stringify(val, null, 2) : String(val);
}
/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}
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
/**
 * Define a property.
 */

function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}
/**
 * Hyphenate a camelCase string.
 */

const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cached(str => {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
});
const emptyObject = Object.freeze({});
const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};
function proxy(target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key];
  };

  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val;
  };

  Object.defineProperty(target, key, sharedPropertyDefinition);
}
/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */

function looseEqual(a, b) {
  if (a === b) return true;
  const isObjectA = isObject(a);
  const isObjectB = isObject(b);

  if (isObjectA && isObjectB) {
    try {
      const isArrayA = Array.isArray(a);
      const isArrayB = Array.isArray(b);

      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every((e, i) => {
          return looseEqual(e, b[i]);
        });
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
      } else if (!isArrayA && !isArrayB) {
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(key => {
          return looseEqual(a[key], b[key]);
        });
      } else {
        /* istanbul ignore next */
        return false;
      }
    } catch (e) {
      /* istanbul ignore next */
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}
/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */

function looseIndexOf(arr, val) {
  for (let i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) return i;
  }

  return -1;
}

/***/ })

/******/ })["default"];
//# sourceMappingURL=Lone.logic.js.map