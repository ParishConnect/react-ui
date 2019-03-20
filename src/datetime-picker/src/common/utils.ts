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
