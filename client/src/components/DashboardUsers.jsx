import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Table } from "flowbite-react";
// import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function DashboardUsers() {
  const [users, setUsers] = useState([]);
  const [userIdToDelete, setUserIdToDelete] = useState('');
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if(data.users.length < 9){
            setShowMore(false)
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if(res.ok){
        setUsers((prev) => [...prev, ...data.users])
      }
      if(data.users.length < 9){
        setShowMore(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteUser = async () => {

  }

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700">
      {currentUser.isAdmin && users.length > 0 ? (
        <>
        <Table hoverable className="shadow-md">
          <Table.Head>
            <Table.HeadCell>Date Updated</Table.HeadCell>
            <Table.HeadCell>User Image</Table.HeadCell>
            <Table.HeadCell>Username</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Admin</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
          </Table.Head>
          {users.map((user) => (
            <Table.Body key={user._id} divide-y='true'>
              <Table.Row className="dark:bg-gray-700 dark:border-gray-500 bg-white">
                <Table.Cell>
                  {new Date(user.createdAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>
                    <img
                        src={user.profilePicture}
                        alt={user.profilePicture}
                        className="h-10 w-10 bg-gray-400 rounded-full"
                    />
                </Table.Cell>
                <Table.Cell>
                  {user.username}
                </Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.isAdmin ? <FaCheck className="text-green-600" /> : <FaTimes className="text-red-600" />}</Table.Cell>
                <Table.Cell>
                  <span className="text-red-500 cursor-pointer font-medium" onClick={() => {
                    setShowModal(true)
                    setUserIdToDelete(user._id)
                  }}>
                    Delete
                  </span>
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
                Are you sure? You want to delete this user?
              </h3>
              <div className="flex justify-center items-center gap-6 my-5">
                <Button color="failure" onClick={handleDeleteUser}>
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
