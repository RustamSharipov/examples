export function pluralize(wordVariants: [string, string], amount: number): string {
  return amount > 1 ? wordVariants[1] : wordVariants[0];
}

// https://stackoverflow.com/a/2117523/9178954
export function uuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : ((r & 0x3) | 0x8);
    return v.toString(16);
  });
}

export function numberWithFlexia(number: number): string {
  const digits = String(number).split('').map(item => +item);
  const lastDigit = digits[digits.length - 1];

  if (lastDigit === 1 && number !== 11) {
    return `${number}st`;
  }

  if (lastDigit === 2 && number !== 12) {
    return `${number}nd`;
  }

  if (lastDigit === 3 && number !== 11) {
    return `${number}rd`;
  }

  return `${number}th`;
}
