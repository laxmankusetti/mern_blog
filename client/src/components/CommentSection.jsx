import { Button, Textarea } from "flowbite-react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Alert } from "flowbite-react";
import Comment from "./Comment.jsx";

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [commentError, setCommentError] = useState(null);

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        if(res.ok){
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error)
      }
    }

    getComments();
  }, [postId])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(comment.length > 200){
        return
      }
      if(!comment.length){
        setCommentError('Please enter some text as comment')
      }
      const res = await fetch('/api/comment/create', {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
          content : comment,
          postId,
          userId : currentUser._id
        })
      })
      const data = await res.json();
      if(res.ok){
        setComment('')
        setCommentError(null)
        setComments([data, ...comments])
      }
    } catch (error) {
      setCommentError(error.message)

    }
  }
  return (
    <div className="max-w-2xl w-full mx-auto p-3">
      {currentUser ? (
        <div className="flex gap-1 items-center text-sm text-gray-500">
          <p>Signed In as</p>
          <img
            src={currentUser.profilePicture}
            alt="profile"
            className="h-5 w-5 rounded-full"
          />
          <Link
            to={"/dashboard?tab=profile"}
            className="text-cyan-500 hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-gray-500 text-sm my-5 font-semibold flex gap-2 items-center">
          <p>You must be signed In to comments</p>
          <Link to={"/sign-in"} className="text-teal-500 hover:underline">
            Sign In
          </Link>
        </div>
      )}

      {currentUser && (
        <form className="border-teal-500 border p-3 rounded-md my-5" onSubmit={handleSubmit}>
          <Textarea
            placeholder="Add a comment..."
            maxLength="200"
            onChange={(e) => {
              return setComment(e.target.value);
            }}
            value={comment}
          />
          <div className="flex items-center justify-between my-3">
            <p className="text-teal-500 text-xs">
              {200 - comment.length} characters remaining
            </p>
            <Button gradientDuoTone="purpleToPink" outline type="submit">
              Submit
            </Button>
          </div>
          {commentError && <Alert color='failure'>{commentError}</Alert>}
        </form>
      )}

      {comments.length === 0 ?
       (<p className="font-semibold">No comments yet!!!</p>)
        : 
        (<div className="text-sm my-5 flex items-center gap-2">
          <p className="font-semibold">Comments</p>
          <div className="px-2 py-1 border-gray-400 border rounded-sm">
            <p className="font-bold">{comments.length}</p>
          </div>
        </div>)
      }

      {comments.map(comment => <Comment key={comment._id} comment={comment} />)}
    </div>
  );
}

CommentSection.propTypes = {
  postId: PropTypes.string,
};
