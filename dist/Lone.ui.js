(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ui"] = factory();
	else
		root["Lone"] = root["Lone"] || {}, root["Lone"]["ui"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./packages/lone-ui/index.js");
/******/ })
/************************************************************************/
/******/ ({

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
/* harmony import */ var _worker_messenger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./worker-messenger */ "./packages/lone-messenger/master/worker-messenger.js");




const connection = Symbol('messenger:master#connection');
class Master extends _base_messenger__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(options) {
    super();
    this.options = options;
    this.native = new _native_messenger__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this.post = new _post_messenger__WEBPACK_IMPORTED_MODULE_2__["default"]();
    this.worker = new _worker_messenger__WEBPACK_IMPORTED_MODULE_3__["default"]();
    this[connection]();
    this.listen();
  }

  [connection]() {
    if (this.options.env === 'native') this.native.connection();
    if (this.options.env === 'worker') this.worker.connection(this.options.worker);
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
    if (this.options.env === 'native') this.native.onmessage(fn);
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

/***/ "./packages/lone-ui/index.js":
/*!***********************************!*\
  !*** ./packages/lone-ui/index.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _schedule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schedule */ "./packages/lone-ui/schedule.js");
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./router */ "./packages/lone-ui/router.js");



class LoneUI {
  constructor(options) {
    this.options = options;
    this.router = new _router__WEBPACK_IMPORTED_MODULE_1__["default"]({
      routes: this.options.routes
    });
    this.schedule = new _schedule__WEBPACK_IMPORTED_MODULE_0__["default"]({
      router: this.router
    });
  }

}

/* harmony default export */ __webpack_exports__["default"] = (function (options) {
  return new LoneUI(options);
});

/***/ }),

/***/ "./packages/lone-ui/page.js":
/*!**********************************!*\
  !*** ./packages/lone-ui/page.js ***!
  \**********************************/
/*! exports provided: createPage, removePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPage", function() { return createPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removePage", function() { return removePage; });
let pid = 0;
function createPage(options) {
  const id = pid++;
  const view = document.createElement('iframe');
  setAttr(id, view, options);
  setStyle(view);
  document.body.appendChild(view);
  insertJS(view);
  return view;
}
function removePage(page) {
  document.body.removeChild(page);
}

function setAttr(id, view, attrs) {
  view.id = id;

  for (const [key, val] of Object.entries(attrs)) {
    view.setAttribute(key, val);
  }
}

function setStyle(view) {
  const doc = document.documentElement;
  view.style.width = doc.clientWidth + 'px';
  view.style.height = doc.clientHeight + 'px';
  view.style.position = 'fixed';
  view.style.border = 'none';
  view.style.zIndex = pid;
  view.style.backgroundColor = 'white';
}

function insertJS(view) {
  const scriptTag = [insertContainer, insertPageJS, insertUserJS].reduce((pre, gen) => pre + gen(), '');
  view.contentDocument.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
      </head>
      <body>${scriptTag}</body>
    </html>
  `);
}

function insertPageJS() {
  return '<script src="' + "../../dist/lone.page.js" + '"></script>'; // eslint-disable-line
}

function insertUserJS() {
  return '<script src="./app.page.js"></script>';
}

function insertContainer() {
  return '<div id="app"></div>';
}

/***/ }),

/***/ "./packages/lone-ui/router.js":
/*!************************************!*\
  !*** ./packages/lone-ui/router.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page */ "./packages/lone-ui/page.js");
/* harmony import */ var lone_util_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lone-util/url */ "./packages/lone-util/url.js");


const getRoute = Symbol('getRoute');

class Router {
  constructor(options) {
    this.stack = [];
    this.routes = options.routes;
  }

  [getRoute](url) {
    const {
      pathname
    } = Object(lone_util_url__WEBPACK_IMPORTED_MODULE_1__["parse"])(url);
    return this.routes.find(item => {
      return item.path === pathname;
    });
  }

