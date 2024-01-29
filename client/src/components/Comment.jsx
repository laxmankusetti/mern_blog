import PropTypes from "prop-types"; 
import { useEffect, useState } from "react";
import moment from 'moment';

export default function Comment( { comment }) {

    const [user, setUser] = useState({})

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/api/user/${comment.userId}`);
                const data = await res.json();
                setUser(data)
            } catch (error) {
                console.log(error)
            }
        } 
        getUser();
    }, [comment])
  return (
    <div className="flex items-center p-3 border border-b">
      <div className="">
        <img src={user.profilePicture} alt={user.profilePicture} className="w-10 h-10 rounded-full object-cover" />
      </div>
      <div >
        <div className="flex items-center gap-3 flex-1">
            <span className="text-sm text-gray-500 font-bold">{user ? `@${user.username}` : 'Anonymous user'}</span>
            <span className="text-xs text-gray-500">{moment(comment.createdAt).fromNow()}</span>
        </div>
        <p className="text-gray-500 pb-5 text-sm ml-5">{comment.content}</p>
      </div>
    </div>
  )
}

Comment.propTypes = {
    comment: PropTypes.object,
  };
  