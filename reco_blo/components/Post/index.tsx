// components/Post.js
import { FC, useState } from "react";
import { IoMdSend } from "react-icons/io";

type Props = {
  post: any;
};

export const Post: FC<Props> = ({ post }) => {
  const [comments, setComments] = useState(post.comments);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    const updatedComments = [
      ...comments,
      { id: comments.length + 1, text: newComment },
    ];
    setComments(updatedComments);
    setNewComment("");
  };

  return (
    <div>
      {/* <h2>{post.title}</h2>
      <p>{post.content}</p> */}
      <div>
        {/* <h3>Comments</h3> */}
        <div className="my-2 border-b border-gray-300">
          {comments.map((comment: any) => (
            <div key={comment.id} className="mt-1">
              <p className="py-1 border-t border-gray-300">{comment.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between gap-5">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="border border-gray-400 p-2 rounded-md block"
          placeholder="コメントを追加..."
        />
        <button
          onClick={handleAddComment}
          className="
          py-2
          px-4
          rounded-full
          text-white
          bg-gradient-to-r
          from-cyan-500
          to-blue-500 block
        "
        >
          <IoMdSend />
        </button>
      </div>
    </div>
  );
};
