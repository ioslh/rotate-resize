module.exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "6eRV");
/******/ })
/************************************************************************/
/******/ ({

/***/ "0mLT":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("cs79");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "0tct":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("C8v2");
var hide = __webpack_require__("kU7D");
var has = __webpack_require__("3AVE");
var SRC = __webpack_require__("KPDc")('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("jfzh").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "10kN":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__("gLxf");

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),

/***/ "3AVE":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "3SwI":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("C8v2");
var core = __webpack_require__("jfzh");
var hide = __webpack_require__("kU7D");
var redefine = __webpack_require__("0tct");
var ctx = __webpack_require__("0mLT");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "4jNh":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "6eRV":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: /Users/lianghua.sun/.nvm/versions/node/v8.11.3/lib/node_modules/@vue/cli-service-global/node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
var setPublicPath = __webpack_require__("MtwF");

// CONCATENATED MODULE: /Users/lianghua.sun/.nvm/versions/node/v8.11.3/lib/node_modules/@vue/cli-service-global/node_modules/@babel/runtime/helpers/builtin/es6/defineProperty.js
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
// CONCATENATED MODULE: /Users/lianghua.sun/.nvm/versions/node/v8.11.3/lib/node_modules/@vue/cli-service-global/node_modules/@babel/runtime/helpers/builtin/es6/objectSpread.js

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}
// EXTERNAL MODULE: /Users/lianghua.sun/.nvm/versions/node/v8.11.3/lib/node_modules/@vue/cli-service-global/node_modules/core-js/modules/es6.array.map.js
var es6_array_map = __webpack_require__("s3tp");

// CONCATENATED MODULE: /Users/lianghua.sun/.nvm/versions/node/v8.11.3/lib/node_modules/@vue/cli-service-global/node_modules/@babel/runtime/helpers/builtin/es6/arrayWithHoles.js
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
// CONCATENATED MODULE: /Users/lianghua.sun/.nvm/versions/node/v8.11.3/lib/node_modules/@vue/cli-service-global/node_modules/@babel/runtime/helpers/builtin/es6/iterableToArrayLimit.js
function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}
// CONCATENATED MODULE: /Users/lianghua.sun/.nvm/versions/node/v8.11.3/lib/node_modules/@vue/cli-service-global/node_modules/@babel/runtime/helpers/builtin/es6/nonIterableRest.js
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}
// CONCATENATED MODULE: /Users/lianghua.sun/.nvm/versions/node/v8.11.3/lib/node_modules/@vue/cli-service-global/node_modules/@babel/runtime/helpers/builtin/es6/slicedToArray.js



function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}
// CONCATENATED MODULE: ./src/index.js



var PRECISION = 1e-5;

var roughlyEqual = function roughlyEqual(x, y) {
  var precision = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : PRECISION;
  return Math.abs(x - y) < precision;
};
/*
 * 原始矩形，倾斜角度为 0 deg
 * A----------------------B
 * |                      |
 * |                      |
 * |                      |
 * |                      |
 * |                      |
 * C----------------------D
 * 
 */

/**
 * 传入两点坐标，以及(线段 AC 的)倾斜角度
 * 返回唯一确定的矩形的位置
 * @param {Object} pa
 * @param {Object} pb
 * @param {Number} angel
 */


var computeRectWithCrossPoints = function computeRectWithCrossPoints(pa, pb, angle) {
  var center = centerPoint(pa, pb);
  var rotatedPosition = rotatePositionRelatively(pb, center, -angle);
  var x = rotatedPosition.x,
      y = rotatedPosition.y;
  var width = Math.abs((x - center.x) * 2);
  var height = Math.abs((y - center.y) * 2);
  return {
    x: center.x - width / 2,
    y: center.y - height / 2,
    w: width,
    h: height,
    r: angle
  };
};
/**
 * 根据一条线段（由 pinnedPoints 两点确定），拖拽点坐标（dragPoint），以及倾斜角度（angle）返回一个确定的矩形
 * @param {Object[]} pinnedPoints
 * @param {Object} dragPoint
 * @param {Number} angle
 */

