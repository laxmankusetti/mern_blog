import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <div className="relative overflow-hidden group w-full border h-[350px] rounded-lg sm:w-[350px] border-teal-500 hover:border-2">
      <Link to={`/post/${post.slug}`} className="group">
        <img
          src={post.image}
          alt={post.image}
          className="h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20"
        />
      </Link>
      <div className="flex flex-col gap-2 p-3">
        <p className="text-xl line-clamp-3 font-semibold">{post.title}</p>
        <span className="text-sm italic">{post.category}</span>
        <Link
          to={`/post/${post.slug}`}
          className="group-hover:bottom-0 z-10 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 py-2 text-center rounded-md !rounded-tl-none m-2"
        >Read more</Link>
      </div>
    </div>
  );
}

PostCard.propTypes = {
  post: PropTypes.object,
};
