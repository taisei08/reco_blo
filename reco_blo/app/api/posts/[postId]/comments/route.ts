import { NextResponse } from "next/server";
import { collection, query, orderBy, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET({ params }: { params: { postId: number } }): Promise<NextResponse> {
  const { postId } = params;

  if (!postId) {
    return NextResponse.json({ error: 'Missing postId parameter' }, { status: 400 });
  }

  const COLLECTION_NAME = 'comments';

  const commentsCollection = collection(db, COLLECTION_NAME);
  const commentsQuery = query(commentsCollection, where('post_id', '==', postId), orderBy('created_at', 'desc'));

  try {
    const querySnapshot = await getDocs(commentsQuery);
    const data = [];

    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error getting documents' }, { status: 500 });
  }
}
