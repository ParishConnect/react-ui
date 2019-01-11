/**
 * Helper function for theming.
 */
const themedProperty = (object: object, keyOrValue: any): any => {
  // Check if there is a preset in the collection for the property.
  if (Object.prototype.hasOwnProperty.call(object, keyOrValue)) {
    return object[keyOrValue]
  }

  // If there is no preset, simply return the property as is.
  return keyOrValue
}

export default themedProperty
