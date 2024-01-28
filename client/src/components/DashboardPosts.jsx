import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashboardPosts() {
  const [userPosts, setUserPosts] = useState([]);
  const [postIdToDelete, setPostIdToDelete] = useState('');
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

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

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/post/deletepost/${postIdToDelete}/${currentUser._id}`, {
        method : 'DELETE'
      })
      const data = res.json();
      if(!res.ok){
        console.log(data.message)
      }else{
        setUserPosts((prev) => prev.filter((post) => post._id !== postIdToDelete))
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
                  <span className="text-red-500 cursor-pointer font-medium" onClick={() => {
                    setShowModal(true)
                    setPostIdToDelete(post._id)
                  }}>
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
      {showModal && <Modal
          show={showModal}
          onClose={() => {
            setShowModal(false);
          }}
          popup
          size="md"
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 mb-5 mx-auto text-gray-400 dark:text-gray-200" />
              <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-300">
                Are you sure? You want to delete this post?
              </h3>
              <div className="flex justify-center items-center gap-6 my-5">
                <Button color="failure" onClick={handleDeletePost}>
                  Yes, I&apos;m sure
                </Button>
                <Button
                  color="gray"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  No, cancle
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>}
    </div>
  );
}
