import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

@Injectable()
export class FirebaseService {
  app: any;

  constructor() {
    admin.initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID,
    });
  }

  async verifyToken(token: string): Promise<DecodedIdToken> {
    return await admin.auth().verifyIdToken(token);
  }
}
