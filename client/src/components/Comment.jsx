import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button, Textarea } from "flowbite-react";

export default function Comment({ comment, onLike, onEdit, onDelete }) {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [comment]);

  const handleEdit = async () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: editedContent }),
      });
      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center p-3 border-b border-gray-400 max-w-2xl w-full">
      <div className="flex-shrink-0">
        <img
          src={user.profilePicture}
          alt={user.profilePicture}
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
      <div className="px-3 w-full">
        <div className="flex items-center gap-3 flex-1">
          <span className="text-sm text-gray-500 font-bold truncate">
            {user ? `@${user.username}` : "Anonymous user"}
          </span>
          <span className="text-xs text-gray-500">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {isEditing ? (
          <div className="w-full">
            <Textarea
              className="my-3 w-full"
              value={editedContent}
              onChange={(e) => {
                setEditedContent(e.target.value);
              }}
            />
            <div className="flex justify-end items-center gap-5 text-sm">
              <Button
                type="button"
                gradientDuoTone="purpleToBlue"
                size="sm"
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                type="button"
                gradientDuoTone="purpleToBlue"
                outline
                size="sm"
                onClick={() => {
                  setIsEditing(false);
                }}
              >
                Cancle
              </Button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-gray-500 text-sm">{comment.content}</p>
            <div className="flex items-center text-sm gap-2">
              <button
                type="button"
                onClick={() => onLike(comment._id)}
                className={`hover:text-blue-500 text-gray-500 ${
                  currentUser &&
                  comment.likes.includes(currentUser._id) &&
                  "!text-blue-500"
                }`}
              >
                <FaThumbsUp className="text-sm" />
              </button>
              <p>
                {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes +
                    " " +
                    (comment.numberOfLikes === 1 ? "Like" : "Likes")}
              </p>
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <>
                    <button
                      className="hover:text-blue-500 text-gray-400"
                      type="button"
                      onClick={handleEdit}
                    >
                      Edit
                    </button>
                    <button
                      className="hover:text-red-500 text-gray-400"
                      type="button"
                      onClick={() => {
                        onDelete(comment._id);
                      }}
                    >
                      Delete
                    </button>
                  </>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.object,
  onLike: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};
