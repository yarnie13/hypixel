'use strict';

function parsePath(text) {
  return text.split('.')
}

function push(arr, el) {
  const newArr = arr.slice();
  newArr.push(el);
  return newArr;
}

// names of the traps that can be registered with ES6's Proxy object
const trapNames = [
  'apply',
  'construct',
  'defineProperty',
  'deleteProperty',
  'enumerate',
  'get',
  'getOwnPropertyDescriptor',
  'getPrototypeOf',
  'has',
  'isExtensible',
  'ownKeys',
  'preventExtensions',
  'set',
  'setPrototypeOf',
];

// a list of parameter indexes that indicate that the a receives a key at that parameter
// this information will be used to update the path accordingly
const keys = {
  get: 1,
  set: 1,
  deleteProperty: 1,
  has: 1,
  defineProperty: 1,
  getOwnPropertyDescriptor: 1,
}

export default class DeepProxy {
  constructor(rootTarget, traps, options) {
    let path = [];

    if (options !== undefined && typeof options.path === 'string') {
      path = parsePath(options.path)
    }

    function createProxy(target, path) {
      // avoid creating a new object between two traps
      const context = { rootTarget, path };

      const realTraps = {};

      for (const trapName of trapNames) {
        const keyParamIdx = keys[trapName];
        const trap = traps[trapName];

        if (typeof trap !== 'undefined') {
          if (typeof keyParamIdx !== 'undefined') {
            realTraps[trapName] = function() {
              const key = arguments[keyParamIdx];

              // update context for this trap
              context.nest = function (nestedTarget) {
                if (nestedTarget === undefined)
                  nestedTarget = rootTarget;
                return createProxy(nestedTarget, push(path, key));
              }

              return trap.apply(context, arguments);
            }
          } else {
            realTraps[trapName] = function() {
              // update context for this trap
              context.nest = function (nestedTarget) {
                if (nestedTarget === undefined)
                  nestedTarget = {};
                return createProxy(nestedTarget, path);
              }

              return trap.apply(context, arguments);
            }
          }
        }
      }

      return new Proxy(target, realTraps);
    }

    return createProxy(rootTarget, path);
  }
}
