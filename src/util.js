
function isValidRegExp(value) {
  return value instanceof RegExp;
}

function isFunction(value) {
  return (typeof value === 'function');
}

/**
 * Validate plugin options.
 */
export function validateOptions(options) {
  const { pattern, process } = options;

  return (
    isValidRegExp(pattern) && isFunction(process)
  );
}
