// import { useState } from "react";
// import Comment from "./Comment";

// const Post = ({ post }) => {
//   const [comments, setComments] = useState(post.comments);
//   const [newComment, setNewComment] = useState("");

//   const handleAddComment = () => {
//     if (newComment.trim() === "") return;

//     const updatedComments = [
//       ...comments,
//       { id: comments.length + 1, text: newComment },
//     ];
//     setComments(updatedComments);
//     setNewComment("");
//   };

//   return (
//     <div>
//       <h2>{post.title}</h2>
//       <p>{post.content}</p>
//       <div>
//         <h3>Comments</h3>
//         {comments.map((comment) => (
//           <Comment key={comment.id} comment={comment} />
//         ))}
//       </div>
//       <div>
//         <input
//           type="text"
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//         />
//         <button onClick={handleAddComment}>Add Comment</button>
//       </div>
//     </div>
//   );
// };

// export default Post;
