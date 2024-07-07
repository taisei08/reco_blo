import { NextResponse } from "next/server";
import { collection, query, where, getCountFromServer } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET({ params }: { params: { commentId: number } }): Promise<NextResponse> {
  const { commentId } = params;

  if (!commentId) {
    return NextResponse.json({ error: 'Missing postId parameter' }, { status: 400 });
  }

  const COLLECTION_NAME = 'likes';

  const likesCollection = collection(db, COLLECTION_NAME);
  const likesQuery = query(likesCollection, where('comment_id', '==', commentId));

  try {
    const querySnapshot = await getCountFromServer(likesQuery);
    const likeCount = querySnapshot.data().count;

    return NextResponse.json({ likeCount });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error getting documents' }, { status: 500 });
  }
}
