export function pad2(number: number): string {
  return (number < 10 ? '0' : '') + number;
}