var src_computeRectWithPinnedLine = function computeRectWithPinnedLine(pinnedPoints, dragPoint, angle) {
  var _pinnedPoints$map = pinnedPoints.map(function (p) {
    return rotatePosition(p, -angle);
  }),
      _pinnedPoints$map2 = _slicedToArray(_pinnedPoints$map, 2),
      rotateP0 = _pinnedPoints$map2[0],
      rotateP1 = _pinnedPoints$map2[1];

  var rotateDrag = rotatePosition(dragPoint, -angle);
  var w, h, rotatedCenter;

  if (roughlyEqual(rotateP0.y, rotateP1.y)) {
    w = Math.abs(rotateP0.x - rotateP1.x);
    h = Math.abs(rotateDrag.y - rotateP0.y);
    rotatedCenter = {
      x: (rotateP0.x + rotateP1.x) / 2,
      y: (rotateP0.y + rotateDrag.y) / 2
    };
  } else if (roughlyEqual(rotateP0.x, rotateP1.x)) {
    h = Math.abs(rotateP0.y - rotateP1.y);
    w = Math.abs(rotateDrag.x - rotateP0.x);
    rotatedCenter = {
      x: (rotateP0.x + rotateDrag.x) / 2,
      y: (rotateP0.y + rotateP1.y) / 2
    };
  }

  var center = rotatePosition(rotatedCenter, angle);
  var x = center.x - w / 2;
  var y = center.y - h / 2;
  return {
    x: x,
    y: y,
    w: w,
    h: h,
    r: angle
  };
};
/**
 * 根据一条边（pinnedPoints 两点确定），和对应的拖拽点（dragPoint），生成一个宽高比固定的矩形
 * @param {Object[]} pinnedPoints 拖拽固定边
 * @param {Object} dragPoint 拖拽点
 * @param {Number} rectRatio 原始矩形的宽高比
 * @param {String} activeExpand 拖拽的属性（width / height）
 */

var src_computeRatioedRectWithPinnedLine = function computeRatioedRectWithPinnedLine(pinnedPoints, dragPoint, rectStart, activeExpand) {
  var _pinnedPoints = _slicedToArray(pinnedPoints, 2),
      p0 = _pinnedPoints[0],
      p1 = _pinnedPoints[1];

  var middle1 = centerPoint(p0, p1);
  var middle2 = dragPoint;
  var center = centerPoint(middle1, middle2);
  var distance = pointsDistance(middle1, middle2);
  var rectRatio = rectStart.w / rectStart.h;
  var width, height;

  if (activeExpand === 'width') {
    width = distance;
    height = width / rectRatio;
  } else {
    height = distance;
    width = rectRatio * height;
  }

  return {
    x: center.x - width / 2,
    y: center.y - height / 2,
    w: width,
    h: height,
    r: rectStart.r
  };
};
/**
 * 传入两个点 p0， p1，返回两点连线的倾斜角度
 * 垂直状态是 0，遵循 DOM 的 rotation 规则，值域范围 [-90, 90]
 * @param {Object} p0
 * @param {Object} p1
 */

var lineDegrees = function lineDegrees(p0, p1) {
  if (roughlyEqual(p0.x, p1.x)) {
    return 0;
  }

  var slope = lineSlope(p0, p1);
  var degrees = Math.atan(slope) / Math.PI * 180;
  return 90 + degrees;
};
/**
 * 根据两点坐标，计算距离
 * @param {Object} p0
 * @param {Object} p1
 */

var pointsDistance = function pointsDistance(p0, p1) {
  var x = p0.x - p1.x;
  var y = p0.y - p1.y;
  return Math.sqrt(x * x + y * y);
};
/**
 * 页面坐标点 position 以页面左上角为原点，顺时针旋转 angle 角度后得到的坐标点
 * @param {Object} position
 * @param {Number} angle
 */

var rotatePosition = function rotatePosition(position, angle) {
  var radical = angle / 180 * Math.PI;
  var sinA = Math.sin(radical);
  var cosA = Math.cos(radical);
  var x = position.x,
      y = position.y;
  return {
    x: x * cosA - y * sinA,
    y: x * sinA + y * cosA
  };
};
/**
 * 页面坐标点 position 以 relative 点为原点
 * 顺时针旋转 angle 角度后得到的坐标点
 * @param {Object} position
 * @param {Object} relative
 * @param {Number} angle
 */

