export interface IKeyWhitelist<T> {
  include: Array<keyof T>
}

export interface IKeyBlacklist<T> {
  exclude: Array<keyof T>
}

export function measureTextWidth(
  text: string,
  className = '',
  containerElement = document.body
) {
  if (containerElement == null) {
    return 0
  }
  const span = document.createElement('span')
  span.classList.add(className)
  span.textContent = text

  containerElement.appendChild(span)
  const spanWidth = span.offsetWidth
  span.remove()

  return spanWidth
}

export function padWithZeroes(str: string, minLength: number) {
  if (str.length < minLength) {
    return `${stringRepeat('0', minLength - str.length)}${str}`
  } else {
    return str
  }
}

function stringRepeat(str: string, numTimes: number) {
  return new Array(numTimes + 1).join(str)
}

export function isFunction(value: any): value is Function {
  return typeof value === 'function'
}

export function safeInvoke(func: Function | undefined, ...args: any[]) {
  if (isFunction(func)) {
    return func(...args)
  }
  return undefined
}

/**
 * Shallow comparison between objects. If `keys` is provided, just that subset
 * of keys will be compared; otherwise, all keys will be compared.
 */
export function shallowCompareKeys<T extends object>(
  objA: T,
  objB: T,
  keys?: IKeyBlacklist<T> | IKeyWhitelist<T>
) {
  // treat `null` and `undefined` as the same
  if (objA == null && objB == null) {
    return true
  } else if (objA == null || objB == null) {
    return false
  } else if (Array.isArray(objA) || Array.isArray(objB)) {
    return false
  } else if (keys != null) {
    return _shallowCompareKeys(objA, objB, keys)
  } else {
    // shallowly compare all keys from both objects
    const keysA = Object.keys(objA) as Array<keyof T>
    const keysB = Object.keys(objB) as Array<keyof T>
    return (
      _shallowCompareKeys(objA, objB, { include: keysA }) &&
      _shallowCompareKeys(objA, objB, { include: keysB })
    )
  }
}

// Private helpers
// ===============
function _arrayToObject(arr: any[]) {
  return arr.reduce((obj: any, element: any) => {
    obj[element] = true
    return obj
  }, {})
}

/**
 * Partial shallow comparison between objects using the given list of keys.
 */
function _shallowCompareKeys<T>(
  objA: any,
  objB: any,
  keys: IKeyBlacklist<T> | IKeyWhitelist<T>
) {
  return _filterKeys(objA, objB, keys).every(key => {
    return (
      objA.hasOwnProperty(key) === objB.hasOwnProperty(key) &&
      objA[key] === objB[key]
    )
  })
}

function _filterKeys<T>(
  objA: T,
  objB: T,
  keys: IKeyBlacklist<T> | IKeyWhitelist<T>
) {
  if (_isWhitelist(keys)) {
    return keys.include
  } else {
    const keysA = Object.keys(objA)
    const keysB = Object.keys(objB)

    // merge keys from both objects into a big set for quick access
    const keySet = _arrayToObject(keysA.concat(keysB))

    // delete blacklisted keys from the key set
    //@ts-ignore
    keys.exclude.forEach(key => delete keySet[key])

    // return the remaining keys as an array
    return Object.keys(keySet) as Array<keyof T>
  }
}

function _isWhitelist<T>(keys: any): keys is IKeyWhitelist<T> {
  return keys != null && (keys as IKeyWhitelist<T>).include != null
}

/**
 * Safely invoke the member function with no arguments, if the object
 * exists and the given key is indeed a function, and return its value.
 * Otherwise, return `undefined`.
 */
export function safeInvokeMember<
  T extends { [k in K]?: () => R },
  K extends keyof T,
  R = void
>(obj: T | undefined, key: K): R | undefined
/**
 * Safely invoke the member function with one argument, if the object
 * exists and the given key is indeed a function, and return its value.
 * Otherwise, return `undefined`.
 *
 * ```js
 * // example usage
 * safeInvokeMember(this.props.inputProps, "onChange", evt);
 * ```
 */
export function safeInvokeMember<
  T extends { [k in K]?: (a: A) => R },
  K extends keyof T,
  A,
  R = void
>(obj: T | undefined, key: K, arg1: A): R | undefined
/**
 * Safely invoke the member function with two arguments, if the object
 * exists and the given key is indeed a function, and return its value.
 * Otherwise, return `undefined`.
 */
export function safeInvokeMember<
  T extends { [k in K]?: (a: A, b: B) => R },
  K extends keyof T,
  A,
  B,
  R = void
>(obj: T | undefined, key: K, arg1: A, arg2: B): R | undefined
/**
 * Safely invoke the member function with three arguments, if the object
 * exists and the given key is indeed a function, and return its value.
 * Otherwise, return undefined.
 */
export function safeInvokeMember<
  T extends { [k in K]?: (a: A, b: B, c: C) => R },
  K extends keyof T,
  A,
  B,
  C,
  R = void
>(obj: T | undefined, key: K, arg1: A, arg2: B, arg3: C): R | undefined
// tslint:disable-next-line:ban-types
export function safeInvokeMember<
  T extends { [P in K]?: Function },
  K extends keyof T
>(obj: T | null | undefined, key: K, ...args: any[]) {
  if (obj != null) {
    const member = obj[key]
    if (isFunction(member)) {
      return member(...args)
    }
  }
  return undefined
}
