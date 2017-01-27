
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
    const {pattern, process} = options;

    return (
        isValidRegExp(pattern) &&
        isFunction(process)
    );
}

/**
 * Loop through each key of an object.
 *
 * @param object
 * @param callback
 */
export function forEach(object, callback) {
    for (var key in object) {
        if (!object.hasOwnProperty(key)) {
            continue;
        }

        callback(object[key], key);
    }
}