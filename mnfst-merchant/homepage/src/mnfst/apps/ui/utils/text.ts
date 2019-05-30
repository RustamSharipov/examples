import format from 'format-number';
import { localizeString } from 'apps/ui/utils/localization';

const CURRENCIES = {
  EUR: '€',
  USD: '$',
};

interface IGenderVariant {
  label: string;
  value: string;
}

export function toCamelCase(value: string) {
  return value.replace(/(\_\w)/g, str => str[1].toUpperCase());
}

export function formatNumber(value: number): string {
  const formatNumber = format();
  return formatNumber(value);
}

export function formatMoney(value: number, currencyCode: string): string {
  const formatNumber = format({
    prefix: `${CURRENCIES[currencyCode]} `,
    round: 2,
  });

  return formatNumber(value / 100);
}

export function validateHex(value: string) {
  return {
    isValid: /(^#[0-9A-F]{6}$)/i.test(value),
  };
}

export function getGenderVariant(genders?: string[]): IGenderVariant | null {
  if (!genders) {
    return null;
  }

  const gendersSample = genders.sort().join(',');
  let genderVariant: IGenderVariant | null = null;

  if (gendersSample === 'male') {
    genderVariant = {
      label: localizeString('Male'),
      value: 'male',
    };
  }
  if (gendersSample === 'female') {
    genderVariant = {
      label: localizeString('Female'),
      value: 'female',
    };
  }
  if (gendersSample === 'female,male') {
    genderVariant = {
      label: localizeString('Any'),
      value: 'any',
    };
  }

  return genderVariant;
}

export function capitalize(str: string): string {
  return `${str[0].toUpperCase()}${str.substring(1)}`;
}

export function parseFileExtension(src: string): string | null {
  const match: string[] | null = src.match(/\.([0-9a-z]+)(?=[?#])|(\.)(?:[\w]+)$/gmi);
  return match ? match[0].replace('.', '') : null;
}

// https://miguelmota.com/bytes/base64-mime-regex/
export function base64MimeType(base64String: string): string | null {
  const match: string[] | null = base64String.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
  return match && match.length ? match[1] : null;
}

export function parseMimeTypeFileExtension(mimeType: string): string | null {
  if (!mimeType) {
    return null;
  }

  return mimeType.split('/')[1] || null;
}

export function formatCreditCardNumber(cardNumber: string): string {
  const match: string[] | null = cardNumber.match(/.{1,4}/g);
  return match && `**** ${match[3]}` || '';
}
