export function createUnsecuredJwt(uid: string) {
  const header = {
    alg: 'none',
    kid: 'fakekid',
    typ: 'JWT',
  };
  const auth = {
    aud: process.env.FIREBASE_PROJECT_ID,
    uid,
  };
  const signature = '';

  return [
    Buffer.from(JSON.stringify(header)).toString('base64'),
    Buffer.from(JSON.stringify(auth)).toString('base64'),
    signature,
  ].join('.');
}
