export function isFibonacci(n: number): boolean {
  const isPerfectSquare = (x: number) => Number.isInteger(Math.sqrt(x));
  const t = 5 * n * n;
  return isPerfectSquare(t - 4) || isPerfectSquare(t + 4);
}
