/**
 * Factor function to create function that checks if a number is between a set range inclusively.
 * @param min Min number
 * @param max Max number
 * @returns boolean
 */
export function isBetweenNumber(min: number, max: number) {
  return function (value: number) {
    return value >= min && value <= max;
  };
}
