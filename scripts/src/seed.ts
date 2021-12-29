import * as admin from 'firebase-admin';

const app = admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://framesystem-v2-default-rtdb.firebaseio.com',
  projectId: 'framesystem-v2',
});

const users: { claims: any; user: admin.auth.CreateRequest }[] = [
  {
    user: {
      displayName: 'Test GM',
      email: 'testgm@framesystem.org',
      emailVerified: true,
      password: 'password',
    },
    claims: {
      premium: true,
    },
  },
  {
    user: {
      displayName: 'Test Player',
      email: 'testplayer@framesystem.org',
      emailVerified: true,
      password: 'password',
    },
    claims: {
      premium: false,
    },
  },
];

Promise.all(
  users.map(({ user, claims }) =>
    app
      .auth()
      .createUser(user)
      .then((record) => app.auth().setCustomUserClaims(record.uid, claims))
  )
).then(() => process.exit());
