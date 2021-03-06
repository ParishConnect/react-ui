/**
 * Helper function to conform to 4 (px) minor scale.
 * @example
 * minorScale(3) => 3*4 = 12
 * minorScale(1) => 1*4 = 4
 */
export default function minorScale(x: number): number {
  if (!Number.isInteger(x)) {
    throw new TypeError(
      `minorScale only accepts integers as input, instead ${x} was passed.`
    )
  }
  return x * 4
}