var rotatePositionRelatively = function rotatePositionRelatively(position, relative, angle) {
  var shiftPosition = {
    x: position.x - relative.x,
    y: position.y - relative.y
  };
  var resultPosition = rotatePosition(shiftPosition, angle);
  return {
    x: resultPosition.x + relative.x,
    y: resultPosition.y + relative.y
  };
};
/**
 * 计算一个矩形的中心点坐标
 * @param {*} rect
 */

var rectCenter = function rectCenter(rect) {
  var x = rect.x,
      y = rect.y,
      w = rect.w,
      h = rect.h;
  return {
    x: x + w / 2,
    y: y + h / 2
  };
};
/**
 * 计算向量 point 的角度
 * @param {Object} point
 */

var angleDegrees = function angleDegrees(point) {
  var x = point.x,
      y = point.y;
  return Math.atan2(y, x) * 180 / Math.PI;
};
/**
 * 根据两点坐标，计算其连线的斜率。注意，垂直时斜率是 Infinity
 * @param {Object} p0
 * @param {Object} p1
 */

var lineSlope = function lineSlope(p0, p1) {
  return (p1.y - p0.y) / (p1.x - p0.x);
};
/**
 * @param {Object} pa
 * @param {Object} pb
 * 获取坐标 pa 和 pb 的中间点坐标
 */

var centerPoint = function centerPoint(pa, pb) {
  return {
    x: (pa.x + pb.x) / 2,
    y: (pa.y + pb.y) / 2
  };
};
/**
 * 计算鼠标从 start 点拖到到 end 点时的旋转角度
 * @param {Object[]} pinnedPoints
 * @param {Object} start
 * @param {Object} end
 */

var computeRotation = function computeRotation(center, start, end) {
  var shiftStart = {
    x: start.x - center.x,
    y: start.y - center.y
  };
  var shiftEnd = {
    x: end.x - center.x,
    y: end.y - center.y
  };
  var startDegrees = angleDegrees(shiftStart);
  var endDegrees = angleDegrees(shiftEnd);
  return endDegrees - startDegrees;
};
/**
 * 计算一条直线上（由 points 两点确定）离 point 点最近的点，即垂直交叉点
 * @param {Object[]} points
 * @param {Object} point
 */

var src_squareCrossPoint = function squareCrossPoint(points, point) {
  var x = point.x,
      y = point.y;

  var _points = _slicedToArray(points, 2),
      p0 = _points[0],
      p1 = _points[1];

  if (roughlyEqual(p0.x, p1.x)) {
    return {
      x: p0.x,
      y: y
    };
  } else if (roughlyEqual(p0.y, p1.y)) {
    return {
      x: x,
      y: p0.y
    };
  }

  var baseSlope = lineSlope(p0, p1);
  var verticalSlope = -1 / baseSlope;
  var nextX, nextY;

  if (verticalSlope === 1) {
    nextX = (p0.y - y + p0.x + x) / 2;
    nextY = y - x + nextX;
  } else if (verticalSlope === -1) {
    nextX = (y - p0.y + x + p0.x) / 2;
    nextY = y - x + nextX;
  } else {
    nextX = (baseSlope * p0.x + y - p0.y - verticalSlope * x) / (baseSlope - verticalSlope);
    nextY = p0.y - baseSlope * (p0.x - nextX);
  }

  return {
    x: nextX,
    y: nextY
  };
};
/**
 * 计算矩形的八个关键端点以及中心点
 * @param {*} rect
 */

