import { NextRequest, NextResponse } from "next/server";
import { initializeFirebaseApp } from '@/lib/firebase';
import { db } from "@/lib/firebase";

export function POST(request: NextRequest): NextResponse {
  initializeFirebaseApp();
  const COLLECTION_NAME = 'users';

  const docRef = db.collection(COLLECTION_NAME).doc();
  const insertData = {
    id: '1',
    name: 'あいうえお',
  };
  docRef.set(insertData);
  return NextResponse.json({ message: 'success' });
  }
