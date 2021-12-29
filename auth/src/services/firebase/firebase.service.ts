import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  app: any;

  constructor() {
    admin.initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID,
    });
  }

  async verifyToken(token: string): Promise<string> {
    const result = await admin.auth().verifyIdToken(token);
    return result.uid;
  }
}
