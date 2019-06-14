export function pluralize(wordVariants: [string, string], amount: number): string {
  return amount > 1 ? wordVariants[1] : wordVariants[0];
}