var src_computeEndPoints = function computeEndPoints(rect) {
  var center = rectCenter(rect);
  var x = rect.x,
      y = rect.y,
      w = rect.w,
      h = rect.h,
      r = rect.r;

  var _map = [{
    x: x,
    y: y
  }, {
    x: x + w,
    y: y
  }, {
    x: x + w,
    y: y + h
  }, {
    x: x,
    y: y + h
  }].map(function (point) {
    return rotatePositionRelatively(point, center, r);
  }),
      _map2 = _slicedToArray(_map, 4),
      p0 = _map2[0],
      p1 = _map2[1],
      p2 = _map2[2],
      p3 = _map2[3];

  return {
    center: center,
    lt: p0,
    // 右上
    rt: p1,
    // 右下
    rb: p2,
    // 左下
    lb: p3,
    ct: centerPoint(p0, p1),
    rm: centerPoint(p1, p2),
    cb: centerPoint(p2, p3),
    lm: centerPoint(p3, p0)
  };
};
/**
 * 移动矩形，返回移动的矩形数据
 * @param {*} mouseStart
 * @param {*} mouseEnd
 * @param {*} rectStart
 */

var src_moveRect = function moveRect(mouseStart, mouseEnd, rectStart) {
  var x = mouseEnd.x - mouseStart.x;
  var y = mouseEnd.y - mouseStart.y;
  return _objectSpread({}, rectStart, {
    x: rectStart.x + x,
    y: rectStart.y + y
  });
};
/**
 * 计算鼠标从 mouseStart 点开始按住旋转到 mouseEnd 后返回的矩形，值域为 [-180, 180]
 * @param {*} mouseStart
 * @param {*} mouseEnd
 * @param {*} rectStart
 */


var src_rotateRect = function rotateRect(mouseStart, mouseEnd, rectStart) {
  var center = rectCenter(rectStart); // const shrotcutRotations = [-180, -135, -90, -45, 0, 45, 90, 135, 180]

  var offsetRotation = computeRotation(center, mouseStart, mouseEnd);
  var nextRotation = rectStart.r + offsetRotation;

  if (nextRotation >= 180) {
    nextRotation = nextRotation - 360;
  }

  if (nextRotation <= -180) {
    nextRotation = nextRotation + 360;
  }

  return _objectSpread({}, rectStart, {
    r: nextRotation
  });
};
/**
 * resize 矩形，返回 resize 后的矩形数据
 * @param {*} mouseStart
 * @param {*} mouseEnd
 * @param {*} adjustType
 * @param {*} rectStart
 * @param {*} fixedRatio
 */


var resizeRect = function resizeRect(mouseStart, mouseEnd, adjustType, rectStart, fixedRatio) {
  var e = src_computeEndPoints(rectStart);
  var activeExpand = null;
  var acrossPoints = [];
  var fixedMouseEnd = mouseEnd;

  if (fixedRatio) {
    switch (adjustType) {
      case 'lt':
      case 'rb':
        acrossPoints = [e.lt, e.rb];
        break;

      case 'rt':
      case 'lb':
        acrossPoints = [e.rt, e.lb];
        break;

      case 'ct':
      case 'cb':
        acrossPoints = [e.ct, e.cb];
        activeExpand = 'height';
        break;

      case 'lm':
      case 'rm':
        acrossPoints = [e.lm, e.rm];
        activeExpand = 'width';
        break;

      default:
        acrossPoints = [];
    }

    if (acrossPoints.length === 2) {
      fixedMouseEnd = src_squareCrossPoint(acrossPoints, mouseEnd);
    }
  }

  var pinnedPoints = [];

  switch (adjustType) {
    case 'lt':
      pinnedPoints = [e.rb];
      break;

    case 'rt':
      pinnedPoints = [e.lb];
      break;

    case 'lb':
      pinnedPoints = [e.rt];
      break;

    case 'rb':
      pinnedPoints = [e.lt];
      break;

    case 'cb':
      pinnedPoints = [e.lt, e.rt];
      break;

    case 'ct':
      pinnedPoints = [e.lb, e.rb];
      break;

    case 'lm':
      pinnedPoints = [e.rt, e.rb];
      break;

    case 'rm':
      pinnedPoints = [e.lt, e.lb];
      break;

    default:
      pinnedPoints = [];
  }

  var _pinnedPoints2 = pinnedPoints,
      length = _pinnedPoints2.length;

  if (length === 1) {
    return computeRectWithCrossPoints(pinnedPoints[0], fixedMouseEnd, rectStart.r);
  } else if (length === 2) {
    if (fixedRatio) {
      return src_computeRatioedRectWithPinnedLine(pinnedPoints, fixedMouseEnd, rectStart, activeExpand);
    } else {
      return src_computeRectWithPinnedLine(pinnedPoints, fixedMouseEnd, rectStart.r);
    }
  }
};
/**
 * 计算入口
 * @param {Position} mouseStart
 * @param {Position} mouseEnd
 * @param {String} adjustType: 'rotate'|'move'|'lt'|'rt'|'ct'|'lb'|'rb'|'cb'|'lm'|'rm'
 * @param {Rect} rectStart
 * @param {Boolean} fixedRatio
 */


