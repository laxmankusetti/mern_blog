import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard.jsx";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getPosts");
        const data = await res.json();
        setPosts(data.posts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-4 px-3 p-28 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold lg:text-6xl">
          Welcome to my blog...!
        </h1>
        <p className="text-gray text-xs sm:text-sm">
          It is a blog portal. Here you will find details related to skills and
          projects. Any new web development related topics will also be kept.
          So, if you want to know any details, you can ask in the form of
          comments to the post, I will respond to them as soon as possible.
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          View all posts
        </Link>
      </div>
      <div className="p-3 dark:bg-slate-700 max-w-7xl w-full mx-auto">
        <CallToAction />
      </div>
      <div className="max-w-6xl mx-auto flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h1 className="font-bold text-2xl text-center">Recent Posts</h1>
            <div className="flex flex-wrap gap-4">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to="/search"
              className="text-xs sm:text-sm text-teal-500 font-bold hover:underline text-center"
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
