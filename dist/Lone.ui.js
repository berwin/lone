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
        console.log('111', this.source);
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

/***/ "./packages/lone-ui/index.js":
/*!***********************************!*\
  !*** ./packages/lone-ui/index.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lone_messenger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lone-messenger */ "./packages/lone-messenger/index.js");

const slave = new lone_messenger__WEBPACK_IMPORTED_MODULE_0__["Slave"]({
  env: 'postMessage'
});
slave.onmessage('customType', function (data) {
  console.log('ui:', data);
});
setTimeout(function () {
  slave.send('customType', {
    name: 'Berwin'
  });
}, 1000);
/* harmony default export */ __webpack_exports__["default"] = (function () {
  console.log('ui');
});

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
//# sourceMappingURL=Lone.ui.js.map