import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CallToAction from "../components/CallToAction.jsx";
import CommentSection from "../components/CommentSection.jsx";
import PostCard from "../components/PostCard.jsx";

export default function PostPage() {
  const { postSlug } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setrecentPosts] = useState(null);

  console.log(error)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getPosts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setLoading(false);
          setError(true);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch('/api/post/getPosts?limit=3')
        const data = await res.json();
        if(res.ok){
          setrecentPosts(data.posts)
        }
      }
      fetchRecentPosts()
    } catch (error) {
      console.log(error)
    }
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl font-serif text-center max-w-2xl mx-auto mt-10 p-3 lg:text-4xl">
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className="self-center mt-3"
      >
        <Button color="gray" pill size="xs">
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.image}
        className="max-h-[600px] w-full p-3 mt-5 object-cover"
      />
      <div className="flex justify-between w-full max-w-2xl mx-auto p-3 border-slate-500 border-b text-xs">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span>{post && (post.content.length / 1000).toFixed()} mins read</span>
      </div>
      <div className="p-3 max-w-2xl mx-auto-w-full" dangerouslySetInnerHTML={{__html : post && post.content}}></div>
      <div className="max-w-4xl mx-auto">
        <CallToAction />
      </div>
      <CommentSection postId={post._id} />
      <div className="flex flex-col mt-5 items-center justify-center">
        <h1 className="text-xl text-center">Recent Articles</h1>
        <div className="flex flex-wrap gap-5 mx-auto">
          {
            recentPosts && recentPosts.map(post => <PostCard key={post._id} post={post} />)
          }
        </div>
      </div>
    </main>
  );
}
