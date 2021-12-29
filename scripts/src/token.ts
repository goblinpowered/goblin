function createUnsecuredJwt(uid) {
  const header = {
    alg: "none",
    kid: "fakekid",
    typ: "JWT",
  };
  const auth = {
    aud: "framesystem-v2",
    uid,
  };
  const signature = "";

  return [
    btoa(JSON.stringify(header)),
    btoa(JSON.stringify(auth)),
    signature,
  ].join(".");
}

console.log(createUnsecuredJwt("qVHFI8G53CVTgE2yKkbuI6cM4IFH"));
