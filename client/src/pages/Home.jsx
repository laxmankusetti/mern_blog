import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard.jsx";

import Typewriter from "typewriter-effect";

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
          <Typewriter
            options={{
              strings: [
                "Hello, welcome to my blog",
                "I am a frontend and fullstack developer",
                "Learn Web developement",
                "Become a frontend devloper",
                "Become a fullstack developer",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </h1>
        <p className="text-gray text-xs sm:text-sm w-full">
          Keeping the beginners in mind, all the basic projects are kept only.
          If you want projects in advance level, let me know in the form of
          comments. I am not very active on social media. But lately I have
          started little by little. I will let you know once I am comfortable
          with using social media.
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
