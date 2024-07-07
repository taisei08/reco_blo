import { NextResponse } from "next/server";
import { collection, query, where, getCountFromServer } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET({ params }: { params: { postId: number } }): Promise<NextResponse> {
  const { postId } = params;

  if (!postId) {
    return NextResponse.json({ error: 'Missing postId parameter' }, { status: 400 });
  }

  const COLLECTION_NAME = 'likes';

  const likesCollection = collection(db, COLLECTION_NAME);
  const likesQuery = query(likesCollection, where('post_id', '==', postId));

  try {
    const querySnapshot = await getCountFromServer(likesQuery);
    const likeCount = querySnapshot.data().count;

    return NextResponse.json({ likeCount });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error getting documents' }, { status: 500 });
  }
}
