import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";

export default function DashboardPosts() {
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const { currentUser } = useSelector((state) => state.user);

  console.log(userPosts);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`api/post/getPosts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if(data.posts.length < 9){
            setShowMore(false)
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(`/api/post/getPosts?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();
      if(res.ok){
        setUserPosts((prev) => [...prev, ...data.posts])
      }
      if(data.posts.length < 9){
        setShowMore(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
        <Table hoverable className="shadow-md">
          <Table.Head>
            <Table.HeadCell>Date Updated</Table.HeadCell>
            <Table.HeadCell>Post Image</Table.HeadCell>
            <Table.HeadCell>Post Title</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
            <Table.HeadCell>
              <span>Edit</span>
            </Table.HeadCell>
          </Table.Head>
          {userPosts.map((post) => (
            <Table.Body key={post._id} divide-y='true'>
              <Table.Row className="dark:bg-gray-700 dark:border-gray-500 bg-white">
                <Table.Cell>
                  {new Date(post.updatedAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/post/${post.slug}`}>
                    <img
                      src={post.image}
                      alt={post.image}
                      className="h-10 w-20 bg-gray-400"
                    />
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Link
                    to={`/post/${post.slug}`}
                    className="font-semibold text-gray-800 dark:text-white"
                  >
                    {post.title}
                  </Link>
                </Table.Cell>
                <Table.Cell>{post.category}</Table.Cell>
                <Table.Cell>
                  <span className="text-red-500 cursor-pointer font-medium">
                    Delete
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/update-post/${post._id}`}>
                    <span className="text-teal-500 hover:underline font-medium">
                      Edit
                    </span>
                  </Link>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
        {showMore && (<button className="w-full self-center text-teal-500 font-semibold py-5" onClick={handleShowMore}>Show more</button>)}
        </>
      ) : (
        <p>You have no posts yet, please add some posts to see your posts!!!</p>
      )}
    </div>
  );
}
