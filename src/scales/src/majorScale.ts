/**
 * Helper function to conform to 8 (px) major scale.
 * @example
 * majorScale(2) => 2*8 = 16
 * majorScale(4) => 4*8 = 32
 */
export default function majorScale(x: number): number {
  if (!Number.isInteger(x)) {
    throw new TypeError(
      `majorScale only accepts integers as input, instead ${x} was passed.`
    )
  }
  return x * 8
}
