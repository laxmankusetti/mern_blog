import { Button, Select, Spinner, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";

export default function Search() {
  const location = useLocation();

  const [sidebarData, setSidebardata] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });

  const [posts, setposts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");

    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebardata({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }

    const fetchData = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getPosts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setposts(data.posts);
        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };

    fetchData();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebardata({
        ...sidebarData,
        searchTerm: e.target.value,
      });
    }
    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSidebardata({
        ...sidebarData,
        sort: order,
      });
    }
    if (e.target.id === "category") {
      const category = e.target.value || "uncategorized";
      setSidebardata({
        ...sidebarData,
        category,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts.length;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getPosts?${searchQuery}`)
    if(!res.ok){
        return
    }
    if(res.ok){
        const data = await res.json();
        setposts([...posts, ...data.posts]);
        if(data.posts.length === 9){
            setShowMore(true)
        }else{
            setShowMore(false)
        }
    }
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 md:min-h-screen md:border-r border-gray-500">
        <form className="flex flex-col gap-8 " onSubmit={handleSubmit}>
          <div className="flex items-center gap-3">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <TextInput
              placeholder="Search..."
              id="searchTerm"
              type="text"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="font-semibold">Sort By:</label>
            <Select value={sidebarData.sort} id="sort" onChange={handleChange}>
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>

          <div className="flex items-center gap-3">
            <label className="font-semibold">Category:</label>
            <Select
              value={sidebarData.category}
              id="category"
              onChange={handleChange}
            >
              <option value="uncategorized">Uncategorized</option>
              <option value="reactjs">ReactJS</option>
              <option value="javascript">Javascript</option>
              <option value="nodejs">NodeJS</option>
              <option value="expressjs">ExpressJS</option>
              <option value="reduxjs">ReduxJS</option>
            </Select>
          </div>
          <Button type="submit" outline gradientDuoTone="purpleToPink">
            Apply Filters
          </Button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="text-2xl font-semibold mt-5 p-3 sm:border-b border-gray-500">
          Posts result
        </h1>
        <div className="flex flex-wrap p-7 gap-4">
          {!loading && posts.length === 0 && (
            <p className="text-gray-500 font-semibold">Posts not found!</p>
          )}
          {loading && <Spinner className="mx-auto" />}

          {!loading &&
            posts.length &&
            posts.map((post) => <PostCard post={post} key={post._id} />)}
          {showMore && (
            <button className="text-teal-500 p-7 text-xl font-semibold hover:underline w-full" onClick={handleShowMore}>
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
