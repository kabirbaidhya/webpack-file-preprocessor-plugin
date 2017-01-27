let isArray = (v) => (Object.prototype.toString.call(v) === '[object Array]');
let isString = (v) => (typeof v === 'string');
let isFunction = (v) => (typeof v === 'function');

export {isArray, isString, isFunction};
