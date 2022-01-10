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
  createResource,
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

  test('it checks direct grants', async () => {
    const resource = await createGroup('resource', pool);
    const actor = await createProfile('actor', pool);
    await grant({ resource, actor, role: 'potato' }, pool);
    const result = await controller.authorize(
      AuthorizeRequest.fromPartial({
        resource,
        actor,
        role: 'potato',
      }),
    );
    expect(result.authorized).toEqual(true);
  });

  test('it checks indirect grants', async () => {
    const g1 = await createGroup('parent', pool);
    const g2 = await createGroup('child', pool);
    const resource = await createResource('resource', pool);
    const actor = await createProfile('actor', pool);
    await grant({ resource, actor: g1, role: 'potato' }, pool);
    await pool.query(
      'insert into memberships (parent, child) values ($1, $2)',
      [g1, g2],
    );
    await pool.query(
      'insert into memberships (parent, child) values ($1, $2)',
      [g2, actor],
    );
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
