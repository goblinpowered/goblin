import { ident } from 'pg-format';
import { pgIdent } from './ident';

describe('pg ident tagger', () => {
  test('it tags middle strings', () => {
    expect(pgIdent`one ${'select'} ${'drop table'} four`).toEqual(
      `one ${ident('select')} ${ident('drop table')} four`,
    );
  });
  test('it tags front strings', () => {
    expect(pgIdent`${'select'} two ${'drop table'} four`).toEqual(
      `${ident('select')} two ${ident('drop table')} four`,
    );
  });
  test('it tags trailing strings', () => {
    expect(pgIdent`one ${'select'} ${'drop table'}`).toEqual(
      `one ${ident('select')} ${ident('drop table')}`,
    );
  });
});
