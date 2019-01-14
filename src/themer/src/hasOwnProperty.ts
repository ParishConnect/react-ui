export default (obj: object, prop: string) =>
  Object.prototype.hasOwnProperty.call(obj, prop)
