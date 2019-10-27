/**
 * Check if the value is a valid RegExp.
 *
 * @param {*} value
 * @returns {boolean}
 */
function isValidRegExp(value) {
  return value instanceof RegExp;
}

/**
 * Check if the value is a function.
 *
 * @param {*} value
 * @returns {boolean}
 */
function isFunction(value) {
  return typeof value === 'function';
}

/**
 * Validate plugin options.
 *
 * @param {*} options
 * @returns {boolean}
 */
export function validateOptions(options) {
  const { pattern, process } = options;

  return isValidRegExp(pattern) && isFunction(process);
}

/**
 * Loop through each key of an object.
 *
 * @param {*} object
 * @param {Function} callback
 */
export function forEach(object, callback) {
  for (const key in object) {
    if (!Object.prototype.hasOwnProperty.call(object, key)) {
      continue;
    }

    callback(object[key], key);
  }
}
