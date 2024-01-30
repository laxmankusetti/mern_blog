import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiAnnotation, HiArrowNarrowUp, HiDocumentText, HiOutlineUserGroup } from "react-icons/hi";
import { Button, Table, TableBody, TableHead } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function DashboardComponent() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/getusers?limit=5");
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getPosts?limit=5");
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await fetch("/api/comment/getComments?limit=5");
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);
  return (
    <div className="p-3 md:mx-auto">
      <div className="flex flex-wrap gap-4 justify-center">
        <div className="flex flex-col gap-3 p-3 dark:bg-slate-700 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 text-md uppercase">Total Users</h3>
              <p>{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="bg-teal-500 p-3 rounded-full text-5xl text-white shadow-lg" />
          </div>
          <div className="flex gap-1 items-center">
            <HiArrowNarrowUp />
            <span className="text-green-500 flex items-center">
              {lastMonthUsers}
            </span>
            <p className="text-gray-500">Last Month</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 p-3 dark:bg-slate-700 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 text-md uppercase">Total Comments</h3>
              <p>{totalComments}</p>
            </div>
            <HiAnnotation className="bg-blue-500 p-3 rounded-full text-5xl text-white shadow-lg" />
          </div>
          <div className="flex gap-1 items-center">
            <HiArrowNarrowUp />
            <span className="text-green-500 flex items-center">
              {lastMonthComments}
            </span>
            <p className="text-gray-500">Last Month</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 p-3 dark:bg-slate-700 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 text-md uppercase">Total Posts</h3>
              <p>{totalPosts}</p>
            </div>
            <HiDocumentText className="bg-lime-500 p-3 rounded-full text-5xl text-white shadow-lg" />
          </div>
          <div className="flex gap-1 items-center">
            <HiArrowNarrowUp />
            <span className="text-green-500 flex items-center">
              {lastMonthPosts}
            </span>
            <p className="text-gray-500">Last Month</p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 p-3 mx-auto justify-center">
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h3 className="text-center p-2">Recent Users</h3>
            <Button outline gradientDuoTone='purpleToPink'>
              <Link to='/dashboard?tab=users'>
                See all
              </Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>User Image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
            </Table.Head>
            {users && users.map(user => (
              <TableBody key={user._id} className="divide-y">
                <Table.Row className="bg-white dark:bg-gray-800 dark:border-gray-700">
                  <Table.Cell>
                    <img src={user.profilePicture} alt="user" className="w-10 h-10 rounded-full bg-gray-500"/>
                  </Table.Cell>
                  <Table.Cell>
                    {user.username}
                  </Table.Cell>
                </Table.Row>
              </TableBody>
            ))}
          </Table>
        </div>
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h3 className="text-center p-2">Recent Comments</h3>
            <Button outline gradientDuoTone='purpleToPink'>
              <Link to='/dashboard?tab=commets'>
                See all
              </Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Comment Content</Table.HeadCell>
              <Table.HeadCell>Likes</Table.HeadCell>
            </Table.Head>
            {comments && comments.map(comment => (
              <TableBody key={comment._id} className="divide-y">
                <Table.Row className="bg-white dark:bg-gray-800 dark:border-gray-700">
                  <Table.Cell className="line-clamp-2">
                    {comment.content}
                  </Table.Cell>
                  <Table.Cell>
                    {comment.numberOfLikes}
                  </Table.Cell>
                </Table.Row>
              </TableBody>
            ))}
          </Table>
        </div>
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h3 className="text-center p-2">Recent Posts</h3>
            <Button outline gradientDuoTone='purpleToPink'>
              <Link to='/dashboard?tab=posts'>
                See all
              </Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
            </Table.Head>
            {posts && posts.map(post => (
              <TableBody key={post._id} className="divide-y">
                <Table.Row className="bg-white dark:bg-gray-800 dark:border-gray-700">
                  <Table.Cell>
                    <img src={post.image} alt="post" className="w-14 h-10 rounded-md bg-gray-500"/>
                  </Table.Cell>
                  <Table.Cell className="line-clamp-2">
                    {post.title}
                  </Table.Cell>
                  <Table.Cell>
                    {post.category}
                  </Table.Cell>
                </Table.Row>
              </TableBody>
            ))}
          </Table>
        </div>
      </div>
    </div>
  );
}
