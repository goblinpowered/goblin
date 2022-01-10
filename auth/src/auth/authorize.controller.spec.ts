import { Test, TestingModule } from '@nestjs/testing';
import { AuthorizeRequest } from '../proto/authservice';
import { AuthorizeController } from './authorize.controller';
import * as admin from 'firebase-admin';
import { initializeApp } from 'firebase/app';
import {
  connectAuthEmulator,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { Pool } from 'pg';
import {
  createGroup,
  createUser,
  createProfile,
  authenticate,
  grant,
} from '../testing/postgres';
import { AuthModule } from './auth.module';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const clientApp = initializeApp(firebaseConfig);

const auth = getAuth(clientApp);
connectAuthEmulator(auth, process.env.FIREBASE_AUTH_EMULATOR_HOST, {
  disableWarnings: true,
});

describe('AuthorizeController', () => {
  let controller: AuthorizeController;
  let pool: Pool;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    controller = module.get<AuthorizeController>(AuthorizeController);
    pool = module.get<Pool>('POSTGRES');
  });

  afterEach(async () => {
    await pool?.end();
  });

  test('it authenticates tokens', async () => {
    const resource = await createGroup('resource', pool);
    const actor = await createProfile('actor', pool);
    const user = await createUser('user', pool);
    const userInfo = await admin.auth().createUser({
      displayName: 'user',
      emailVerified: true,
      password: 'password',
      email: `${user}@example.com`,
    });

    const credential = await signInWithEmailAndPassword(
      auth,
      `${user}@example.com`,
      'password',
    );

    const decodedToken = await credential.user.getIdTokenResult();

    await authenticate({ user, token: userInfo.uid }, pool);
    await grant({ resource, actor, role: 'potato' }, pool);
    await grant({ resource: actor, actor: user, role: 'actor' }, pool);
    const result = await controller.authorize(
      AuthorizeRequest.fromPartial({
        resource,
        actor,
        role: 'potato',
      }),
    );
    expect(result.authorized).toEqual(true);
  });
});
