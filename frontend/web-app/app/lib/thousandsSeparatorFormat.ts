export function thousandsSeparatorFormat(
  amount: number,
  separator: string = ","
): string {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}