  currentPage() {
    return this.stack[this.stack.length - 1] || null;
  }

  currentPages() {
    return this.stack;
  }

  _push(url) {
    const route = this[getRoute](url);
    const view = Object(_page__WEBPACK_IMPORTED_MODULE_0__["createPage"])(route);
    this.stack.push(view);
    return view;
  }

  _pop() {
    const oldView = this.stack.pop();
    Object(_page__WEBPACK_IMPORTED_MODULE_0__["removePage"])(oldView);
  }

  navigateTo(url) {
    this._push(url);
  }

  redirectTo(url) {
    this._pop();

    this._push(url);
  } // 如果 delta 大于现有页面数，则返回到首页。


  navigateBack(delta = 1) {
    const len = this.stack.length;
    if (delta >= len) delta = len - 1;

    while (delta--) {
      this._pop();
    }
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Router);

/***/ }),

/***/ "./packages/lone-ui/schedule.js":
/*!**************************************!*\
  !*** ./packages/lone-ui/schedule.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lone_messenger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lone-messenger */ "./packages/lone-messenger/index.js");

const master = new lone_messenger__WEBPACK_IMPORTED_MODULE_0__["Master"]({
  env: 'postMessage'
});

class Schedule {
  constructor({
    router
  }) {
    const vm = this;
    vm.router = router;
    vm.logicEvents = {
      'logic:inited': function () {
        // Default Route Page
        vm.router.navigateTo(vm.router.routes[0].path);
      },
      'logic:data': function (channel, {
        id,
        data
      }) {
        master.send('ui:data', channel, {
          id,
          data
        });
      },
      'logic:navigateTo': function (channel, {
        url
      }) {
        vm.router.navigateTo(url);
      },
      'logic:redirectTo': function (channel, {
        url
      }) {
        vm.router.redirectTo(url);
      },
      'logic:navigateBack': function (channel, {
        delta
      }) {
        vm.router.navigateBack(delta);
      }
    };
    vm.pageEvents = {
      'page:navigateTo': function () {
        console.log('ui-schedule: view:navigateTo');
      },
      'page:inited': function (channel, {
        name,
        id
      }) {
        master.send('ui:inited', channel, {
          name,
          id
        });
      },
      'page:ready': function (channel, {
        id
      }) {
        master.send('ui:ready', channel, {
          id
        });
      }
    };
    vm.init();
  }

  init() {
    this.listenEvents(master, this.logicEvents);
    this.listenEvents(master, this.pageEvents);
  }

  listenEvents(messenger, events) {
    for (const [event, fn] of Object.entries(events)) {
      messenger.onmessage(event, fn);
    }
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Schedule);

/***/ }),

/***/ "./packages/lone-util/index.js":
/*!*************************************!*\
  !*** ./packages/lone-util/index.js ***!
  \*************************************/
/*! exports provided: isString, isObject, isBoolean, isArray, isFunction, noop, toString, isPlainObject, camelize, no, cached, extend, toObject, makeMap, isBuiltInTag, warn, tip, isUnaryTag, canBeLeftOpenTag, isNonPhrasingTag, genStaticKeys, isDef, def, hyphenate, emptyObject, proxy */
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

/***/ }),

/***/ "./packages/lone-util/url.js":
/*!***********************************!*\
  !*** ./packages/lone-util/url.js ***!
  \***********************************/
/*! exports provided: parse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parse", function() { return parse; });
function parse(url) {
  const a = document.createElement('a');
  a.href = url;
  return {
    hash: a.hash,
    host: a.host,
    hostname: a.hostname,
    href: a.href,
    origin: a.origin,
    password: a.password,
    pathname: a.pathname,
    port: a.port,
    protocol: a.protocol,
    search: a.search,
    username: a.username
  };
}

/***/ })

/******/ })["default"];
});
//# sourceMappingURL=Lone.ui.js.map