/* harmony default export */ var src = (function (adjustType, mouseStart, mouseEnd, rectStart, fixedRatio) {
  if (adjustType === 'move') {
    return src_moveRect(mouseStart, mouseEnd, rectStart);
  }

  if (adjustType === 'rotate') {
    return src_rotateRect(mouseStart, mouseEnd, rectStart);
  }

  return resizeRect(mouseStart, mouseEnd, adjustType, rectStart, fixedRatio);
});
// CONCATENATED MODULE: /Users/lianghua.sun/.nvm/versions/node/v8.11.3/lib/node_modules/@vue/cli-service-global/node_modules/@vue/cli-service/lib/commands/build/entry-lib.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "computeRectWithCrossPoints", function() { return computeRectWithCrossPoints; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "computeRectWithPinnedLine", function() { return src_computeRectWithPinnedLine; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "computeRatioedRectWithPinnedLine", function() { return src_computeRatioedRectWithPinnedLine; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "lineDegrees", function() { return lineDegrees; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "pointsDistance", function() { return pointsDistance; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "rotatePosition", function() { return rotatePosition; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "rotatePositionRelatively", function() { return rotatePositionRelatively; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "rectCenter", function() { return rectCenter; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "angleDegrees", function() { return angleDegrees; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "lineSlope", function() { return lineSlope; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "centerPoint", function() { return centerPoint; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "computeRotation", function() { return computeRotation; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "squareCrossPoint", function() { return src_squareCrossPoint; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "computeEndPoints", function() { return src_computeEndPoints; });


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (src);



/***/ }),

/***/ "C8v2":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "CROl":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("4jNh");
var isArray = __webpack_require__("E/oQ");
var SPECIES = __webpack_require__("Y2x3")('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),

/***/ "CVrU":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("4jNh");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "DJYq":
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__("0mLT");
var IObject = __webpack_require__("gOg0");
var toObject = __webpack_require__("iHQo");
var toLength = __webpack_require__("WQIP");
var asc = __webpack_require__("E7y/");
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),

/***/ "E/oQ":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__("NpsP");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "E7y/":
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__("CROl");

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),

/***/ "HGcR":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("Lo3T") && !__webpack_require__("gLxf")(function () {
  return Object.defineProperty(__webpack_require__("qqCU")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "JW1N":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("jfzh");
var global = __webpack_require__("C8v2");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("V0U5") ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "KPDc":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "Lo3T":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("gLxf")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "MtwF":
/***/ (function(module, exports, __webpack_require__) {

// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  let i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}


/***/ }),

/***/ "NpsP":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "TVLX":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("YZGq");
var IE8_DOM_DEFINE = __webpack_require__("HGcR");
var toPrimitive = __webpack_require__("CVrU");
var dP = Object.defineProperty;

exports.f = __webpack_require__("Lo3T") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "V0U5":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "WQIP":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("vhDg");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "XHnK":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "Y2x3":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("JW1N")('wks');
var uid = __webpack_require__("KPDc");
var Symbol = __webpack_require__("C8v2").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "YZGq":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("4jNh");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "avyW":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "cs79":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "gLxf":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "gOg0":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("NpsP");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "iHQo":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("XHnK");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "jfzh":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "kU7D":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("TVLX");
var createDesc = __webpack_require__("avyW");
module.exports = __webpack_require__("Lo3T") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "qqCU":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("4jNh");
var document = __webpack_require__("C8v2").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "s3tp":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__("3SwI");
var $map = __webpack_require__("DJYq")(1);

$export($export.P + $export.F * !__webpack_require__("10kN")([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});


/***/ }),

/***/ "vhDg":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ })

/******/ });
//# sourceMappingURL=rotateResize.common.js.map