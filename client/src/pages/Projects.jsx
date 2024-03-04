import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

export default function Projects() {
  const [recentProjects, setRecentProjects] = useState(null);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch("/api/post/getPosts?limit=9");
        const data = await res.json();
        if (res.ok) {
          setRecentProjects(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="flex justify-center items-center p-10 flex-col gap-2">
      <h1 className="text-2xl font-bold text-center my-5">Projects</h1>
      <div className="max-w-7xl w-full mx-auto my-5 flex flex-wrap gap-10">
        {recentProjects && recentProjects.map((recetProject) => (
          <PostCard post={recetProject} key={recetProject._id}/>
        ))}
      </div>
    </div>
  );
}
