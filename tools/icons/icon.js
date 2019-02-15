const DEFAULT_ATTRS = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': 2,
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round'
}

class Icon {
  constructor(name, contents, tags = []) {
    this.name = name
    this.contents = contents
    this.tags = tags
    this.attrs = {
      ...DEFAULT_ATTRS,
      ...{ class: `feather feather-${name}` }
    }
  }

  /**
   * Create an SVG string.
   * @param {Object} attrs
   * @returns {string}
   */
  toSvg(attrs = {}) {
    const combinedAttrs = {
      ...this.attrs,
      ...attrs,
      ...{ class: classnames(this.attrs.class, attrs.class) }
    }

    return `<svg ${attrsToString(combinedAttrs)}>${this.contents}</svg>`
  }

  /**
   * Return string representation of an `Icon`.
   *
   * Added for backward compatibility. If old code expects `feather.icons.<name>`
   * to be a string, `toString()` will get implicitly called.
   *
   * @returns {string}
   */
  toString() {
    return this.contents
  }
}

/**
 * Convert attributes object to string of HTML attributes.
 * @param {Object} attrs
 * @returns {string}
 */
function attrsToString(attrs) {
  return Object.keys(attrs)
    .map(key => `${key}="${attrs[key]}"`)
    .join(' ')
}

module.exports = Icon
