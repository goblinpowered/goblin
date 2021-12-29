import { ident } from 'pg-format';

export function pgIdent(strings: TemplateStringsArray, ...values: string[]) {
  return strings
    .map((str, i) => `${str}${values[i] ? ident(values[i]) : ''}`)
    .join('');
}
