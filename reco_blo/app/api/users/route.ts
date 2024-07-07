import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";

export function GET(): NextResponse {
  const COLLECTION_NAME = 'posts';

  const docRef = db.collection(COLLECTION_NAME).orderBy('created_at', 'desc');
  console.log("aaa")
  docRef.get().then((querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    return NextResponse.json(data);
  });
}


export function POST(request: NextRequest): NextResponse {
  const COLLECTION_NAME = 'users';

  const docRef = db.collection(COLLECTION_NAME).doc();
  const insertData = {
    id: '1',
    name: 'あいうえお',
  };
  docRef.set(insertData);
  return NextResponse.json({ message: 'success' });
  }
