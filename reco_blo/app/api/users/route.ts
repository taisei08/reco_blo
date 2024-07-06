import { NextRequest, NextResponse } from "next/server";
const { cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const admin = require('firebase-admin');
const serviceAccount = require('../../../firebase-test-serviceAccount.json'); // 秘密鍵を取得

export function POST(request: NextRequest): NextResponse {
  const COLLECTION_NAME = 'users';
  //　初期化する
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: cert(serviceAccount),
    });
  }
  const db = getFirestore();

    const docRef = db.collection(COLLECTION_NAME).doc();
    const insertData = {
      id: '1',
      name: 'Symfo',
    };
    docRef.set(insertData);
    return NextResponse.json({ message: 'success' });
  }
