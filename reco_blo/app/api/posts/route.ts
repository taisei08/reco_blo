import { NextRequest, NextResponse } from "next/server";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET(): Promise<NextResponse> {
  const COLLECTION_NAME = 'posts';

  const postsCollection = collection(db, COLLECTION_NAME);
  const postsQuery = query(postsCollection, orderBy('created_at', 'desc'));

  try {
    const querySnapshot = await getDocs(postsQuery);
    console.log(querySnapshot)
    const data = [];

    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Error getting documents' }, { status: 500 });
  }
}
